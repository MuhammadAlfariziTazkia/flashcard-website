import { TopicCardType } from "@/app/lib/types";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import CardListModal from "../modal/CardListModal";
import { fetchCardsCount } from "@/app/lib/data";
import AddCardModal from "../modal/AddCardModal";
import TestModal from "../modal/TestModal";
import { ListIcon, PlayIcon, PlusIcon, TrashIcon } from "lucide-react";
import { deleteTopic } from "@/app/lib/actions";

export default function TopicCard({ id, name, updateAction, cardCount }: TopicCardType) {
  const [isCardListModalOpen, setIsCardListModalOpen] = useState(false);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isCardsUpdated, setIsCardsUpdated] = useState(false);
  const [dynamicCardsCount, setDynamicCardsCount] = useState<number>(cardCount);

  useEffect(() => {
    async function loadCardsCount() {
      try {
        setDynamicCardsCount(await fetchCardsCount(id));
      } catch (error) {
        console.log(error);
      } finally {
        setIsCardsUpdated(false);
      }
    }
    loadCardsCount();
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
    <div key={id} className="bg-gray-100 p-6 rounded-xl shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">{name}</h2>
      <p className="text-gray-600 mb-4">{dynamicCardsCount} Flashcards</p>
      <div className="flex space-x-4">
        <Button iconComponent={<PlusIcon className="button-icon text-blue-600" />} text="Add Card" action={() => setIsAddCardModalOpen(true)} />
        {dynamicCardsCount > 0
          ? (
            <>
              <Button iconComponent={<ListIcon className="button-icon text-yellow-600" />} text="View Cards" action={() => setIsCardListModalOpen(true)} />
              <Button iconComponent={<PlayIcon className="button-icon text-green-600" />} text="Start Test" action={() => setIsTestModalOpen(true)} />
            </>
          )
          : <></>}
        <Button iconComponent={<TrashIcon className="button-icon text-red-600" />} text="Delete Topic" action={handleDeleteTopic} />
      </div>
      {isCardListModalOpen && (
        <CardListModal topicName={name} updateAction={() => setIsCardsUpdated(true)} topicId={id} closeAction={() => setIsCardListModalOpen(false)} />
      )}
      {isAddCardModalOpen && (
        <AddCardModal topicName={name} updateAction={() => setIsCardsUpdated(true)} topicId={id} closeAction={() => setIsAddCardModalOpen(false)} />
      )}
      {isTestModalOpen && (
        <TestModal topicId={id} closeAction={() => setIsTestModalOpen(false)} topicName={name} />
      )}
    </div>
  )
}