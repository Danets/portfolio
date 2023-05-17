import { v4 as uuid } from "uuid";
import { useState } from "react";

import TaskForm from "../../components/tasks/TaskForm";
import TaskList from "../../components/tasks/TaskList";
import Button from "../../components/ui/Button";
import styles from "./TaskPage.module.css";

const TaskPage = () => {
  const [tasks, setTask] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const task = {
      id: uuid(),
      title: value,
      isCompleted: false,
    };
    setTask([...tasks, task]);
    setValue("");
  };

  const handleChangeInput = (event) => {
    setValue(event.target.value);
  };

  const handleRemove = (id) => {
    setTask(tasks.filter((task) => task.id !== id));
  };

  const handleToggleCompete = (id) => {
    setTask(
      tasks.map((task) =>
        task.id === id
          ? { ...task, isCompleted: !task.isCompleted }
          : { ...task }
      )
    );
  };

  const amountCompletedTasks = tasks.filter((task) => task.isCompleted).length;

  return (
    <>
      <TaskForm
        value={value}
        submit={handleSubmit}
        changeInput={handleChangeInput}
      />
       {!!tasks.length && (
        <div className={styles.actions}>
          <Button title="reset" onClick={() => setTask([])}>
            Reset
          </Button>
          <Button
            title="remove"
            onClick={() => setTask(tasks.filter((task) => !task.isCompleted))}
          >
            Remove Completed
          </Button>
        </div>
      )}
      {tasks.length ? (
        <TaskList
          tasks={tasks}
          onRemove={handleRemove}
          toggleCompete={handleToggleCompete}
        />
      ) : (
        <h3>No Tasks</h3>
      )}
      {!!amountCompletedTasks && (
        <h5>{`Amount ${amountCompletedTasks} tasks`}</h5>
      )}
    </>
  );
};

export default TaskPage;
