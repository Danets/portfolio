import styles from "./Cart.module.css";
import Modal from "../ui/Modal";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

const Cart = (props) => {
  const cartContext = useContext(CartContext);

  const cartMeals = (
    <ul className={styles["cart-items"]}>
      {cartContext.meals.map((meal) => (
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal onCloseModal={props.onCloseModal}>
      {cartMeals}
      <div className={styles.total}>
        <span>Total:</span>
        <span>{cartContext.totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onCloseModal} className={styles["button--alt"]}>Close</button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
