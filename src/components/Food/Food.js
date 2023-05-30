// import styles from "./Food.module.css";
import FoodList from "./FoodList";
import PromoFoodText from "./PromoFoodText";
import Cart from "../Cart/Cart";

const Food = (props) => {
  return (
    <>
    <Cart />
      <PromoFoodText />
      <FoodList />
    </>
  );
};

export default Food;
