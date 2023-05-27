const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    exerciseName: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    goal: { type: String, required: true },
    fitnessLevel: { type: String, required: true },

}, {
  timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;