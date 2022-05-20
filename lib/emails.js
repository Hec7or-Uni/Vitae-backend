// https://nodemailer.com/about/
const nodemailer = require('nodemailer')

const sendEmail = async (receiver, subject, enlace) => {
  const testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email', // `${process.env.E_HOST}`,
    port: 587, // process.env.E_PORT,
    secure: false, // true, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // `${process.env.E_USER}`,
      pass: testAccount.pass // `${process.env.E_PASS}`
    }
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "'Vitae 🥓' <798095@unizar.es>", // sender address
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
