import React from "react";
import LongButton from "../button/LongButton";
import Input from "../input/TextInput";
import ModalLayout from "./ModalLayout";
import { CreateTopicModalPropsType } from "@/app/lib/types";
import Button from "../button/Button";

export default function TestModal({ closeAction }: CreateTopicModalPropsType) {
    const body: React.ReactNode = (
        <>
        <div className="mb-6">
            <p className="text-4xl font-bold text-gray-800 text-center my-10">べんきょうします</p>
            <form>
                <Input placeholder="Answer" />
                <LongButton text="Check Answer" />
            </form>
        </div>
        <hr className="my-3"/>
        <div className="flex justify-end">
        <Button 
            iconType="play"
            popup={true}
            text="Next Card"
          />
      </div>
      </>
    )
    return <ModalLayout title="Topic Name" body={body} closeAction={closeAction} />
}