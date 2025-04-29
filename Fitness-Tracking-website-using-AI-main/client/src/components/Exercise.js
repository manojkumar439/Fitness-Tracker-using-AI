import React, { useState } from 'react';
import '../styles/Exercise.css';

const Exercise = () => {
  const [time, setTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [focus, setfocus] = useState('');
  const [training, setType] = useState('');
  const [equipment, setEquipment] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/exercise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ time, difficulty, focus, training, equipment, age, gender, height, weight }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(formatResponse(data.response)); // Apply the formatting function
    } catch (error) {
      console.error('Error:', error);
      setResponse('There was an error processing your request. Please make sure the backend server is running.');
    }
  };

  const formatResponse = (response) => {
    return `<h2>AI Response:</h2><p>${response}</p>`;
  };

  const handlePositiveChange = (setter) => (e) => {
    const value = e.target.value;
    if (value === '' || /^[+]?\d+(\.\d+)?$/.test(value)) {
      setter(value);
    }
  };


  return (
    <div className="ExercisePlanner-container">
        <div className="image-section">
        <div className="overlay-text">𝙁𝙞𝙣𝙙 𝙔𝙤𝙪𝙧 𝙋𝙚𝙧𝙛𝙚𝙘𝙩 <br/>𝙀𝙭𝙚𝙧𝙘𝙞𝙨𝙚 𝙍𝙤𝙪𝙩𝙞𝙣𝙚</div>
    </div>
      {/* Input section */}
      <div className="inputs-container">
        <form onSubmit={handleSubmit}>
          
          <input
          className="input-box"
            type="number"
            value={time}
            onChange={handlePositiveChange(setTime)}
            placeholder="Enter Time in min"
            required
            min="0"
          />

                  <input
                    className="input-box"
                    type="number"
                    value={age}
                    onChange={handlePositiveChange(setAge)}
                    placeholder="Enter Age"
                    required
                    min="14"
                  />

                  <select
                    className="dropdown"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    className="input-box"
                    type="number"
                    value={height}
                    onChange={handlePositiveChange(setHeight)}
                    placeholder="Enter Height in cm"
                    required
                  />
                  
                  <input
                    className="input-box"
                    type="number"
                    value={weight}
                    onChange={handlePositiveChange(setWeight)}
                    placeholder="Enter Weight in kg"
                    required
                  />



                  <select
                    className="dropdown"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    required
                  >
                    <option value="">Difficulty Level</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>


          <select className="dropdown" value={focus} onChange={(e) => setfocus(e.target.value)} required>
            <option value="">Body Focus</option>
            <option value="Neck">Neck</option>
            <option value="Trapezius">Trapezius</option>
            <option value="Shoulder">Shoulder</option>
            <option value="Back">Back</option>
            <option value="Erector Spinae">Erector Spinae</option>
            <option value="Biceps">Biceps</option>
            <option value="Triceps">Triceps</option>
            <option value="Forearm">Forearm</option>
            <option value="Abs">Abs</option>
            <option value="Leg">Leg</option>
            <option value="Calf">Calf</option>
            <option value="Hips">Hips</option>
            <option value="Cardio">Cardio</option>
            <option value="Full Body">Full Body</option>
          </select>

          <select className="dropdown" value={training} onChange={(e) => setType(e.target.value)} required>
            <option value="">Training Type</option>
            <option value="Balance">Balance</option>
            <option value="Barre">Barre</option>
            <option value="Cardiovascular">Cardiovascular</option>
            <option value="HIIT">HIIT</option>
            <option value="Kettlebell">Kettlebell</option>
            <option value="Kickboxing">Kickboxing</option>
            <option value="Low Impact">Low Impact</option>
            <option value="Mobility">Mobility</option>
            <option value="Pilates">Pilates</option>
            <option value="Plyometric">Plyometric</option>
            <option value="Pre & Posrnatal">Pre & Posrnatal</option>
            <option value="Strength Training">Strength Training</option>
            <option value="Stretching">Stretching</option>
            <option value="Toning">Toning</option>
            <option value="Warm Up/Cool Down">Warm Up/Cool Down</option>
            <option value="Yoga">Yoga</option>
          </select>

          <select className="dropdown" value={equipment} onChange={(e) => setEquipment(e.target.value)} required>
            <option value="">Equipment</option>
            <option value="Barbell">Barbell</option>
            <option value="Bench">Bench</option>
            <option value="Dumbell">Dumbell</option>
            <option value="Exercise Band">Exercise Band</option>
            <option value="Foam Roller">Foam Roller</option>
            <option value="Jump Rope">Jump Rope</option>
            <option value="Kettlebell">Kettlebell</option>
            <option value="Mat">Mat</option>
            <option value="Medicine Ball">Medicine Ball</option>
            <option value="Physio-Ball">Physio-Ball</option>
            <option value="SandBeg">SandBeg</option>
            <option value="Slosh Tube">Slosh Tube</option>
            <option value="Stationary Bike">Stationary Bike</option>
            <option value="Yoga Block">Yoga Block</option>
          </select>
<button className="submit-button">Submit</button>
        
        </form>
      </div>
<div className='ready'>
  <h1>𝙔𝙤𝙪'𝙧𝙚 𝙧𝙚𝙖𝙙𝙮! 𝙇𝙚𝙩'𝙨 𝙘𝙧𝙪𝙨𝙝 𝙩𝙝𝙞𝙨 𝙬𝙤𝙧𝙠𝙤𝙪𝙩!</h1>
</div>
      {/* Response section */}
      <div className="exercise-response">
        <div id="responseBox" className='box' dangerouslySetInnerHTML={{ __html: response }}></div>
       </div>
    </div>
  );
};

export default Exercise;