'use server';

import { sql } from "@vercel/postgres";
import { z } from "zod"

const TopicFormSchema = z.object({
    id: z.string(),
    name: z.string()
});

const CreateTopic = TopicFormSchema.omit({ id: true });

export async function createTopic(formData: FormData) {
    const { name } = CreateTopic.parse({
        name: formData.get("name")
    })

    await sql`
        INSERT INTO topics (name)
        VALUES (${name})
    `;
}