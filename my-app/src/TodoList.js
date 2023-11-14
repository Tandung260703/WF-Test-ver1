import { useEffect, useState } from "react";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";

const TodoList = ({ tasks, toggleTaskStatus }) => {
  const [showNotFinishedOnly, setShowNotFinishedOnly] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const withDoneParam = urlParams.get("withDone");
    setShowNotFinishedOnly(withDoneParam === "1");
  }, []);

  const filteredTasks = showNotFinishedOnly
    ? tasks.filter((task) => !task.done)
    : tasks;
  return (
    <div className="todo-list-container">
      {filteredTasks.map((task, index) => (
        <div
          key={index}
          className={`todo-item-container ${task.done ? "done" : ""}`}
        >
          {task.done ? (
            <FaRegCheckCircle
              color="#9a9a9a"
              className="item-done-button"
              onClick={() => toggleTaskStatus(index)}
            />
          ) : (
            <FaRegCircle
              color="#9a9a9a"
              className="item-done-button"
              onClick={() => toggleTaskStatus(index)}
            />
          )}
          <div className="item-title">
            {task.title}{" "}
            {task.dueDate &&
              ` - Due in ${calculateDaysUntilDue(task.dueDate)} days`}
          </div>
        </div>
      ))}
    </div>
  );
};

const calculateDaysUntilDue = (dueDate) => {
  const today = new Date();
  const dueDateObj = new Date(dueDate);
  const timeDiff = dueDateObj.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
};

export default TodoList;
