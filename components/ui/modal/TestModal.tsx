import React from "react";
import LongButton from "../button/LongButton";
import Input from "../input/TextInput";
import ModalLayout from "./ModalLayout";

export default function TestModal({ closeAction }: CreateTopicModaPropsType) {
    const body: React.ReactNode = (
        <>
            <p className="text-4xl font-bold text-gray-800 text-center my-10">べんきょうします</p>
            <form>
                <Input placeholder="Answer" />
                <LongButton text="Check Answer" />
            </form>
        </>
    )
    return <ModalLayout title="Topic Name" body={body} closeAction={closeAction} />
}