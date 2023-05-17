import styles from "./Button.module.css";

const Button = (props) => {
  const { children, disabled = false } = props;
  return (
    <button className={styles.btn} {...props} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
