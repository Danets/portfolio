import styles from "./FoodOne.module.css";

const FoodOne = (props) => {
  const formatedPrice = `$${props.price.toFixed(2)}`;

  return (
    <li className={styles.meal}>
      <h3>{props.name}</h3>
      <div className={styles.description}>{props.description}</div>
      <div className={styles.price}>{formatedPrice}</div>
    </li>
  );
};

export default FoodOne;
