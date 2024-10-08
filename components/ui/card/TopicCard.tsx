import { TopicCardType } from "@/app/lib/types";
import { useEffect, useState } from "react";
import CardListModal from "../modal/CardListModal";
import { fetchCardsCount } from "@/app/lib/data";
import AddCardModal from "../modal/AddCardModal";
import { PlayIcon, PlusIcon, RefreshCcw, TrashIcon, WalletCards } from "lucide-react";
import { deleteTopic } from "@/app/lib/actions";
import PracticeModal from "../modal/PracticeModal";
import TestModal from "../modal/TestModal";

export default function TopicCard({ id, name, updateAction, cardCount }: TopicCardType) {
  const [isCardListModalOpen, setIsCardListModalOpen] = useState(false);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState(false);
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
        <button className="pop-button" onClick={() => setIsAddCardModalOpen(true)}>
          <PlusIcon className="button-icon text-blue-600" />
          Add Card
        </button>
        {dynamicCardsCount > 0
          ? (
            <>
              <button className="pop-button" onClick={() => setIsCardListModalOpen(true)}>
                <WalletCards className="button-icon text-yellow-600" />
                Flashcards
              </button>
              <button className="pop-button" onClick={() => setIsPracticeModalOpen(true)}>
                <RefreshCcw className="button-icon text-teal-400" />
                Practice
              </button>
              <button className="pop-button" onClick={() => setIsTestModalOpen(true)}>
                <PlayIcon className="button-icon text-green-600" />
                Test
              </button>
            </>
          )
          : <></>}
        <button className="pop-button" onClick={handleDeleteTopic}>
          <TrashIcon className="button-icon text-red-600" />
          Delete
        </button>
      </div>
      {isCardListModalOpen && (
        <CardListModal topicName={name} updateAction={() => setIsCardsUpdated(true)} topicId={id} closeAction={() => setIsCardListModalOpen(false)} />
      )}
      {isAddCardModalOpen && (
        <AddCardModal topicName={name} updateAction={() => setIsCardsUpdated(true)} topicId={id} closeAction={() => setIsAddCardModalOpen(false)} />
      )}
      {isPracticeModalOpen && (
        <PracticeModal topicId={id} closeAction={() => setIsPracticeModalOpen(false)} topicName={name} />
      )}
      {isTestModalOpen && (
        <TestModal topicId={id} closeAction={() => setIsTestModalOpen(false)} topicName={name} />
      )}
    </div>
  )
}