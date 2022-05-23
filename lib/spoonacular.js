require('dotenv').config()
const fetch = require('node-fetch')

const BASE_PATH = 'https://api.spoonacular.com/'
// const dieta = 'vegetarian'

/**
 *
 * @param {*} query
 * @returns
 */
const searchRecipes = async function (query) {
  const params = new URLSearchParams({
    apiKey: process.env.SPOONACULAR_API_KEY,
    diet: query.dieta,
    query: query.query,
    number: '12',
    limitLicense: true,
    instructionsRequired: true,
    addRecipeInformation: true,
    addRecipeNutrition: true
  })
  const url = `${BASE_PATH}/recipes/complexSearch?${params.toString()}`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json)

  return res
}

/**
 *
 * @param {*} query
 * @returns
 */
const getRecipes = async function (query) {
  const params = new URLSearchParams({
    apiKey: process.env.SPOONACULAR_API_KEY,
    tags: query.dieta,
    number: '1',
    limitLicense: 'true',
    instructionsRequired: true,
    addRecipeInformation: true,
    addRecipeNutrition: true
  })
  const url = `${BASE_PATH}/recipes/random?${params.toString()}`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

  return res
}

/**
 *
 * @param {*} query
 * @returns
 */
const getNutrition = async function (id) {
  const params = new URLSearchParams({ apiKey: process.env.SPOONACULAR_API_KEY })
  const url = `${BASE_PATH}/recipes/${id}/nutritionWidget.json?${params.toString()}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

  return response
}

/**
 *
 * @param {*} query
 * @returns
 */
const getQuote = async function (query) {
  const params = new URLSearchParams({ apiKey: process.env.SPOONACULAR_API_KEY })
  const url = `${BASE_PATH}/food/jokes/random?${params.toString()}`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  return res
}

/**
 *
 * @param {*} query
 * @returns
 */
const getSubstitute = async function (query) {
  const params = new URLSearchParams({
    apiKey: process.env.SPOONACULAR_API_KEY,
    substitutes: query
  })
  const url = `${BASE_PATH}/food/ingredients/substitutes?${params.toString()}`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  return res
}

module.exports = {
  searchRecipes,
  getRecipes,
  getNutrition,
  getQuote,
  getSubstitute
}
