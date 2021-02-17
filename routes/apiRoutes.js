const Workout = require('../models/workout');
const router = require('express').Router();

//Submit workouts to db
router.post("/api/workouts", ( req, res) => {
    Workout.create({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});
// Find exercise by id
router.put("/api/workouts/:id", ({ body, params }, res) => {
    console.log(body)
    Workout.findByIdAndUpdate(params.id,
        { $push: { exercises: body } }, { new: true, runValidators:true })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    Workout.find()
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find()
       
        .limit(10)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});
//Delete an exercise
router.delete("/api/workouts", ({ body }, res) => {
    Workout.findByIdAndRemove(body.id)
        .then(() => {
            res.json(true);
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;