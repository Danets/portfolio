import { useState } from "react";

import TaskForm from "../../components/tasks/TaskForm";
import TaskList from "../../components/tasks/TaskList";

const TaskPage = () => {
  const [tasks, setTask] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setTask([...tasks, value]);
    setValue("");
  };

  const handleChangeInput = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <TaskForm
        value={value}
        handleSubmit={handleSubmit}
        handleChangeInput={handleChangeInput}
      />
      {tasks.length ? <TaskList tasks={tasks} /> : <h3>No Tasks</h3>}
    </>
  );
};

export default TaskPage;
