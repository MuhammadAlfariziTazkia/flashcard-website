'use client';

import Button from "@/components/ui/button/Button";
import { useEffect, useState } from "react";
import TopicCard from "@/components/ui/card/TopicCard";
import CreateTopicModal from "@/components/ui/modal/CreateTopicModal";
import TestModal from "@/components/ui/modal/TestModal";
import { Topic, TopicType } from "../lib/types";
import AddCardModal from "@/components/ui/modal/AddCardModal";
import { fetchTopics } from "../lib/data";


export default function HomePage() {
  const [topics, setTopics] = useState<TopicType[]>([])
  const [isCreateTopicModalOpen, setIsCreateTopicModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);

  useEffect(() => {
    async function loadTopics() {
      try {
        const data = await fetchTopics();
        const fetchedData = data.map((topic: Topic): TopicType => {
          return {
            id: topic.id,
            name: topic.name,
          }
        })
        setTopics(fetchedData);
      } catch (error) {
        console.log(error);
      }
    }
    loadTopics();
  }, [])

  const handleCreateTopic = () => {
    setIsCreateTopicModalOpen(true);
  }

  const handleStartTest = () => {
    setIsTestModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Remind.me Flashcards</h1>
      <div className="max-w-4xl mx-auto">
        <Button iconType="add" text="New Topic" popup={true} action={handleCreateTopic} />
        <div className="space-y-6 mt-4">
          {topics.map(({ id, name }) => <TopicCard key={id} id={id} name={name} testAction={handleStartTest} />)}
        </div>
      </div>
      {isCreateTopicModalOpen && (
        <CreateTopicModal closeAction={() => setIsCreateTopicModalOpen(false)} />)
      }
      {isTestModalOpen && (
        <TestModal closeAction={() => setIsTestModalOpen(false)} />
      )}
    </div>
  )
}
