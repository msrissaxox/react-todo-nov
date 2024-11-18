import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./LogIn";
import ToDoList from "./ToDoList";


const App = () => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Example for checking login

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route
          path="/todo"
          element={isAuthenticated ? <ToDoList /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App
