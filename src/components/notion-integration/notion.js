import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_TOKEN });
const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID;

export const addUserToNotion = async (email) => {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_PAGE_ID,
      filter: {
        property: 'Email',
        email: {
          equals: email,
        },
      },
    });

    // Если пользователя нет в базе, добавляем
    if (response.results.length === 0) {
      const newUser = await notion.pages.create({
        parent: { database_id: NOTION_PAGE_ID },
        properties: {
          'Email': {
            type: 'email',
            email: email,
          },
        },
      });

      return newUser;
    } else {
      return response.results[0];
    }
  } catch (error) {
    console.error('Error adding user to Notion:', error);
    throw error;
  }
};
