// Load environment variables from the .env file
require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middlewares/authMiddleware');
const { findUserBy, updateUser, addWorkout } = require('./utils/fileUtils');
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*',  // Allow all origins for development
    methods: ['GET', 'POST']
}));

// Basic test route
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Dashboard routes for authenticated users
app.get('/api/dashboard', authMiddleware, async (req, res) => {
    try {
        // Fetch user data by their ID, excluding password field
        const user = findUserBy('id', req.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Create a user object without the password
        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;
        
        res.json({ user: userWithoutPassword });  // Send the user data to the frontend
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Function to calculate calories burned by day
const calculateCaloriesByDay = (workouts) => {
    const groupedData = workouts.reduce((acc, workout) => {
        const day = new Date(workout.date).toISOString().split('T')[0]; // Format: YYYY-MM-DD
        acc[day] = (acc[day] || 0) + (workout.calories * workout.duration);
        return acc;
    }, {});

    return Object.entries(groupedData).map(([date, calories]) => ({ date, calories }));
};

// New endpoint to fetch calories burned by day for the line graph
app.get('/api/dashboard/calories-by-day', authMiddleware, async (req, res) => {
    try {
        const user = findUserBy('id', req.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const caloriesByDay = calculateCaloriesByDay(user.workouts || []);

        res.json(caloriesByDay); // Return data as an array of objects { date, calories }
    } catch (err) {
        console.error('Error fetching calories by day:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Function to calculate dashboard stats for the current day
const calculateDashboardStats = (workouts) => {
    const today = new Date().setHours(0, 0, 0, 0); // Start of today at midnight

    // Calculate total calories burned today
    const totalCalories = workouts
        .filter(workout => new Date(workout.date).setHours(0, 0, 0, 0) === today)
        .reduce((sum, workout) => sum + (workout.calories * workout.duration), 0);

    // Calculate total number of workouts today
    const totalWorkouts = workouts.filter(workout => new Date(workout.date).setHours(0, 0, 0, 0) === today).length;

    // Calculate average calories burned per workout today
    const avgCaloriesPerWorkout = totalWorkouts === 0 ? 0 : totalCalories / totalWorkouts;

    return { totalCalories, totalWorkouts, avgCaloriesPerWorkout };
};

// Endpoint to fetch dashboard statistics
app.get('/api/dashboard/stats', authMiddleware, async (req, res) => {
    try {
        const user = findUserBy('id', req.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const stats = calculateDashboardStats(user.workouts || []);

        res.json(stats); // Return statistics to the frontend
    } catch (err) {
        console.error('Error in calculating dashboard stats:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Endpoint to add workout data
app.post('/api/add-workout', authMiddleware, async (req, res) => {
    const { exerciseName, sets, reps, date, intensity, duration, calories } = req.body;

    try {
        const user = findUserBy('id', req.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new workout
        const workout = { 
            id: Date.now().toString(), // Simple ID generation
            exerciseName, 
            sets, 
            reps, 
            date, 
            intensity, 
            duration, 
            calories 
        };
        
        // Add workout to user's workouts
        addWorkout(user.id, workout);

        res.status(200).json({
            message: 'Workout added successfully'
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Diet Planner endpoint
app.post('/api/dietPlanner', async (req, res) => {
    try {
        const { age, gender, height, weight, targetWeight, goal, dietType, mealTime, question } = req.body;
        
        // In a real implementation, this would call an AI service
        // For now, we'll return a simple response based on the input
        const response = generateDietPlan(age, gender, height, weight, targetWeight, goal, dietType, mealTime, question);
        
        res.json({ response });
    } catch (error) {
        console.error('Diet planner error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Helper function to generate a simple diet plan response
function generateDietPlan(age, gender, height, weight, targetWeight, goal, dietType, mealTime, question) {
    // Basic diet plan recommendation based on inputs
    let response = `<p>Based on your profile (${age} years old, ${gender}, ${height}cm, ${weight}kg) and your goal to ${goal} to reach ${targetWeight}kg, here's a personalized ${dietType} diet plan with ${mealTime} meals per day:</p>`;
    
    // Add sample meal plan
    response += '<p><strong>Sample Daily Meal Plan:</strong></p>';
    
    const meals = [];
    const mealCount = parseInt(mealTime);
    
    if (dietType === 'Vegetarian' || dietType === 'Vegan') {
        meals.push('Oatmeal with fruits and nuts');
        meals.push('Vegetable salad with tofu');
        meals.push('Bean and vegetable soup');
        meals.push('Smoothie with plant protein');
        meals.push('Roasted vegetables with quinoa');
    } else if (dietType === 'Keto') {
        meals.push('Eggs and avocado');
        meals.push('Cheese and nuts');
        meals.push('Salmon with green vegetables');
        meals.push('Greek yogurt with berries');
        meals.push('Chicken with cauliflower rice');
    } else {
        meals.push('Eggs with whole grain toast');
        meals.push('Grilled chicken salad');
        meals.push('Fish with steamed vegetables');
        meals.push('Protein shake with fruits');
        meals.push('Lean meat with sweet potatoes');
    }
    
    for (let i = 0; i < mealCount && i < 5; i++) {
        response += `<p>Meal ${i+1}: ${meals[i]}</p>`;
    }
    
    // Add recommendations based on goals
    if (goal === 'Weight Loss') {
        response += '<p><strong>Weight Loss Tips:</strong></p>';
        response += '<p>1. Maintain a calorie deficit of 500 calories per day</p>';
        response += '<p>2. Focus on protein-rich foods for satiety</p>';
        response += '<p>3. Include plenty of fiber-rich vegetables</p>';
    } else if (goal === 'Muscle Gain') {
        response += '<p><strong>Muscle Gain Tips:</strong></p>';
        response += '<p>1. Consume 1.6-2.2g of protein per kg of body weight</p>';
        response += '<p>2. Eat in a moderate calorie surplus</p>';
        response += '<p>3. Time protein intake around workouts</p>';
    }
    
    // Address allergies if mentioned
    if (question && question.trim() !== '') {
        response += `<p><strong>Regarding your specific concern about ${question}:</strong></p>`;
        response += `<p>Avoid foods containing ${question} and replace them with suitable alternatives. Consult with a dietitian for personalized advice.</p>`;
    }
    
    return response;
}

// Exercise endpoint
app.post('/api/exercise', async (req, res) => {
    try {
        const { time, difficulty, focus, training, equipment, age, gender, height, weight } = req.body;
        
        // In a real implementation, this would call an AI service
        // For now, we'll return a simple response based on the input
        const response = generateExercisePlan(time, difficulty, focus, training, equipment, age, gender, height, weight);
        
        res.json({ response });
    } catch (error) {
        console.error('Exercise planner error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Helper function to generate a simple exercise plan response
function generateExercisePlan(time, difficulty, focus, training, equipment, age, gender, height, weight) {
    // Basic exercise recommendation based on inputs
    let response = `Based on your profile (${age} years old, ${gender}, ${height}cm, ${weight}kg) and your preferences, here's a ${difficulty} intensity ${training} workout focusing on ${focus} using ${equipment} for ${time} minutes:\n\n`;
    
    // Create exercise plan based on focus area and training type
    response += `<h3>${focus} ${training} Workout - ${difficulty} Intensity</h3>`;
    response += '<ul>';
    
    // Generate sample exercises based on body focus
    const exercises = [];
    
    if (focus === 'Full Body' || focus === 'Cardio') {
        exercises.push('Jumping Jacks: 3 sets of 1 minute');
        exercises.push('Burpees: 3 sets of 10 reps');
        exercises.push('Mountain Climbers: 3 sets of 20 reps');
        exercises.push('Squat Jumps: 3 sets of 12 reps');
        exercises.push('Push-ups: 3 sets of 10-15 reps');
    } else if (focus === 'Abs') {
        exercises.push('Crunches: 3 sets of 15 reps');
        exercises.push('Plank: 3 sets of 30-60 seconds');
        exercises.push('Russian Twists: 3 sets of 20 reps');
        exercises.push('Leg Raises: 3 sets of 12 reps');
        exercises.push('Mountain Climbers: 3 sets of 20 reps');
    } else if (focus === 'Leg') {
        exercises.push('Squats: 4 sets of 12 reps');
        exercises.push('Lunges: 3 sets of 10 reps per leg');
        exercises.push('Calf Raises: 3 sets of 15 reps');
        exercises.push('Glute Bridges: 3 sets of 12 reps');
        exercises.push('Wall Sit: 3 sets of 30-60 seconds');
    } else {
        // Generic upper body workout
        exercises.push('Push-ups: 3 sets of 10-15 reps');
        exercises.push('Dumbbell Curls: 3 sets of 12 reps');
        exercises.push('Shoulder Press: 3 sets of 10 reps');
        exercises.push('Tricep Dips: 3 sets of 12 reps');
        exercises.push('Rows: 3 sets of 12 reps');
    }
    
    // Adjust difficulty
    if (difficulty === 'Hard') {
        response += '<p>Complete the following circuit 3 times with minimal rest between exercises:</p>';
    } else if (difficulty === 'Medium') {
        response += '<p>Complete the following circuit 2 times with 30 seconds rest between exercises:</p>';
    } else {
        response += '<p>Complete the following exercises with 1-minute rest between sets:</p>';
    }
    
    // Add exercises to the response
    exercises.forEach(exercise => {
        response += `<li>${exercise}</li>`;
    });
    
    response += '</ul>';
    
    // Add cool down
    response += '<h3>Cool Down</h3>';
    response += '<p>Finish with 5 minutes of light stretching focusing on the muscle groups you worked.</p>';
    
    return response;
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

// Start the server using the port from the .env file or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handling uncaught errors
process.on('unhandledRejection', (err, promise) => {
    console.error(`Unhandled Rejection at: ${promise}`, err);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});
