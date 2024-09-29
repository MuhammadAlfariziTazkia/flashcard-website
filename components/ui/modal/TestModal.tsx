import React, { useEffect, useState } from "react";
import LongButton from "../button/LongButton";
import ModalLayout from "./ModalLayout";
import { Card, TestModalType } from "@/app/lib/types";
import Button from "../button/Button";
import TextInput from "../input/TextInput";
import WrongAnswerAlert from "../alert/DangerAlert";
import CorrectAnswerAlert from "../alert/SuccessAlert";
import DangerAlert from "../alert/DangerAlert";
import SuccessAlert from "../alert/SuccessAlert";


export default function TestModal({ cards, closeAction }: TestModalType) {
    const [index, setIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [correctness, setCorrectness] = useState(0);    
        
    const handleInputAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
    }

    const handleCheckAnswer = () => {
        const input = answer.toLowerCase().replaceAll(" ", "");
        const expected = cards[index].value_2.toLowerCase().replaceAll(" ", "");
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
            <div className="mb-6">
                <p className="text-4xl font-bold text-gray-800 text-center my-10">{cards[index].value_1}</p>
                <TextInput placeholder="Answer" onChange={handleInputAnswer} value={answer} />
                <LongButton text="Check Answer" action={handleCheckAnswer} />
                {correctness == 2 && (
                    <DangerAlert message={"Correct answer: " + cards[index].value_2} />
                )}
                {correctness == 3 && index < cards.length - 1 && (
                    <>
                        <SuccessAlert message={"Correct !"} />
                        <hr className="my-3" />
                        <div className="flex justify-end">
                            <Button
                                iconType="play"
                                popup={true}
                                text="Next Card"
                                action={handleNextQuestion}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    )
    return <ModalLayout title="Topic Name" body={body} closeAction={closeAction} />
}