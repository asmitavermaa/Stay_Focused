import React, { useState, useEffect } from 'react';
import achievementBellSound from '../resources/achievement-bell.mp3'; 

const Pomodoro = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerSound = new Audio(achievementBellSound);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isRunning) {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timer);
            timerSound.play();
            return;
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, minutes, seconds]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(workDuration);
    setSeconds(0);
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-purple-900 text-white p-8 flex flex-col items-center min-h-screen font-sans">
      <h1 className="text-5xl font-bold mt-12 mb-12">Pomodoro Timer</h1>
      <audio src={achievementBellSound} id="timer-sound" />
      <div className="flex items-center mb-8">
        <label htmlFor="work-duration" className="text-white font-semibold text-lg mr-4">
          Work Duration (minutes):
        </label>
        <input
          type="number"
          id="work-duration"
          value={workDuration}
          min="1"
          className="bg-gray-800 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-purple-500 w-20 h-10"
          onChange={(e) => setWorkDuration(parseInt(e.target.value))}
        />
        <label htmlFor="break-duration" className="text-white font-semibold text-lg mx-4">
          Break Duration (minutes):
        </label>
        <input
          type="number"
          id="break-duration"
          value={breakDuration}
          min="1"
          className="bg-gray-800 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-purple-500 w-20 h-10"
          onChange={(e) => setBreakDuration(parseInt(e.target.value))}
        />
      </div>
      <div className="timer text-8xl mb-4">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
      <div className="mt-6 controls">
        <button
          className="bg-blue-500 hover:bg-white text-white hover:text-blue-500 border-2 hover:border-blue-500 font-bold py-3 px-6 rounded-lg mr-4 focus:outline-none focus:ring focus:border-purple-500"
          onClick={startTimer}
        >
          Start
        </button>
        <button
          className="bg-red-500 hover:bg-white text-white hover:text-red-500 border-2 hover:border-red-500 font-bold py-3 px-6 rounded-lg mr-4 focus:outline-none focus:ring focus:border-purple-500"
          onClick={stopTimer}
        >
          Stop
        </button>
        <button
          className="bg-yellow-500 hover:bg-white text-white hover:text-yellow-500 border-2 hover:border-yellow-500 font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring focus:border-purple-500"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
