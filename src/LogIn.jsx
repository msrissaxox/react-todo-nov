import React from "react"
import ToDoList from "./ToDoList";
import { useState } from "react";

//Need to send a post request to '/login'
//Express will recognize this and trigger the 
//loginUser function

export default function LogIn() {
  const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent the default form submission
      
      // Get form data
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      try {
          const response = await fetch('http://localhost:5001/auth/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
          });
          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("authToken", data.token); // Save token
            window.location.href = "/todo"; // Redirect to ToDoList
          } else {
            console.log("Login failed");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
         

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
         
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="text" className="block text-sm/6 font-medium text-gray-900">
                User Name
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  autoComplete="username"
                  type="text" 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                id="submitBtn"
              >
                Sign in hereee
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Create an Account now!!!
            </a>
          </p>
        </div>
        
      </div>
    
    </>
  )
};