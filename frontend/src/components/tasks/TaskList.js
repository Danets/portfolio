import Task from "../../components/tasks/Task";

const TaskList = ({ tasks, onRemove, toggleCompete }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onRemove={onRemove}
          toggleCompete={toggleCompete}
        />
      ))}
    </>
  );
};

export default TaskList;
