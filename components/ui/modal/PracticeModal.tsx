import React, { useEffect, useState } from "react";
import ModalLayout from "./ModalLayout";
import { Card, Modal } from "@/app/lib/types";
import { fetchCards } from "@/app/lib/data";
import "@/components/ui/custom-style.css";
import LoadingModal from "./LoadingModal";
import CheckAnswerButton from "../button/CheckAnswerButton";
import NextQuestionButton from "../button/NextQuestionButton";
import IncorrectAlert from "../alert/IncorrectAlert";
import CorrectAlert from "../alert/CorrectAlert";

interface Props extends Modal {
    topicName: string;
    topicId: string;
}

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

export default function PracticeModal({ topicId, closeAction, topicName }: Props) {
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [answer, setAnswer] = useState("");
    const [cards, setCards] = useState<Card[]>([])
    const [cardsCount, setCardsCount] = useState(0);
    const [buttonMode, setButtonMode] = useState<"Check" | "Next">("Check")
    const [status, setStatus] = useState<"Reset" | "Correct" | "Incorrect">("Reset")

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
        if (input == expected) {
            setStatus("Correct");
            setButtonMode("Next");
        }
        else if (input.length > 0) {
            setStatus("Incorrect")
        }
    }

    const handleNextQuestion = () => {
        setStatus("Reset")
        setAnswer("");
        setButtonMode("Check")
        setIndex(getRandomNumber(0, cardsCount));
    }

    const body: React.ReactNode = (
        <>
            {status == "Incorrect" && (
                <IncorrectAlert rightAnswer={cards[index].value_2} />
            )}
            {status == "Correct" && (
                <CorrectAlert />
            )}
            {cardsCount && (
                <div>
                    <p className="text-4xl font-bold text-gray-800 text-center my-10">{cards[index].value_1}</p>
                    <form onSubmit={handleCheckAnswer}>
                        <input type="text" placeholder="Answer" onChange={handleInputAnswer} value={answer} required />
                        {buttonMode == "Check" && (
                            <CheckAnswerButton />
                        )}
                        {buttonMode == "Next" && (
                            <NextQuestionButton action={handleNextQuestion} />
                        )}
                    </form>
                </div>
            )}
            {isLoading && (
                <LoadingModal message="Loading data..." />
            )}
        </>
    )
    return <ModalLayout title={topicName} body={body} closeAction={closeAction} />
}