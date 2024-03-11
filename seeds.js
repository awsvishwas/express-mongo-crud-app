const Player = require('./models/players')

const mongoose = require('mongoose')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/express');
  console.log('Connection Established')

}


Player.insertMany([
    {
        name: 'Virat Kohli',
        age: 34,
        category: 'bat'
    },
    {
        name: 'Jasprit Bumrah',
        age: 29,
        category: 'bowl'
    }
])