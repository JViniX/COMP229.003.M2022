let URI = require('./config').ATLASDB

// Database setup
let mongoose = require('mongoose');

module.exports = function(){

    mongoose.connect(URI);
    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('===> Connected to MongoDB.');
    })

    return mongodb;
}