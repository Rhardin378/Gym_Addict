const express = require('express');
const app = express()
const PORT = 9000
const path = require('path');
const mongoose = require('mongoose')
const Gym = require('./models/gym')

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
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req,res)=>{
    res.render('home')
})
app.get('/makeGym', async (req,res)=>{
    const gym = new Gym({title: 'Victory Fit', description: 'family-friendly gym!'})
    await gym.save();
    res.send(gym)
})
app.listen(PORT, ()=>{
    console.log(`serving on port ${PORT}}`)
})