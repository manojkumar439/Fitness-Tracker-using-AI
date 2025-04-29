const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    workouts: [
        {
            exerciseName: { type: String, required: true },
            sets: { type: Number, required: true },
            reps: { type: Number, required: true },
            date: { type: Date, required: true },
            intensity: { type: String, required: true },  // Low, Medium, High
            duration: { type: Number, required: true },  // Duration in minutes
            calories: { type: Number, required: true }   // Calories burned for the workout
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
