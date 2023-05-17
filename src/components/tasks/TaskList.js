import Task from "../../components/tasks/Task";

const TaskList = ({ tasks }) => {
  return (
    <>
      {tasks.map((task, idx) => (
        <Task key={idx} task={task} />
      ))}
    </>
  );
};

export default TaskList;
