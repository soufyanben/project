const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//initialise express app
const app = express();

// DB Config 
mongoose.Promise = global.Promise;
//mongodb connection url
const dbUrl = "mongodb://localhost:27017/hashAppDb"; 

//connect to MongoDB
mongoose
    .connect(dbUrl, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected ...'))    
    .catch(err => console.log(err));

//use routes
const users = require('./routes/index')
app.use('/', users)

//using bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server running at port: " + port); 
})
