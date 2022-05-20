const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
export default async function main (receiver, subject, enlace) {
  const template = `<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Recovery</title> <style>body{background-color: #fff; box-sizing: border-box; margin: 0; padding: 0;}th{width: 500px;}p{display: block; color: #222222; font-size: 14px; line-height: 1.5; font-weight: 400; letter-spacing: 0.35px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;}a{color: #fff; width: 200px; text-decoration: none; font-size: 14px; line-height: 1.5; font-weight: 400; letter-spacing: 0.35px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;}img{width: 8rem;}hr{margin: 10px 0px 10px; opacity: 0.25; height: 0.5px; border: 0px; background-color: #999999;}table{margin: auto;}</style></head><body> <table> <tr> <th> <a href="https://florbook.vercel.app/"> <img src="cid:logo" style="display: block; margin: auto;"> </a> </th> </tr><tr> <th style="text-align: center;"> <hr/> <p style="margin-top: 25px;">Hola Hec7orci7o, ¿querías restablecer la contraseña?</p><p style="margin-top: 40px; margin-bottom: 25px; text-align: left; padding: 0px 20px 0px;"> Alguien (esperemos que tú) nos ha solicitado restablecer la contraseña de tu cuenta de Twitch. Haz clic en el botón siguiente para hacerlo. Si no solicitaste restablecer la contraseña, puedes ignorar este mensaje. </p></th> </tr><tr> <th> <hr style="margin-bottom: 40px;"/> <a href="${enlace}" style="color: #fff; background-color: #15c; font-size: 14px; padding: 10px 20px 10px;" > Restablece tu contraseña </a> <p style="margin-top: 15px; color: #999999; font-size: 12px;"> O haz clic en este enlace: <a href="${enlace}" style="color: #999999; font-size: 12px; text-decoration: underline;" > ${enlace}</a> </p><p style="margin-top: 50px; ">© 2021 Florbook. Todos los derechos reservados<br/>Calle Rioja 4, Zaragoza, ES, 50017 - ZGZ</p></th> </tr></table></body></html>`

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: `${process.env.E_HOST}`,
    port: process.env.E_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: `${process.env.E_USER}`,
      pass: `${process.env.E_PASS}`
    }
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "'Vitae 🥓' <contact@hec7or.me>", // sender address
    to: receiver, // list of receivers
    subject: subject, // Subject line
    // text: text, // plain text body
    html: template, // html body
    attachments: [
      {
        // filename: 'logo.png',
        // path: 'https://domain.vercel.app/logo.png',
        // cid: 'logo'
      }
    ]
  })

  console.log('Message sent: %s', info.messageId)
}
