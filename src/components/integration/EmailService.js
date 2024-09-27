import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      accessToken,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
  });

  return transporter;
};

export const sendAccessEmail = async (email, notionLink) => {
  const transporter = await createTransporter();
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Доступ к курсу',
    text: `Спасибо за покупку курса! Вот ваша ссылка: ${notionLink}`,
    html: `<p>Спасибо за покупку курса!</p><p>Вот ваша <a href="${notionLink}">ссылка</a>.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
