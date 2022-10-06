const express = require('express');
const mongoose = require('mongoose');
const orderModel = require('./orderModel');
const moment = require('moment')

const PORT = 3334

const app = express()


app.use(express.json());


app.get('/', (req, res) => {
    return res.json({status: true})
})


app.post('/order', async (req, res) => {
    const body = req.body;

    const order = await orderModel.create({
        items: body,
        created_at: moment().format('yyy-mm-dd:hh:mm'),

    })
})


mongoose.connect('mongodb://localhost:27017')
// .then(() => {
//     console.log('Connected to the db successfully')
// }).catch((err) => {
//     console.log('error connecting to db', err)
// })

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongodb successfully')
})

mongoose.connection.on('error', (err) => {
    console.log('An error occurred while connecting to Mongodb');
    console.log(err);
})


app.listen (PORT, () => {
    console.log('Listening on port,', PORT)
})