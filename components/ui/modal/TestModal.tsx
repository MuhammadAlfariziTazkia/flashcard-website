import React, { useEffect, useState } from "react";
import ModalLayout from "./ModalLayout";
import { Card, Modal } from "@/app/lib/types";
import DangerAlert from "../alert/DangerAlert";
import SuccessAlert from "../alert/SuccessAlert";
import { PlayIcon } from "lucide-react";
import { fetchCards } from "@/app/lib/data";
import "@/components/ui/custom-style.css";
import LoadingModal from "./LoadingModal";

interface Props extends Modal {
    topicName: string;
    topicId: string;
}

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

export default function TestModal({ topicId, closeAction, topicName }: Props) {
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [answer, setAnswer] = useState("");
    const [cards, setCards] = useState<Card[]>([])
    const [cardsCount, setCardsCount] = useState(0);
    const [correctness, setCorrectness] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        async function loadCards() {
            try {
                const data = await fetchCards(topicId)
                setCards(data);
                setCardsCount(data.length)
                setIndex(getRandomNumber(0, data.length))
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }
        loadCards();
    }, [])

    const handleInputAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
    }

    const handleCheckAnswer = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const input = answer.toLowerCase().replaceAll(" ", "");
        const expected = cards[index].value_2.toLowerCase().replaceAll(" ", "");
        if (input == expected) setCorrectness(3);
        else if (input.length > 0) setCorrectness(2);
    }

    const handleNextQuestion = () => {
        setCorrectness(0)
        setAnswer("");
        setIndex(getRandomNumber(0, cardsCount));
    }

    const body: React.ReactNode = (
        <>
            {cardsCount && (
                <div>
                    <p className="text-4xl font-bold text-gray-800 text-center my-10">{cards[index].value_1}</p>
                    <form onSubmit={handleCheckAnswer}>
                        <input type="text" placeholder="Answer" onChange={handleInputAnswer} value={answer} required />
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 py-3 w-full bg-black text-white hover:bg-gray-800"
                        >
                            Check Answer
                        </button>
                    </form>
                    {correctness == 2 && (
                        <DangerAlert message={"Correct answer: " + cards[index].value_2} />
                    )}
                    {correctness == 3 && (
                        <>
                            <hr className="my-3" />
                            <SuccessAlert message={"Correct !"} />
                            <div className="flex justify-end">
                                <button className="pop-button" onClick={handleNextQuestion}>
                                    <PlayIcon className="button-icon" />
                                    Next Card
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
            {isLoading && (
                <LoadingModal message="Loading data..." />
            )}
        </>
    )
    return <ModalLayout title={topicName} body={body} closeAction={closeAction} />
}