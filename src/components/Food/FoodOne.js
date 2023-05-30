import styles from "./FoodOne.module.css";
import FoodForm from "./FoodForm";

const FoodOne = (props) => {
  const formatedPrice = `$${props.price.toFixed(2)}`;

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{formatedPrice}</div>
      </div>
      <div>
        <FoodForm id={props.id} />
      </div>
    </li>
  );
};

export default FoodOne;
