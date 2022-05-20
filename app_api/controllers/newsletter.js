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
