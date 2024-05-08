import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/model/userModel';

export const sendMail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiryDate: Date.now() + 3600000
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiryDate: Date.now() + 3600000
            })
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "a20f2df3ca2fee",
                pass: "15734f279221ba"
            }
        });

        const mailOptions = {
            from: 'rohankhanal114@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `<h1>click <a href="${process.env.DOMAIN}/verifymail?token=${hashedToken}" >here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} </h1>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}