require('dotenv').config()
// https://nodemailer.com/about/
const nodemailer = require('nodemailer')

const sendEmail = async (receiver, subject, enlace) => {
  // const testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: `${process.env.E_HOST}`, // 'smtp.ethereal.email'
    port: process.env.E_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: `${process.env.E_USER}`, // testAccount.user
      pass: `${process.env.E_PASS}` // testAccount.pass
    }
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "'Vitae 🥓' <hi@vitop.xyz>", // sender address
    to: receiver, // list of receivers
    subject: subject, // Subject line
    // text: text, // plain text body
    html: enlace, // html body
    attachments: [{
      // filename: 'logo.png',
      // path: 'https://domain.vercel.app/logo.png',
      // cid: 'logo'
    }]
  })

  return {
    'Message sent: %s': info.messageId,
    'Preview URL: %s': nodemailer.getTestMessageUrl(info)
  }
}

module.exports = {
  sendEmail
}
