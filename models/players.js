const mongoose = require('mongoose')


const playerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['bat', 'bowl', 'all-rounder']
    }
})

const Player = mongoose.model('Player', playerSchema)

module.exports = Player