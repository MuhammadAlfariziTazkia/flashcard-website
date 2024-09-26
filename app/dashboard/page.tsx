'use client';

import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { topicDummyDataList } from "../lib/placeholder-data";
import TopicCard from "@/components/ui/TopicCard";
import CreateTopicModal from "@/components/ui/CreateTopicModal";


export default function HomePage() {
  const [topics, setTopics] = useState<TopicType[]>([])
  const [isCreateTopicModalOpen, setIsCreateTopicModalOpen] = useState(false);

  useEffect(() => {
    setTopics(topicDummyDataList)
  }, [])

  const handleAddTopic = () => {
    setIsCreateTopicModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Remind.me Flashcards</h1>
      <div className="max-w-4xl mx-auto">
        <Button iconType="add" text="New Topic" popup={true} action={handleAddTopic} />
        <div className="space-y-6 mt-4">
          {topics.map(({id, name, cards}) => <TopicCard id={id} name={name} cards={cards} />)}
        </div>
      </div>
      {isCreateTopicModalOpen && (
        <CreateTopicModal closeAction={() => setIsCreateTopicModalOpen(false)}/>)
      }
    </div>
  )
}
