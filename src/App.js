import Header from "./Components/Header";
import Footer from "./Components/Footer";
import React from "react";
import About from "./Components/About";
import "./index.css";
import Tasks from "./Components/Tasks";
import { useState } from "react";
import AddTask from "./Components/AddTask";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./actions";
export default function App() {
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();
  const [tasks, setTask] = useState([
    {
      id: 1,
      text: "Doctor Appointment",
      day: "feb 5th at 2:30pm",
      reminder: true
    },
    {
      id: 2,
      text: "Meeting at School",
      day: "feb 6th at 1:30pm",
      reminder: true
    },
    {
      id: 3,
      text: "Food shopping",
      day: "feb 5th at 2:30pm",
      reminder: false
    }
  ]);

  const [showAddTask, setShowAddTask] = useState(true);
  //delete task
  const deleteTask = (id) => {
    // console.log("delete", id)
    setTask(tasks.filter((task) => task.id !== id));
  };

  //onToggle change reminder
  const toggleReminder = (id) => {
    setTask(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTask([...tasks, newTask]);
  };
  const dolLogin = () => {
    dispatch(login());
  };
  return (
    <Router>
      {isLogged ? (
        <div className="container">
          <Logout
            color="red"
            text="Logout"
            onClick={() => dispatch(logout())}
          />

          <Header
            onAdd={() => setShowAddTask(!showAddTask)}
            showAddTask={showAddTask}
          />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  {showAddTask && <AddTask onAdd={addTask} />}

                  {tasks.length > 0 ? (
                    <Tasks
                      tasks={tasks}
                      onDelete={deleteTask}
                      onToggle={toggleReminder}
                    />
                  ) : (
                    "No  Task to Show"
                  )}
                </>
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </div>
      ) : (
        <>
          <div className="container">
            <Login onLogin={dolLogin} />
          </div>
        </>
      )}
    </Router>
  );
}
