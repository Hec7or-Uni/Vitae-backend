// https://mailchimp.com/developer/marketing/api/
const client = require('@mailchimp/mailchimp_marketing')

client.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.SERVER_PREFIX
})

const subscribe = async (req, res) => {
  const { email } = req.body
  const response = await client.lists.batchListMembers(process.env.LIST_ID, {
    update_existing: true,
    members: [{
      email_address: email,
      status: 'subscribed'
    }]
  })
  res.status(200).json(response)
}

const unSubscribe = async (req, res) => {
  const { email } = req.body
  const response = await client.lists.batchListMembers(process.env.LIST_ID, {
    update_existing: true,
    members: [{
      email_address: email,
      status: 'unsubscribed'
    }]
  })
  res.status(200).json(response)
}

module.exports = {
  subscribe,
  unSubscribe
}

// const subscribe = async (req, res) => {
//   const { email } = req.body

//   if (email === '' || email === null || undefined === null) {
//     res.status(500).json('Internal server error')
//     return
//   }

//   const response = await fetch(`https://${process.env.SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.LIST_ID}`, {
//     method: 'POST',
//     headers: {
//       Authorization: `auth ${process.env.MAILCHIMP_API_KEY}`,
//       'Content-Type': 'application/json',
//       charset: 'utf-8'
//     },
//     body: JSON.stringify({
//       update_existing: true,
//       members: [{
//         email_address: email,
//         status: 'subscribed' // pending para mandar correo de confirmacion
//       }]
//     })
//   }).then((res) => res.json())

//   if ((response.total_created === 1 || response.total_updated === 1) && (response.error_count === 0)) {
//     res
//       .status(200)
//       .json(response)
//   } else {
//     res
//       .status(405)
//       .json(response)
//   }
// }
