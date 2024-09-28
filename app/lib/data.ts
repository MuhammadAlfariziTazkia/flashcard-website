'use server'

import { sql } from "@vercel/postgres";
import { Card, Topic } from "./types";

export async function fetchTopics () {
   try {
    const data = await sql<Topic>`SELECT * FROM topics`;
    return data.rows;
   } catch (error) {
    console.log(error)
    throw new Error('Failed fetch topics data');
   }
}

export async function fetchCards (topicId: string) {
   try {
      const data = await sql<Card>`SELECT * FROM cards WHERE topic_id = ${topicId}`;
      return data.rows;
     } catch (error) {
      console.log(error)
      throw new Error('Failed fetch cards data');
     }
}