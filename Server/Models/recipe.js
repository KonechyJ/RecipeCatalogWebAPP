const mongoose = require('mongoose');

const recSchema = new mongoose.Schema({
    name: {
        type: String,
        required: '*Required*'
    },
    description: {
        type: String,
        required: '*Required*'
    },
    email: {
        type: String,
        required: '*Required*'
    },
    ingredients: {
        type: Array,
        required: '*Required*'
    },
    category: {
        type: String,
        enum: ['Thai', 'American', 'Chinese', 'Mexican', 'Indian'],
        required: '*Required*'
    },
    image: {
        type: String,
        required: '*Required*'
    },
})

recSchema.index({name: "text", description: "text" });

//wildcard indexing
//recSchema.index({"$**": "text"});


module.exports = mongoose.model('recipe', recSchema);