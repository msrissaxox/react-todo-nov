
import React, { useState} from "react";

export default function ToDoList() {
  //state for managing tasks

  //tasks holds the current list of tasks, setTasks is the function to update the task state
  const [tasks, setTasks] = useState([]); // Initialize as an empty array
  //inputValue stores the current value of the input field, setInputValue is the state updater function
  const [inputValue, setInputValue] = useState(""); // State for input field

  //handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update the input field state
  };

//adds tasks here
  const addTask = () => {
    if (inputValue.trim() !== "") {
      setTasks([...tasks, { text: inputValue, completed: false }]); // Add task as an object with a 'completed' property
      setInputValue(""); // Clear the input field
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask(); // Add task on pressing Enter
    }
  };

  // Toggle task completion
  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks); // Update tasks with toggled completion
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
    <div
      className="mx-auto py-8 px-4 bg-indigo-950 rounded-lg shadow-lg w-96 text-zinc-200 flex flex-col justify-center"
      id="myList"
    >
      <div className="flex items-center justify-center mb-6">
        <svg
          className="h-8 w-8 text-indigo-500 stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h4 className="font-didact ml-3 text-xl text-neutral-50">To Do List</h4>
      </div>


      
      {/* Input for adding tasks */}
      <div className="flex items-center mb-4 font-didact">
        <input
          className="flex-grow h-10 px-3 rounded bg-gray-800 focus:outline-none"
          type="text"
          value={inputValue} // Controlled input
          onChange={handleInputChange} // Handle input changes
          onKeyDown={handleKeyPress} // Add task on Enter key press
          placeholder="Add a new task"
        />
        <button
          className="ml-2 px-4 py-2 bg-indigo-400 text-white rounded hover:bg-indigo-800"
          onClick={addTask} // Add task on button click
        >
          +
        </button>
      </div>

      {/* Dynamic list of tasks */}
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex items-center justify-between px-3 py-2 mb-2 rounded ${
              task.completed ? "bg-gray-700 text-gray-400 line-through" : "bg-gray-800 text-white"
            }`}
          >
            <span>{task.text}</span>
            <button
              className="text-sm text-indigo-400 hover:text-indigo-300"
              onClick={() => toggleTask(index)} // Toggle task completion
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}
