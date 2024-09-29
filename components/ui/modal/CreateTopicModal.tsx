import { BaseModalPropsType } from "@/app/lib/types";
import LongButton from "../button/LongButton";
import ModalLayout from "./ModalLayout";
import { createTopic } from "@/app/lib/actions";
import "@/components/ui/input/input-style.css"
import React from "react";

export default function CreateTopicModal({ closeAction }: BaseModalPropsType) {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createTopic(new FormData(event.currentTarget))
            closeAction();
        } catch (error) {
            console.log(error)
        }
    }

    const body: React.ReactNode = (
        <div className="mb-6">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Example: Japanese Vocabulary"
                />
                <LongButton text="Save"/>
            </form>
        </div>
    )
    return <ModalLayout title="New Topic" body={body} closeAction={closeAction} />
}