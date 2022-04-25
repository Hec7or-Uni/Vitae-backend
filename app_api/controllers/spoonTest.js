// import fetch from 'node-fetch';
/// /import key from './spoonToken.js';
//
// const body = { "username": "your users name", "firstName": "your users first name", "lastName": "your users last name", "email": "your users email"}
//
// const addr = 'https://api.spoonacular.com/';
//
//
/// /const token = '?apiKey=' + Object.values(key);
// const token = '?apiKey=' + process.env.key;
//
// console.log(token);
//
// const dieta = "vegetarian";
// const diet = '&diet=' + dieta;
//
/// / Test inicial
//
/// /const response = await fetch(addr + 'users/connect' + token, {
/// /  'method': 'post',
/// /  'body': JSON.stringify(body),
/// /  'headers': {
/// /    'Content-Type': 'application/json'
/// /  },
/// /});
//
//
/// / Search receta
/// /const searchRecipes = function(query,params){
/// /  const response = await fetch(addr + '/recipes/complexSearch' + token + diet, {
/// /    'method': 'get',
/// /    //'body': JSON.stringify(body),
/// /    'headers': {
/// /      'Content-Type': 'application/json'
/// /    },
/// /  });
/// /
/// /  const data = await response.json();
/// /
/// /  console.log(data);
/// /}
/// /
/// /// Get Quote
/// /const getQuote = function(query){
/// /  const response = await fetch(addr + '/food/jokes/random' + token + diet, {
/// /    'method': 'get',
/// /    'headers': {
/// /      'Content-Type': 'application/json'
/// /    },
/// /  });
/// /
/// /  const data = await response.json();
/// /
/// /  console.log(data);
/// /}
/// /
/// /module.exports = {
/// /  searchRecipes,
/// /  getQuote
/// /};
//
//
//
//
/// /const response = await fetch(addr + '/recipes/complexSearch' + token + diet + '&query=sweet', {
/// /  'method': 'get',
/// /  'headers': {
/// /    'Content-Type': 'application/json'
/// /  },
/// /});
//
//
// const response = await fetch(addr + '/food/jokes/random' + token, {
//  'method': 'get',
//  'headers': {
//    'Content-Type': 'application/json'
//  },
// });
// const data = await response.json();
// console.log(data);
