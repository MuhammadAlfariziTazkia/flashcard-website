'use client';

import Button from "@/components/ui/button/Button";
import { useEffect, useState } from "react";
import { topicDummyDataList } from "../lib/placeholder-data";
import TopicCard from "@/components/ui/card/TopicCard";
import CreateTopicModal from "@/components/ui/modal/CreateTopicModal";
import TestModal from "@/components/ui/modal/TestModal";
import { TopicType } from "../lib/types";
import CardListModal from "@/components/ui/modal/CardListModal";


export default function HomePage() {
  const [topics, setTopics] = useState<TopicType[]>([])
  const [isCreateTopicModalOpen, setIsCreateTopicModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isCardListModalOpen, setIsCardListModalOpen] = useState(false);

  useEffect(() => {
    setTopics(topicDummyDataList)
  }, [])

  const handleCreateTopic = () => {
    setIsCreateTopicModalOpen(true);
  }

  const handleStartTest = () => {
    setIsTestModalOpen(true);
  }

  const handleCardList = () => {
    setIsCardListModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Remind.me Flashcards</h1>
      <div className="max-w-4xl mx-auto">
        <Button iconType="add" text="New Topic" popup={true} action={handleCreateTopic} />
        <div className="space-y-6 mt-4">
          {topics.map(({ id, name, cards }) => <TopicCard key={id} id={id} name={name} cards={cards} testAction={handleStartTest} cardListAction={handleCardList}/>)}
        </div>
      </div>
      {isCreateTopicModalOpen && (
        <CreateTopicModal closeAction={() => setIsCreateTopicModalOpen(false)} />)
      }
      {isTestModalOpen && (
        <TestModal closeAction={() => setIsTestModalOpen(false)} />
      )}
      {isCardListModalOpen && (
        <CardListModal/>
      )}
    </div>
  )
}
