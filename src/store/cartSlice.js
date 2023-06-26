import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  meals: [],
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addMeal: (state, action) => {
      const currMeal = state.meals.find(
        (meal) => meal.id === action.payload.id
      );
      state.totalAmount =
        state.totalAmount + action.payload.amount * action.payload.price;
      if (!currMeal) {
        state.meals.push(action.payload);
      } else {
        currMeal.amount = currMeal.amount + action.payload.amount;
      }
    },
    removeMeal: (state, action) => {
      const currMeal = state.meals.find((meal) => meal.id === action.payload);
      state.totalAmount = state.totalAmount - currMeal.price;
      if (currMeal?.amount === 1) {
        state.meals = state.meals.filter((meal) => meal.id !== action.payload);
      } else {
        currMeal.amount--;
      }
    },
  },
});

export const { addMeal, removeMeal } = cartSlice.actions;

export default cartSlice.reducer;
