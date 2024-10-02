import { db } from '@vercel/postgres'

const client = await db.connect();

async function createTableUsers() {
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

async function createTableTopics() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS topics (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            user_id UUID NOT NULL,
            CONSTRAINT fk_user
                FOREIGN KEY (user_id) 
                REFERENCES users(id)
                ON DELETE CASCADE
        );
    `;
    console.log("Create table success: topics")
}

async function createTableCards() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS cards (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            value_1 VARCHAR(255) NOT NULL,
            value_2 VARCHAR(255) NOT NULL,
            topic_id UUID NOT NULL,
            CONSTRAINT fk_topic
                FOREIGN KEY (topic_id) 
                REFERENCES topics(id)
                ON DELETE CASCADE
        );
    `;

    console.log("Create table success: cards")
}

export async function GET() {
    try {
        await client.sql`BEGIN`;
        await createTableUsers();
        await createTableTopics();
        await createTableCards();
        await client.sql`COMMIT`;

        return Response.json({ message: "Database seeded successfully" });
    } catch (error) {
        await client.sql`ROLLBACK`;
        console.log(error)
        return Response.json({ error }, { status: 500 });
    }
}