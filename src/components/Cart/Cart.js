import styles from "./Cart.module.css";
import Modal from "../ui/Modal";
import CartItem from "./CartItem";

import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const totalAmount = `${Math.abs(cartContext.totalAmount).toFixed(2)}$`;

  const addMealHandler = (meal) => {
    cartContext.addMeal({ ...meal, amount: 1 });
  };
  const removeMealHandler = (id) => {
    cartContext.removeMeal(id);
  };

  const cartMeals = (
    <ul className={styles["cart-items"]}>
      {cartContext.meals.map((meal) => (
        <CartItem
          addMeal={addMealHandler.bind(null, meal)}
          removeMeal={removeMealHandler.bind(null, meal.id)}
          key={meal.id}
          {...meal}
        />
      ))}
    </ul>
  );

  return (
    <Modal onCloseModal={props.onCloseModal}>
      {cartMeals}
      <div className={styles.total}>
        <span>Total:</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onCloseModal} className={styles["button--alt"]}>
          Close
        </button>
        {!!cartContext.meals.length && (
          <button className={styles.button}>Order</button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
