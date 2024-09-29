import React, { useEffect, useState } from "react";
import LongButton from "../button/LongButton";
import ModalLayout from "./ModalLayout";
import { Card, TestModalType } from "@/app/lib/types";
import Button from "../button/Button";
import TextInput from "../input/TextInput";
import DangerAlert from "../alert/DangerAlert";
import SuccessAlert from "../alert/SuccessAlert";

function shuffleArray(cardsArray: Card[]): Card[] {
    return cardsArray.sort(() => Math.random() - 0.5);
}

function isQuestionEnd(length: number, currentIndex: number) {
    return currentIndex == length - 1;
}

export default function TestModal({ cards, closeAction }: TestModalType) {
    const [index, setIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [correctness, setCorrectness] = useState(0);
    const [shuffledCards, setShuffledCards] = useState<Card[]>([])

    useEffect(() => {
        setShuffledCards(shuffleArray(cards));
    }, [])

    const handleInputAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
    }

    const handleCheckAnswer = () => {
        const input = answer.toLowerCase().replaceAll(" ", "");
        const expected = shuffledCards[index].value_2.toLowerCase().replaceAll(" ", "");
        console.log(input == expected);
        if (input == expected) setCorrectness(3);
        else if (input.length > 0) setCorrectness(2);
    }

    const handleNextQuestion = () => {
        setCorrectness(0)
        setAnswer("");
        setIndex(index + 1);
    }

    const body: React.ReactNode = (
        <>
            {shuffledCards.length && (
                <div>
                    <p className="text-4xl font-bold text-gray-800 text-center my-10">{shuffledCards[index].value_1}</p>
                    <TextInput placeholder="Answer" onChange={handleInputAnswer} value={answer} />
                    <LongButton text="Check Answer" action={handleCheckAnswer} />
                    {correctness == 2 && (
                        <DangerAlert message={"Correct answer: " + shuffledCards[index].value_2} />
                    )}
                    {correctness == 3 && (
                        <>
                            <hr className="my-3" />
                            <SuccessAlert message={"Correct !"} />
                            <div className="flex justify-end">
                                {
                                    isQuestionEnd(shuffledCards.length, index)
                                        ? (

                                            <Button
                                                iconType="flag"
                                                popup={true}
                                                text="Finish"
                                                action={closeAction}
                                            />
                                        )
                                        : (
                                            <Button
                                                iconType="play"
                                                popup={true}
                                                text="Next Card"
                                                action={handleNextQuestion}
                                            />
                                        )
                                }
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    )
    return <ModalLayout title="Topic Name" body={body} closeAction={closeAction} />
}