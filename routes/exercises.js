const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/searchexercises').get((req, res) => {
    const { goal, fitnessLevel} = req.query;

    const filter = {};

    if (goal) {
      filter.goal = goal;
    }
    if (fitnessLevel) {
      filter.fitnessLevel = fitnessLevel;
    }
  
  
  
    async function fetchExercises() {
        try {
          const exercises = await Exercise.find(filter).exec();
          res.json(exercises);
        } catch (error) {
          console.error('Error fetching exercises:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    
      fetchExercises();


});

router.route('/add').post((req, res) => {
  
  const exerciseName = req.body.exerciseName;
  const description = req.body.description;
  const duration = req.body.duration;
  const goal = req.body.goal;
  const fitnessLevel = req.body.fitnessLevel;

  const newExercise = new Exercise({
    exerciseName,
    description,
    duration,
    goal,
    fitnessLevel,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/:id').get((req, res) => {
//     Flight.findById(req.params.id)
//     .then(flight => res.json(flight))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').delete((req, res) => {
//     Flight.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Flight deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) => {
//     Flight.findById(req.params.id)
//     .then(exercise => {
//       exercise.username = req.body.username;
//       exercise.description = req.body.description;
//       exercise.duration = Number(req.body.duration);
//       exercise.date = Date.parse(req.body.date);

//       exercise.save()
//         .then(() => res.json('Flight updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;