const express = require('express');
const mongoose = require('mongoose')
const Gym = require('../models/gym')

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
    const c = new Gym({title: 'iron mayhem'})
    await c.save()
}

seedDB()