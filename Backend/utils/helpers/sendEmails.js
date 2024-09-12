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
            html: `<p>Click the button below to verify your email:</p>
                  <a href="${url}">
                  <button>Verify Email</button></a>`
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