import { getEmailsFromGoogleSheets } from './api';
import { addUserToNotion } from './notion';
import { sendAccessEmail } from './email';

export const processUsers = async () => {
  try {
    const emails = await getEmailsFromGoogleSheets();

    for (const email of emails) {
      const user = await addUserToNotion(email);

      const notionLink = `https://www.notion.so/${user.id}`; // Формируем ссылку на страницу пользователя
      await sendAccessEmail(email, notionLink);
    }
  } catch (error) {
    console.error('Error processing users:', error);
  }
};

// Вызов функции обработки пользователей
processUsers();
