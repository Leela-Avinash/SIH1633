import nodemailer from "nodemailer";

async function sendEmail(email, subject, url) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        const mailOptions = {
            from: process.env.USER,
            to: email,
            subject: subject,
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
                <p style="font-size: 18px; color: #333;">Click the button below to verify your email:</p>
                <a href="${url}" style="text-decoration: none;">
                  <button style="background-color: #3b82f6; color: white; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
                    Verify Email
                  </button>
                </a>
              </div>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Verification email sent: ' + info.response);
            }
        });

        console.log("Email sent Seccussfully");
    } catch(error){
        console.log("Error! email not send");
        console.log(error);
    }
}

export default sendEmail;