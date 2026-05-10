import { Brevo } from '@getbrevo/brevo';

const client = new Brevo({
    apiKey: process.env.BREVO_API_KEY
});

export const sendEmail = async (to, subject, text) => {
    try {
        await client.sendTransactionalEmail({
            to: [{ email: to }],
            sender: { email: 'morenikejiolowo101@gmail.com', name: 'Smota' },
            subject,
            htmlContent: `<p>${text}</p>`,
        });
        console.log(`email sent to: ${to}`);
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}