// Import the Mongoose library
const mongoose = require('mongoose');

// Define a Mongoose schema
const itemSchema = new mongoose.Schema({
    name: String,
    description: String
});

// Create a Mongoose model 
const item = mongoose.model('item',itemSchema);

module.exports=item;