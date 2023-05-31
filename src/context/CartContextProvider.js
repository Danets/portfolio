import { useReducer } from "react";
import { CartContext } from "./CartContext";

const initialState = {
  meals: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MEAL":
      return {
        ...state,
        meals: [...state.meals, action.meal],
        totalAmount: state.totalAmount + action.meal.amount * action.meal.price
      };

    case "REMOVE_MEAL":
      return {
        ...state,
        meals: state.meals.filter((meal) => meal.id !== action.id),
      };

    default:
      return initialState;
  }
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, initialState);

  const addMealHandler = (meal) => {
    dispatchCart({
      type: "ADD_MEAL",
      meal,
    });
  };

  const removeMealHandler = (id) => {
    dispatchCart({
      type: "REMOVE_MEAL",
      id,
    });
  };

  const cartContext = {
    meals: cartState.meals,
    totalAmount: cartState.totalAmount,
    addMeal: addMealHandler,
    removeMeal: removeMealHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
