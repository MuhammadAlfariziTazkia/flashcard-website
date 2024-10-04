import TrashButton from "../button/TrashButton";
import CloseButton from "../button/CloseButton";
import { Card, Modal } from "@/app/lib/types";
import { deleteCard } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import { fetchCards } from "@/app/lib/data";
import LoadingModal from "./LoadingModal";

export interface Props extends Modal {
    topicId: string;
    updateAction: () => void;
}

export default function CardListModal({ topicId, closeAction, updateAction }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [cards, setCards] = useState<Card[]>([]);
    const [isCardsUpdated, setIsCardsUpdated] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        async function loadCards() {
            try {
                setCards(await fetchCards(topicId));
                setIsCardsUpdated(false)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }
        loadCards();
    }, [isCardsUpdated])

    const handleDeleteCard = async (id: string) => {
        setIsDeleting(true);
        try {
            await deleteCard(id);
            updateAction();
            setIsCardsUpdated(true);
        } catch (error) {
            console.log(error)
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-90 flex items-center justify-center p-4">
            <div className="bg-gray-100 p-8 rounded-2xl w-full max-w-2xl shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{topicName}</h2>
                    <CloseButton action={closeAction} />
                </div>
                <div className="space-y-4">
                    {cards.map(card => (
                        <div key={card.id} className="bg-gray-100 p-4 rounded-xl shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-800 text-xl">{card.value_1}</p>
                                    <p className="text-gray-600 text-lg">{card.value_2}</p>
                                </div>
                                <div className="flex space-x-2">
                                    {/* <EditButton /> */}
                                    <TrashButton action={() => handleDeleteCard(card.id)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isDeleting && (
                <LoadingModal message="Deleting data..." />
            )}
            {isLoading && (
                <LoadingModal message="Loading Data..." />
            )}
        </div>
    )
}