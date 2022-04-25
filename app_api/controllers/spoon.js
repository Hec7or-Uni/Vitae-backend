// import fetch from 'node-fetch'
// import key from './spoonToken.js'

// const key = require('./spoonToken')
const key = process.env.KEY
const fetch = require('node-fetch')

// ${process.env.PATH}/recipes/complexSearch/?apiKey=${process.env.API_KEY}&${parameter}

// const body = { username: 'your users name', firstName: 'your users first name', lastName: 'your users last name', email: 'your users email' }

const addr = 'https://api.spoonacular.com/'

const token = '?apiKey=' + key
// console.log(token)

const dieta = 'vegetarian'
const diet = '&diet=' + dieta

// Test inicial

// const response = await fetch(addr + 'users/connect' + token, {
//  'method': 'post',
//  'body': JSON.stringify(body),
//  'headers': {
//    'Content-Type': 'application/json'
//  },
// });

// Search receta
const searchRecipes = async function (query) {
  const response = await fetch(addr + '/recipes/complexSearch' + token + diet, {
    method: 'get',
    // 'body': JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = response.json()
  console.log(data)
  return data
}

// Get Quote
const getQuote = async function (query) {
  const response = await fetch(addr + '/food/jokes/random' + token + diet, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = response.json()

  console.log(data)
}

module.exports = {
  searchRecipes,
  getQuote
}

// const response = await fetch(addr + '/recipes/complexSearch' + token + diet + '&query=rice', {
//   'method': 'get',
//   'headers': {
//     'Content-Type': 'application/json'
//   },
// });
// const data = await response.json();
// console.log(data);
