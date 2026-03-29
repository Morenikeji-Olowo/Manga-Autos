import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, subject, text) =>{
    try{
        const {error} = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to,
            subject,
            html: `<p>${text}</p>`,
        })

        if(error){
            console.error(error.message);
            throw new Error(error.message)            
        }

        console.log(`email sent to: ${to}`)
    }
    catch(err){
        console.error(err);
        throw err
    }
}