import styles from "./CartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

const CartButton = (props) => {
  const cartContext = useContext(CartContext);
  const quantityMeals = cartContext.meals.reduce((acc, next) => {
    return acc + next.amount;
  }, 0)
  
  return (
    <button onClick={props.onOpenModal} className={styles.button}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      {/* <span>Cart</span> */}
      <span className={styles.badge}>{quantityMeals}</span>
    </button>
  );
};

export default CartButton;
