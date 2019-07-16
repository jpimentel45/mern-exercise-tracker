    //require router from express
    const router = require('express').Router();
    //require mongose model we created
    let User = require('../models/user.model');

    //  / + get request
    router.route('/').get((req, res) => {
        //mongose method: get list of users for mongodb atlast database
        //find method returns promise
        User.find()
        //after find then get as users => json format
            .then(users => res.json(users))
            .catch(err => res.status(400).json('Error: ' + err));
    });

    //http post request 
    router.route('/add').post((req, res) => {
       //new username part of request body 
        const username = req.body.username;
//create new instance of user 
        const newUser = new User({
            username
        });
//new user saved to db 
        newUser.save()
        //after save to mongobd atlas, then return user added in json 
            .then(() => res.json('User added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    });

    module.exports = router;