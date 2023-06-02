import { useReducer } from "react";
import { CartContext } from "./CartContext";

const initialState = {
  meals: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MEAL":
      const currIdxMeal = state.meals.findIndex(
        (meal) => meal.id === action.meal.id
      );
      const currMeal = state.meals[currIdxMeal];
      let updatedMeal;
      let updatedMeals;

      if (currMeal) {
        updatedMeal = {
          ...currMeal,
          amount: currMeal.amount + action.meal.amount,
        };
        updatedMeals = [...state.meals];
        updatedMeals[currIdxMeal] = updatedMeal;
      } else {
        updatedMeals = [...state.meals, action.meal];
      }
      return {
        meals: updatedMeals,
        totalAmount: state.totalAmount + action.meal.amount * action.meal.price,
      };

    case "REMOVE_MEAL":
      const idxMeal = state.meals.findIndex(
        (meal) => meal.id === action.id
      );
      const meal = state.meals[idxMeal];
      let updateMeal;
      let updateMeals;
      if (meal.amount === 1) {
        updateMeals = state.meals.filter((meal) => meal.id !== action.id);
      } else {
        updateMeal = {
          ...meal,
          amount: meal.amount - 1,
        };
        updateMeals = [...state.meals];
        updateMeals[idxMeal] = updateMeal;
      }

      return {
        meals: updateMeals,
        totalAmount: state.totalAmount - meal.price
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
