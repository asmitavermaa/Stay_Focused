import React, { useState } from 'react';
import { XIcon } from '@heroicons/react/solid'; 

const ToDoList = () => {
  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  
  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  
  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-purple-900 text-white p-8 flex flex-col items-center h-screen font-sans">
      <h1 className="text-4xl font-bold mb-8">To-Do List</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-gray-800 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-purple-500 w-96"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-gray-700 hover:bg-white text-white hover:text-purple-700 border-2 hover:border-2 hover:border-purple-700 font-bold py-2 px-4 rounded-lg ml-4 focus:outline-none focus:ring focus:border-purple-500"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <div>
        {tasks.map(task => (
          <div key={task.id} className="flex items-center mb-4">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-purple-500 rounded-full"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <p className={`ml-2 ${task.completed ? 'line-through' : ''} text-lg flex-grow`}>{task.text}</p>
            <button
              className="text-red-500 hover:text-red-500 hover:font-semibold focus:outline-none ml-4"
              onClick={() => removeTask(task.id)}
            >
              <XIcon className="h-5 w-5" /> 
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
