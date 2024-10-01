'use server';

import { sql } from "@vercel/postgres";
import { z } from "zod"
import bcrypt from 'bcrypt';

const TopicFormSchema = z.object({
    user_id: z.string(),
    id: z.string(),
    name: z.string()
});

const CardFormSchema = z.object({
    id: z.string(),
    value1: z.string(),
    value2: z.string(),
    topicId: z.string()
})

const UserFormSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string()
})

const CreateTopic = TopicFormSchema.omit({ id: true });
const CreateCard = CardFormSchema.omit({id: true});
const CreateUser = UserFormSchema.omit({id: true})

export async function createTopic(formData: FormData) {
    const { name, user_id } = CreateTopic.parse({
        user_id: formData.get("user_id"),
        name: formData.get("name")
    })

    await sql`
        INSERT INTO topics (name, user_id)
        VALUES (${name}, ${user_id})
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

export async function createUser(formData: FormData) {
    const {name, email, password} = CreateUser.parse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    })

    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await sql`
            INSERT INTO users (name, email, password)
            VALUES (${name}, ${email}, ${hashedPassword});
        `
        console.log("Create user success");
    } catch (error) {
        console.log("Something wrong when bcrypt passwordL: " + error)
    }
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