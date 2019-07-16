const express = require('express');
//middle ware allows to access something outside server to our server
const cors = require('cors');
//connect to mongo db
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//uri= database uri from mongo db atlas dashboard
const uri = process.env.ATLAS_URI;
//pass in uri where db stored,  
//useNewUrlParser: mongo db node js drive parse network connection strings
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});