'use server'

import { sql } from "@vercel/postgres";
import { Card, Topic } from "./types";

export async function fetchTopics() {
   try {
      const data = await sql<Topic>`SELECT * FROM topics`;
      return data.rows;
   } catch (error) {
      console.log(error)
      throw new Error('Failed fetch topics data');
   }
}

export async function fetchCards(topicId: string) {
   try {
      const data = await sql<Card>`SELECT * FROM cards WHERE topic_id = ${topicId}`;
      return data.rows;
   } catch (error) {
      console.log(error)
      throw new Error('Failed fetch cards data');
   }
}

export async function getUser(email: string): Promise<User | undefined> {
   try {
      const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
      return user.rows[0];
   } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
   }
}