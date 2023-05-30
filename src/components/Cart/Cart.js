import styles from "./Cart.module.css";
import Modal from "../ui/Modal";

const Cart = (props) => {
  const cartMeals = (
    <ul className={styles["cart-items"]}>
      {[{ id: 1, name: "Sushi", amount: 3, price: 5.0 }].map((meal) => (
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
  return (
    <Modal>
      {cartMeals}
      <div className={styles.total}>
        <span>Total</span>
        <span>20.00</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]}>Close</button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
