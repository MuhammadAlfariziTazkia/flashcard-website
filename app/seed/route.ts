import { db } from '@vercel/postgres'

const client = await db.connect();

async function createTableTopics() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS  topics (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
    `
    console.log("Create table success: topics")
}

async function createTableCards() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS  cards (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            value_1 VARCHAR(255) NOT NULL,
            value_2 VARCHAR(255) NOT NULL,
            topic_id VARCHAR(64) NOT NULL
        );
    `
    console.log("Create table success: cards")
}

async function seedUsers() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `; 
}  

async function addColumnUserIdOnTopics() {
    await client.sql`
        ALTER TABLE topics ADD user_id varchar(64);
    `
}

export async function GET() {
    try {
        await client.sql`BEGIN`;
        await createTableTopics();
        await createTableCards();
        await seedUsers();
        await addColumnUserIdOnTopics();
        await client.sql`COMMIT`;

        return Response.json({ message: "Database seeded successfully" });
    } catch (error) {
        await client.sql`ROLLBACK`;
        console.log(error)
        return Response.json({ error }, { status: 500 });
    }
}