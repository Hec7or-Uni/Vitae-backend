const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
// const UserModel = mongoose.model('User')

const getDiscovery = function (req, res) {}
const getMenu = function (req, res) {}
const modify = function (req, res) {}
const addWeight = function (req, res) {}
const deleteUser = function (req, res) {}
const getDailyBuy = function (req, res) {}

module.exports = {
  getDiscovery,
  getMenu,
  modify,
  addWeight,
  deleteUser,
  getDailyBuy
}
