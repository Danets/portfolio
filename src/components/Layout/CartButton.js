import styles from "./CartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { CartContext } from "../../context/CartContext";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";


const CartButton = (props) => {
  const cartContext = useContext(CartContext);
  const cart = useSelector(state => state.cart);
  const [isCartChanged, setCartChanged] = useState(false);

  const animatedBadge = `${styles.button} ${isCartChanged ? styles.bump : ''}`

  const quantityMeals = cart.meals.reduce((acc, next) => {
    return acc + next.amount;
  }, 0);

  useEffect(() => {
    setCartChanged(true);

    const timerId = setTimeout(() => {
      setCartChanged(false);
    }, 300);

    return () => clearTimeout(timerId);
  }, [quantityMeals]);

  return (
    <button onClick={props.onOpenModal} className={animatedBadge}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={styles.badge}>{quantityMeals}</span>
    </button>
  );
};

export default CartButton;
