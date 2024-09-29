'use server';

import { sql } from "@vercel/postgres";
import { z } from "zod"

const TopicFormSchema = z.object({
    id: z.string(),
    name: z.string()
});

const CardFormSchema = z.object({
    id: z.string(),
    value1: z.string(),
    value2: z.string(),
    topicId: z.string()
})

const CreateTopic = TopicFormSchema.omit({ id: true });

const CreateCard = CardFormSchema.omit({id: true});

export async function createTopic(formData: FormData) {
    const { name } = CreateTopic.parse({
        name: formData.get("name")
    })

    await sql`
        INSERT INTO topics (name)
        VALUES (${name})
    `;
}

export async function createCard(formData: FormData) {
    const { value1, value2, topicId } = CreateCard.parse({
        value1: formData.get("value1"),
        value2: formData.get("value2"),
        topicId: formData.get("topicId"),
    })

    await sql`
        INSERT INTO cards (value_1, value_2, topic_id)
        VALUES (${value1}, ${value2}, ${topicId})
    `;
}

export async function deleteCard (id: string) {
    await sql`
        DELETE FROM cards WHERE id = ${id}
    `;
}

export async function deleteTopic (id: string) {
    await sql`
        DELETE FROM topics WHERE id = ${id}
    `  
}