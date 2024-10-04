import { Modal } from "@/app/lib/types";
import LongButton from "../button/LongButton";
import ModalLayout from "./ModalLayout";
import { createTopic } from "@/app/lib/actions";
import "@/components/ui/input/input-style.css"
import React from "react";

interface Props extends Modal {
    userId: string;
    updateAction: () => void;
}

export default function CreateTopicModal({ closeAction, updateAction, userId }: Props) {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            updateAction();
            closeAction();
            await createTopic(new FormData(event.currentTarget))
        } catch (error) {
            console.log(error)
        }
    }

    const body: React.ReactNode = (
        <div className="mb-6">
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="user_id" value={userId} />
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