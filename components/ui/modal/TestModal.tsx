'use client'

import { useEffect, useState } from "react";
import ModalLayout from "./ModalLayout";
import { Card } from "@/app/lib/types";
import { fetchCards } from "@/app/lib/data";
import LoadingModal from "./LoadingModal";
import CheckAnswerButton from "../button/CheckAnswerButton";
import NextQuestionButton from "../button/NextQuestionButton";
import IncorrectAlert from "../alert/IncorrectAlert";
import CorrectAlert from "../alert/CorrectAlert";
import FinishButton from "../button/FinishButton";

interface Props {
    topicId: string;
    topicName: string;
    closeAction: () => void;
}


function shuffleArray(cardsArray: Card[]): Card[] {
    return cardsArray.sort(() => Math.random() - 0.5);
}

function isLastQuestion(currentIndex: number, cardsNumber: number) {
    return currentIndex == cardsNumber - 1;
}

export default function TestModal({ topicId, topicName, closeAction }: Props) {
    const [questions, setQuestions] = useState<Card[]>([])
    const [buttonMode, setButtonMode] = useState<"Check" | "Next" | "Finish">("Check")
    const [status, setStatus] = useState<"Reset" | "Incorrect" | "Correct">("Reset")
    const [correctNumber, setCorrectNumber] = useState(0);
    const [incorrectNumber, setIncorrectNumber] = useState(0);
    const [answer, setAnswer] = useState("");
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
    }

    useEffect(() => {
        async function loadQuestions() {
            setIsLoading(true);
            try {
                setQuestions(shuffleArray(await fetchCards(topicId)));
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        loadQuestions();
    }, [])

    const handleCheckAnswer = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const input = answer.toLowerCase().replaceAll(" ", "");
        const expected = questions[index].value_2.toLowerCase().replaceAll(" ", "");
        if (input == expected) {
            setStatus("Correct")
            setCorrectNumber(correctNumber + 1);
        }
        else {
            setStatus("Incorrect")
            setIncorrectNumber(incorrectNumber + 1)
        }
        if (isLastQuestion(index, questions.length)) setButtonMode("Finish")
        else setButtonMode("Next")
    }

    const handleNextQuestion = () => {
        setIndex(index + 1);
        setAnswer("")
        setStatus("Reset")
        setButtonMode("Check")
    }

    const body: React.ReactNode = (
        <>
            {status == "Incorrect" && (
                <IncorrectAlert rightAnswer={questions[index].value_2}/>
            )}
            {status == "Correct" && (
                <CorrectAlert/>
            )}
            {questions.length > 0 && (
                <div>
                    <p className="text-4xl font-bold text-gray-800 text-center my-10">{questions[index].value_1}</p>
                    <form onSubmit={handleCheckAnswer}>
                        <input type="text" placeholder="Answer" value={answer} onChange={handleInputAnswer}/>
                        {buttonMode == "Check" && (
                            <CheckAnswerButton />
                        )}
                        {buttonMode == "Next" && (
                            <NextQuestionButton action={handleNextQuestion} />
                        )}
                        {buttonMode == "Finish" && (
                            <FinishButton closeAction={closeAction} />
                        )}
                        <div className="bg-gray-200 p-4 rounded-xl shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] mt-5">
                            <p className="text-center text-gray-800 font-semibold">Progress</p>
                            <div className="flex justify-between text-sm text-gray-600 mt-2">
                                <span className="text-green-600">Correct: {correctNumber}</span>
                                <span className="text-red-800">Incorrect: {incorrectNumber}</span>
                                <span>Total: {questions.length}</span>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            {isLoading && (
                <LoadingModal message="Loading questions..." />
            )}
        </>
    );

    return (
        <ModalLayout title={topicName} closeAction={closeAction} body={body} />
    )
}