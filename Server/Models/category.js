const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: '*Required*'
    },
    image: {
        type: String,
        required: '*Required*'
    },
})

module.exports = mongoose.model('category', catSchema);