import styles from "./Task.module.css";
const Task = ({ task }) => {
  return (
    <div className={styles.task}>
      <div className={styles.text}>{task}</div>
    </div>
  );
};

export default Task;
