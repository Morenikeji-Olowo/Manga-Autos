import SibApiV3Sdk from '@getbrevo/brevo';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

export const sendEmail = async (to, subject, text) => {
    try {
        await apiInstance.sendTransacEmail({
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