// Import required modules
const express = require('express');
const mongoose = require('./db/mongoose');
const itemModel = require('./models/item');
const { ObjectId } = require('mongoose').Types;

// Create an Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define a POST route to create a new item
app.post('/item',async(req,res) =>{
    try{
        const {name,description} = req.body;
        // Create a new item using the itemModel
        const newItem = new itemModel({
            name,
            description
        });
        // Save the new item to the database
        await newItem.save();
        res.status(201).json({
            msg: "Success",
            data: newItem
        });
    }catch(err){
        res.status(500).json({
            msg: err.toString(),
            data: Null
        });
    }
})

// Define a GET route to fetch all items
app.get('/items',async(req,res) => {
    try{
        // Fetch all items from the database using itemModel
        const items = await itemModel.find();
        res.status(201).json({
            msg: "Success",
            data: items
        });
    }catch(err){
        res.status(500).json({
            msg: err.toString(),
            data: null
        });
    }
})

// Define a PUT route to update an item by its _id
app.put('/items/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description } = req.body;

        // Validate ObjectId format
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "Invalid ObjectId format",
                data: null
            });
        }

        // Convert string id to ObjectId
        const objectId = new ObjectId(id);

        // Find and update the item based on its _id
        const updatedItem = await itemModel.findOneAndUpdate(
            { _id: objectId },
            { $set: { name, description } },
            { new: true } // Return the updated document
        );

        // Check if the item was found and updated
        if (!updatedItem) {
            return res.status(404).json({
                msg: "Item not found",
                data: null
            });
        }

        res.status(200).json({
            msg: "Success",
            data: updatedItem
        });
    } catch (err) {
        res.status(500).json({
            msg: err.toString(),
            data: null
        });
    }
});


// Define a DELETE route to delete an item by its _id
app.delete('/items/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Validate ObjectId format
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "Invalid ObjectId format",
                data: null
            });
        }

        // Convert string id to ObjectId
        const objectId = new ObjectId(id);

        // Find and delete the item based on its _id
        const deletedItem = await itemModel.findByIdAndDelete(
            { _id: objectId },
            { new: true } // Return the updated document
        );

        // Check if the item was found and updated
        if (!deletedItem) {
            return res.status(404).json({
                msg: "Item not found",
                data: null
            });
        }

        res.status(200).json({
            msg: "Success",
            data: deletedItem
        });
    } catch (err) {
        res.status(500).json({
            msg: err.toString(),
            data: null
        });
    }
});

//start the server
app.listen(8080,() =>{
    console.log("successfully running on port 8080!")
})