'use client';

import Button from "@/components/ui/button/Button";
import { useEffect, useState } from "react";
import TopicCard from "@/components/ui/card/TopicCard";
import CreateTopicModal from "@/components/ui/modal/CreateTopicModal";
import { Topic } from "../lib/types";
import { fetchTopicsByUserId } from "../lib/data";
import { PlusIcon } from "lucide-react";
import LoadingModal from "@/components/ui/modal/LoadingModal";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';


export default function HomePage() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [isTopicUpdated, setIsTopicUpdated] = useState(false);
  const [isCreateTopicModalOpen, setIsCreateTopicModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } 
    else {
      if (session && session.user) {
        setUserId(session.user.id)
      }
    }
  }, [status]);

  useEffect(() => {
    async function loadTopics() {
      if (userId.trim().length == 0) return;
      try {
        setIsLoading(true); 
        setTopics(await fetchTopicsByUserId(userId));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); 
        setIsTopicUpdated(false);
      }
    }
    loadTopics();
  }, [isTopicUpdated, userId])

  const handleCreateTopic = () => {
    setIsCreateTopicModalOpen(true);
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl mb-2 font-bold text-center text-gray-800">
        Dashboards
      </h1>
      <p className="text-center text-gray-800 text-lg mb-8">
        Remember new things in a easy and effective way
      </p>
      <div className="max-w-4xl mx-auto">
        <Button text="New Topic" action={handleCreateTopic} iconComponent={<PlusIcon className="button-icon"/>}/>
        <div className="space-y-6 mt-4">
          {topics.map(({ id, name }) => (
            <TopicCard key={id} user_id={userId} id={id} name={name} updateAction={() => setIsTopicUpdated(true)}/>
          ))}
        </div>
      </div>
      {isCreateTopicModalOpen && (
        <CreateTopicModal userId={userId} closeAction={() => setIsCreateTopicModalOpen(false)} updateAction={() => setIsTopicUpdated(true)} />)
      }
      {isLoading && (
        <LoadingModal message="Refreshing Topics..."/>
      )}
    </div>
  )
}
