// import fetch from 'node-fetch'
// import key from './spoonToken.js'

// const key = require('./spoonToken')
require('dotenv').config()
const key = process.env.key

// const key = process.env.KEY
const fetch = require('node-fetch')

// ${process.env.PATH}/recipes/complexSearch/?apiKey=${process.env.API_KEY}&${parameter}

// const body = { username: 'your users name', firstName: 'your users first name', lastName: 'your users last name', email: 'your users email' }

const addr = 'https://api.spoonacular.com/'

const token = '?apiKey=' + key
console.log(token)

const dieta = 'vegetarian'
// const diet = '&diet=' + dieta

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
  // query = 'rice'
  console.log(query)
  const params = new URLSearchParams({ apiKey: key, diet: dieta, query: query, number: '12', limitLicense: true, instructionsRequired: true, addRecipeInformation: true, addRecipeNutrition: true })
  const url = `${addr}/recipes/complexSearch?${params.toString()}`
  //  const response = await fetch(addr + '/recipes/complexSearch' + token + diet, {
  const response = await fetch(url, {
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

// get receta
const getRecipes = async function (query) {
  const params = new URLSearchParams({ apiKey: key, tags: dieta, number: '12', limitLicense: 'true', instructionsRequired: true, addRecipeInformation: true, addRecipeNutrition: true })
  const url = `${addr}/recipes/random?${params.toString()}`
  const response = await fetch(url, {
    method: 'get',
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
  const params = new URLSearchParams({ apiKey: key })
  const url = `${addr}/food/jokes/random?${params.toString()}`
  // const response = await fetch(addr + '/food/jokes/random' + token + diet, {
  const response = await fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = response.json()

  console.log(data)
}

// Get substitute
const getSubstitute = async function (query) {
  const params = new URLSearchParams({ apiKey: key, substitutes: query })
  const url = `${addr}/food/ingredients/substitutes?${params.toString()}`
  const response = await fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = response.json()

  console.log(data)
}

module.exports = {
  searchRecipes, // Busca 10 recetas con query
  getRecipes, // Trae 10 recetas aleatorias
  // RecipeById, // Obtienes receta a partir del id
  getQuote, // Fun fact sobre comida
  getSubstitute
}

// const response = await fetch(addr + '/recipes/complexSearch' + token + diet + '&query=rice', {
//   'method': 'get',
//   'headers': {
//     'Content-Type': 'application/json'
//   },
// });
// const data = await response.json();
// console.log(data);
