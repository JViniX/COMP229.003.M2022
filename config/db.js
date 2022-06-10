// Do not expose your credentials in your code.
let atlasDB = "mongodb+srv://appuser:8EamaDsar3cX0y2F@cluster003m2022.iv8xg.mongodb.net/inventory?retryWrites=true&w=majority";

// Database setup
let mongoose = require('mongoose');

module.exports = function(){

    mongoose.connect(atlasDB);
    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('===> Connected to MongoDB.');
    })

    return mongodb;
}