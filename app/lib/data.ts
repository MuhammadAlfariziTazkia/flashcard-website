'use server'

import { sql } from "@vercel/postgres";
import { Card, CardCount, Topic, TopicAndCardsCount, User } from "./types";

export async function fetchTopicsByUserId(userId: string) {
   try {
      const data = await sql<Topic>`SELECT * FROM topics WHERE user_id = ${userId}`;
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

export async function fetchCardsCount(topicId: string){
   try {
      const data = await sql<CardCount>`SELECT COUNT(id) FROM cards WHERE topic_id = ${topicId}`;
      return data.rows[0].count;
   } catch (error) {
      console.log(error)
      throw new Error('Failed fetch cards count data');
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

export async function fetchTopicsAndCardsCount(userId: string) {
   try {
      const user = await sql<TopicAndCardsCount>`
         SELECT t.id, COUNT(c.id) FROM topics t 
         JOIN cards C ON t.id = c.topic_id 
         GROUP BY t.id
         HAVING t.user_id = ${userId} 
         `;
      return user.rows;
   } catch (error) {
      console.error('Failed to fetch topics and cards count:', error);
      throw new Error('Failed to fetch topics and cards count.');
   }

}