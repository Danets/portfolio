import { createContext } from "react";

export const CartContext = createContext({
  meals: [],
  totalAmount: 0,
  addMeal: (item) => {},
  removeMeal: (id) => {},
});
