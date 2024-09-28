import { Card, TopicType } from "@/app/lib/types";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import CardListModal from "../modal/CardListModal";
import { fetchCards } from "@/app/lib/data";
import AddCardModal from "../modal/AddCardModal";

export default function TopicCard({ id, name, testAction }: TopicType) {
  const [isCardListModalOpen, setIsCardListModalOpen] = useState(false);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [cards, setCards] = useState<Card[]>([])

  const handleCardListModalOpen = () => {
    setIsCardListModalOpen(true);
  }

  const handleAddCardModalOpen = () => {
    setIsAddCardModalOpen(true);
  }

  useEffect(() => {
    async function loadCards() {
      try {
        setCards(await fetchCards(id));
      } catch (error) {
        console.log(error);
      }
    }
    loadCards();
  }, [])

  return (
    <div key={id} className="bg-gray-100 p-6 rounded-xl shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">{name}</h2>
      <p className="text-gray-600 mb-4">Cards: {cards.length}</p>
      <div className="flex space-x-4">
        <Button iconType="play" text="Start Test" action={testAction} />
        <Button iconType="add" text="Add Card" action={handleAddCardModalOpen} />
        <Button iconType="list" text="View Cards" action={handleCardListModalOpen} />
      </div>
      {isCardListModalOpen && (
        <CardListModal cards={cards} closeAction={() => setIsCardListModalOpen(false)} />
      )}
      {isAddCardModalOpen && (
        <AddCardModal topicId={id} closeAction={() => setIsAddCardModalOpen(false)} />
      )}
    </div>
  )
}