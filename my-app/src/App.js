import "./styles.css";
import TodoList from "./TodoList";
import TodoListHeader from "./TodoListHeader";
import Form from "./Form";
import Footer from "./Footer";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask, dueDate) => {
    const updatedTasks = [...tasks, { title: newTask, done: false, dueDate }];
    setTasks(updatedTasks);
  };

  const toggleTaskStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              tasks={tasks}
              setTasks={setTasks}
              addTask={addTask}
              toggleTaskStatus={toggleTaskStatus}
            />
          }
        />
      </Routes>
    </div>
  );
}

const Home = ({ tasks, addTask, setTasks, toggleTaskStatus }) => {
  return (
    <div className="App">
      <div className="container">
        <TodoListHeader tasks={tasks} setTasks={setTasks} />
        <TodoList tasks={tasks} toggleTaskStatus={toggleTaskStatus} />
        <Form addTask={addTask} />
      </div>
      <Footer />
    </div>
  );
};
