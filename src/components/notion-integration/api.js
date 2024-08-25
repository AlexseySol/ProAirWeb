import axios from 'axios';

const SHEETS_API_URL = process.env.GOOGLE_SHEETS_API_URL;
const SHEETS_API_TOKEN = process.env.GOOGLE_SHEETS_API_TOKEN;

export const getEmailsFromGoogleSheets = async () => {
  try {
    const response = await axios.get(SHEETS_API_URL, {
      headers: {
        Authorization: SHEETS_API_TOKEN,
      },
    });
    return response.data.data.map(row => row.email); // Предполагается, что столбец называется "email"
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    throw error;
  }
};
