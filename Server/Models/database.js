const mongoose = require('mongoose');

mongoose.connect(process.env.MDB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const DB = mongoose.connection;

DB.on('error', console.error.bind(console, 'An error has occurred: '));
DB.once('open', function() {
    console.log('A connection has been established');
})

// Import the models
require('./category');
require('./recipe');