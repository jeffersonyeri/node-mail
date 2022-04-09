const { Router } = require('express');
const nodeMailer = require('nodemailer');
const router = Router();

router.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;

    contentHTML = `
    <h1>User Information</h1>
    <ul>
    <li>Name: ${name}</li>
    <li>Email: ${email}</li>
    <li>Phone: ${phone}</li>
    </ul>
    <p>${message}</p>
    `;

    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        auth: {
            user: 'j@gmail.com',
            pass: 'password'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const info = await transporter.sendMail({
        from: 'node-email-test',
        to: 'correo destinatario',
        subject: 'Node Email Test',
        html: contentHTML
    });

    console.log('Message sent: %s', info.messageId);

    res.redirect('/success.html');
});

module.exports = router;