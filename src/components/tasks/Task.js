import { FaCheck, FaTrash } from "react-icons/fa";

import styles from "./Task.module.css";
const Task = ({ task, onRemove, toggleCompete }) => {
  return (
    <div className={styles.task}>
      <div className={styles.text}>
        {task.title}
        <div className={styles.icons}>
        <FaTrash className={styles.deleteIcon} onClick={() => onRemove(task.id)}/>
        <FaCheck className={styles.checkIcon} onClick={() => toggleCompete(task.id)}/>
        </div>
      </div>
    </div>
  );
};

export default Task;
