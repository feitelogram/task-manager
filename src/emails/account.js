const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "nicholas.feitel@gmail.com",
        subject: "Thanks for signing up!",
        text: `Hi ${name}! Thank you so much for signing up with Tasky!`
    })
}

const sendGoodbyeEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: "nicholas.feitel@gmail.com",
        subject: "Sorry to see you go!",
        text: `Hi ${name}, sorry to see you go! Please let us know by replying if there was any way we could improve.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}