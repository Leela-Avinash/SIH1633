import nodemailer from "nodemailer";

async function sendEmail(email, subject, otp) {
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
                <p style="font-size: 18px; color: #333;">Your OTP for email verification is:</p>
                <div style="font-size: 24px; font-weight: bold; color: #3b82f6; padding: 10px;">
                    ${otp}
                </div>
                <p style="font-size: 16px; color: #333;">Please enter this OTP on the signup page to complete your registration.</p>
              </div>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('OTP email sent: ' + info.response);
            }
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.log("Error! email not sent");
        console.log(error);
    }
}

export default sendEmail;
