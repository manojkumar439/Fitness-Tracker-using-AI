const fs = require('fs');
const path = require('path');

// Path to the JSON data files
const usersFilePath = path.join(__dirname, '../data/users.json');

// Read users data from JSON file
const readUsers = () => {
  try {
    const jsonData = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    // If the file doesn't exist or is empty, return an empty array
    if (error.code === 'ENOENT' || error.message.includes('Unexpected end of JSON input')) {
      return [];
    }
    throw error;
  }
};

// Write users data to JSON file
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};

// Find a user by a specific field (e.g., email or id)
const findUserBy = (field, value) => {
  const users = readUsers();
  return users.find(user => user[field] === value);
};

// Add a new user to the JSON file
const addUser = (userData) => {
  const users = readUsers();
  users.push(userData);
  writeUsers(users);
  return userData;
};

// Update an existing user in the JSON file
const updateUser = (id, updatedData) => {
  const users = readUsers();
  const index = users.findIndex(user => user.id === id);
  
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedData };
    writeUsers(users);
    return users[index];
  }
  
  return null;
};

// Add a workout to a user
const addWorkout = (userId, workoutData) => {
  const users = readUsers();
  const index = users.findIndex(user => user.id === userId);
  
  if (index !== -1) {
    if (!users[index].workouts) {
      users[index].workouts = [];
    }
    users[index].workouts.push(workoutData);
    writeUsers(users);
    return users[index];
  }
  
  return null;
};

module.exports = {
  readUsers,
  writeUsers,
  findUserBy,
  addUser,
  updateUser,
  addWorkout
};
