import { TransactionalEmailsApi, SendSmtpEmail, ApiClient } from '@getbrevo/brevo';

const apiInstance = new TransactionalEmailsApi();
apiInstance.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

export const sendEmail = async (to, subject, text) => {
    try {
        const sendSmtpEmail = new SendSmtpEmail();
        sendSmtpEmail.to = [{ email: to }];
        sendSmtpEmail.sender = { email: 'morenikejiolowo101@gmail.com', name: 'Smota' };
        sendSmtpEmail.subject = subject;
        sendSmtpEmail.htmlContent = `<p>${text}</p>`;

        await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log(`email sent to: ${to}`);
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}