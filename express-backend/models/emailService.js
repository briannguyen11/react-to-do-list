import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', // Example using Gmail; use your email service
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password' // It's recommended to use environment variables for security
    }
});

export function sendVerificationEmail(userEmail, verificationToken) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: userEmail,
        subject: 'Verify your email',
        text: `Please verify your email by clicking on this link: ${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
