const mongoose = require('mongoose');

const connectDB = () => {
    const connectString = 'mongodb+srv://alexmichael63:2I0sPRydSQE0F4eV@cluster0.jgcfvj5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    mongoose.connect(connectString);

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to MongoDB Atlas');
    });

    mongoose.connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected');
    });
};
require('./users');
module.exports = connectDB;