const express = require('express')
const app = express()
const path = require('path')

const mongoose = require('mongoose');

const Player = require('./models/players')

const methodOverride = require('method-override')

let categories = ['bat','bowl','all-rounder']


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/express');
  console.log('Connection Established')

}

app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.listen(3000, ()=>{
    console.log('Application Runnin on Port 3000')
})

app.get('/players', async (req, res)=>{
    const {category} = req.query
    if (category){
    const players = await Player.find({category})
    res.render('players/index', {players, category})

    }else{
    const players = await Player.find({})
    res.render('players/index', {players, category: 'All'})

    }
    
})

app.get('/players/new', (req, res)=>{
    res.render('players/new')
})

app.post('/players', async(req, res)=>{
    const newPlayer = new Player(req.body)
    await newPlayer.save()
    res.redirect(`players/${newPlayer._id}`)
})

app.get('/players/:id', async (req, res)=>{
    const {id} = req.params
    const player = await Player.findById(id)
    res.render('players/show', {player})
})

app.get('/players/:id/edit', async (req, res)=>{
    const {id} = req.params
    const player = await Player.findById(id)
    res.render('players/edit', {player, categories})
})

app.put('/players/:id', async (req, res)=>{
    const {id} = req.params
    const player = await Player.findByIdAndUpdate(id, req.body,{new:true, runValidators:true})
    res.redirect(`/players/${player._id}`)
})

app.delete('/players/:id', async (req, res)=>{
    const {id} = req.params
    const player = await Player.findByIdAndDelete(id)
    res.redirect(`/players`)
})


