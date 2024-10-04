'use client';

import { useEffect, useState } from "react";
import TopicCard from "@/components/ui/card/TopicCard";
import CreateTopicModal from "@/components/ui/modal/CreateTopicModal";
import { Topic, TopicAndCardsCount } from "../lib/types";
import { fetchTopicsAndCardsCount, fetchTopicsByUserId } from "../lib/data";
import { LogOutIcon, PlusIcon, UserIcon } from "lucide-react";
import LoadingModal from "@/components/ui/modal/LoadingModal";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { User } from "next-auth";


export default function HomePage() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [isTopicUpdated, setIsTopicUpdated] = useState(false);
  const [isCreateTopicModalOpen, setIsCreateTopicModalOpen] = useState(false);
  const [user, setUser] = useState<User>();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [topicsAndCardsCount, setTopicsAndCardsCount] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    else {
      if (session) {
        setUser(session.user)
      }
    }
  }, [status]);

  useEffect(() => {
    async function loadTopics() {
      if (!user) return;
      try {
        setIsLoading(true);
        setTopics(await fetchTopicsByUserId(user.id));
        const fetchedData: TopicAndCardsCount[] = await fetchTopicsAndCardsCount(user.id);
        const topicsAndCardObjTemp: { [key: string]: number } = {}
        fetchedData.forEach(data => {
          topicsAndCardObjTemp[data.id] = data.count;
        });
        setTopicsAndCardsCount(topicsAndCardObjTemp)
        console.log("LALALA")
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setIsTopicUpdated(false);
      }
    }
    loadTopics();
  }, [isTopicUpdated, user])

  const handleCreateTopic = () => {
    setIsCreateTopicModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-100 p-6 rounded-xl shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <UserIcon className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-lg font-semibold text-gray-800">{user?.name}</span>
            </div>
            <button className="pop-button" onClick={() => signOut()}>
              <LogOutIcon className="button-icon text-red-600" />
              Logout
            </button>
          </div>
        </div>
      </div>
      <h1 className="text-4xl mb-2 font-bold text-center text-gray-800">
        Dashboards
      </h1>
      <p className="text-center text-gray-800 text-lg mb-8">
        Remember new things in a easy and effective way
      </p>
      <div className="max-w-4xl mx-auto">
        <button className="pop-button" onClick={handleCreateTopic}>
          <PlusIcon className="button-icon text-blue-600" />
          New Topic
        </button>
        <div className="space-y-6 mt-4">
          {topics.map(({ id, name }) => (
            <TopicCard key={id} user_id={user?.id || ""} id={id} name={name} updateAction={() => setIsTopicUpdated(true)} cardCount={topicsAndCardsCount["asd"]} />
          ))}
        </div>
      </div>
      {isCreateTopicModalOpen && (
        <CreateTopicModal userId={user?.id || ""} closeAction={() => setIsCreateTopicModalOpen(false)} updateAction={() => setIsTopicUpdated(true)} />)
      }
      {isLoading && (
        <LoadingModal message="Refreshing Topics..." />
      )}
    </div>
  )
}
