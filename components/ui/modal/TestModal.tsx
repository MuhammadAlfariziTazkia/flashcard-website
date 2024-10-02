import React, { useEffect, useState } from "react";
import LongButton from "../button/LongButton";
import ModalLayout from "./ModalLayout";
import { Card, TestModalType } from "@/app/lib/types";
import Button from "../button/Button";
import CustomInput from "../input/CustomInput";
import DangerAlert from "../alert/DangerAlert";
import SuccessAlert from "../alert/SuccessAlert";
import { PlayIcon } from "lucide-react";
import { fetchCards } from "@/app/lib/data";

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function TestModal({ topicId, closeAction, topicName }: TestModalType) {
    const [index, setIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [cards, setCards] = useState<Card[]>([])
    const [cardsCount, setCardsCount] = useState(0);
    const [correctness, setCorrectness] = useState(0);

    useEffect(() => {
        async function loadCards() {
            const data = await fetchCards(topicId)
            setCards(data);
            setCardsCount(data.length)
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
                    <CustomInput placeholder="Answer" onChange={handleInputAnswer} value={answer} />
                    <LongButton text="Check Answer" type="submit" />
                    </form>
                    {correctness == 2 && (
                        <DangerAlert message={"Correct answer: " + cards[index].value_2} />
                    )}
                    {correctness == 3 && (
                        <>
                            <hr className="my-3" />
                            <SuccessAlert message={"Correct !"} />
                            <div className="flex justify-end">
                                <Button
                                    iconComponent={<PlayIcon className="button-icon" />}
                                    text="Next Card"
                                    action={handleNextQuestion}
                                />
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    )
    return <ModalLayout title={topicName} body={body} closeAction={closeAction} />
}