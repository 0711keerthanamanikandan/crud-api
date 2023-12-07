// Import the Mongoose library
const mongoose = require('mongoose');

// Connect to the MongoDB database named 'curd-api'
mongoose.connect('mongodb://localhost:27017/crud-api',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    // If the connection is successful, log a success message
    console.log("successfully connected");
}).catch((err) => {
    // If an error occurs during connection, log an error message
    console.log("something went wrong:",err);
})