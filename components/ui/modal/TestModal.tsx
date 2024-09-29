import React, { useEffect, useState } from "react";
import LongButton from "../button/LongButton";
import ModalLayout from "./ModalLayout";
import { Card, TestModalType } from "@/app/lib/types";
import Button from "../button/Button";
import TextInput from "../input/TextInput";

function shuffleArray(cardsArray: Card[]): Card[] {
    return cardsArray.sort(() => Math.random() - 0.5);
}

export default function TestModal({ cards, closeAction }: TestModalType) {
    const [index, setIndex] = useState(0);
    cards = shuffleArray(cards);

    const body: React.ReactNode = (
        <>
            <div className="mb-6">
                <p className="text-4xl font-bold text-gray-800 text-center my-10">{cards[index].value_1}</p>
                <form>
                    <TextInput placeholder="Answer" />
                    <LongButton text="Check Answer" />
                </form>
            </div>
            <hr className="my-3" />
            <div className="flex justify-end">
                {index < cards.length - 1 && <Button
                    iconType="play"
                    popup={true}
                    text="Next Card"
                    action={() => setIndex(index + 1)}
                />}
            </div>
        </>
    )
    return <ModalLayout title="Topic Name" body={body} closeAction={closeAction} />
}