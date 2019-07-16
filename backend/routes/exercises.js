const router = require('express').Router();
//require exercise.model
let Exercise = require('../models/exercise.model');

// rooturl/exercises/ (get request)
router.route('/').get((req, res) => {
    //find exercises
    Exercise.find()
    //promise: return exercises in json format
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});
// exercises/add/ post request
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    //conv to num
    const duration = Number(req.body.duration);
    //parse date
    const date = Date.parse(req.body.date);

    //create new exercise from variables above
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//id created by mongobd
router.route('/:id').get((req, res) => {
    //get from url
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    //delete, return Ecercise deleted
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//find current exercise and update 
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;