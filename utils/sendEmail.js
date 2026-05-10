import SibApiV3Sdk from 'sib-api-v3-sdk';

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendEmail = async (to, subject, text) => {
    try {
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
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