const express = require('express');
const mongoose = require('mongoose')
const Gym = require('../models/gym')
const cities = require('./cities')

require('dotenv').config()

let dbConnectionString = process.env.ConnectionString

mongoose.connect(dbConnectionString, {
    useUnifiedTopology: true
})


const db = mongoose.connection; 
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", ()=>{
    console.log("Database connected")
})

const seedDB = async () => {
    await Gym.deleteMany({});   
    for (let i = 0; i < 50; i++){
    const random1000 = Math.floor(Math.random()* 1000);
    const gym = new Gym({
        location: `${cities[random1000].city}, ${cities[random1000].city}`
    })
    await gym.save();
}
}
seedDB();