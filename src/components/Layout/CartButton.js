import styles from "./CartButton.module.css";
import CartIcon from "../Cart/CartIcon";

const CartButton = (props) => {
  return (
    <button onClick={props.onOpenModal} className={styles.button}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={styles.badge}>30.00</span>
    </button>
  );
};

export default CartButton;
