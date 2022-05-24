// https://mailchimp.com/developer/marketing/api/
const client = require('@mailchimp/mailchimp_marketing')
const winston = require('../../logs/logger')

client.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.SERVER_PREFIX
})

const subscribe = async (req, res) => {
  const { email } = req.body
  await client.lists.batchListMembers(process.env.LIST_ID, {
    update_existing: true,
    members: [{
      email_address: email,
      status: 'subscribed'
    }]
  })
    .then(response => {
      winston.info({ label: 'subscribe - OK', message: response })
      res.status(201).json(response)
    }).catch(err => {
      winston.error({ label: 'subscribe - ERROR', message: err })
      res.status(500).json(err)
    })
}

const unSubscribe = async (req, res) => {
  const { email } = req.body
  await client.lists.batchListMembers(process.env.LIST_ID, {
    update_existing: true,
    members: [{
      email_address: email,
      status: 'unsubscribed'
    }]
  })
    .then(response => {
      winston.info({ label: 'unSubscribe - OK', message: response })
      res.status(204).json(response.json())
    }).catch(err => {
      winston.error({ label: 'unSubscribe - ERROR', message: err })
      res.status(500).json(err)
    })
}

module.exports = {
  subscribe,
  unSubscribe
}
