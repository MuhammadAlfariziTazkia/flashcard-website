import { Card, Topic, TopicCardType } from "@/app/lib/types";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import CardListModal from "../modal/CardListModal";
import { fetchCards } from "@/app/lib/data";
import AddCardModal from "../modal/AddCardModal";
import TestModal from "../modal/TestModal";
import { ListIcon, PlayIcon, PlusIcon, TrashIcon, XIcon } from "lucide-react";
import { deleteTopic } from "@/app/lib/actions";

export default function TopicCard({ id, name, updateAction }: TopicCardType) {
  const [isCardListModalOpen, setIsCardListModalOpen] = useState(false);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [cards, setCards] = useState<Card[]>([])
  const [isCardsUpdated, setIsCardsUpdated] = useState(false);

  useEffect(() => {
    async function loadCards() {
      try {
        setCards(await fetchCards(id));
      } catch (error) {
        console.log(error);
      } finally {
        setIsCardsUpdated(false);
      }
    }
    loadCards();
  }, [isCardsUpdated])

  const handleDeleteTopic = () => {
    try {
      updateAction();
      deleteTopic(id);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div key={id} className="bg-zinc-50 p-6">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">{name}</h2>
      <p className="text-gray-600 mb-4">{cards.length} Flashcards</p>
      <div className="flex space-x-4">
        <Button iconComponent={<PlusIcon className="button-icon" />} text="Add Card" action={() => setIsAddCardModalOpen(true)} />
        {cards.length
          ? (
            <>
              <Button iconComponent={<ListIcon className="button-icon" />} text="View Cards" action={() => setIsCardListModalOpen(true)} />
              <Button iconComponent={<PlayIcon className="button-icon" />} text="Start Test" action={() => setIsTestModalOpen(true)} />
            </>
          )
          : <></>}
        <Button iconComponent={<TrashIcon className="button-icon" />} text="Delete Topic" action={handleDeleteTopic} />
      </div>
      {isCardListModalOpen && (
        <CardListModal updateAction={() => setIsCardsUpdated(true)} cards={cards} closeAction={() => setIsCardListModalOpen(false)} />
      )}
      {isAddCardModalOpen && (
        <AddCardModal updateAction={() => setIsCardsUpdated(true)} topicId={id} closeAction={() => setIsAddCardModalOpen(false)} />
      )}
      {isTestModalOpen && (
        <TestModal cards={cards} closeAction={() => setIsTestModalOpen(false)} topicName={name} />
      )}
    </div>
  )
}