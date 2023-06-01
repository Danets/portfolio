import styles from "./FoodOne.module.css";
import FoodForm from "./FoodForm";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

const FoodOne = (props) => {
  const formatedPrice = `$${props.price.toFixed(2)}`;
  const cartContext = useContext(CartContext);

  const addMealCart = (amountInput) => {
    const meal = {
      id: props.id,
      name: props.name,
      price: props.price,
      description: props.description,
      amount: amountInput
    };
    cartContext.addMeal(meal);
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{formatedPrice}</div>
      </div>
      <div>
        <FoodForm addMealCart={addMealCart}  id={props.id} />
      </div>
    </li>
  );
};

export default FoodOne;
