import styles from "./FoodForm.module.css";
import Input from "../ui/Input";
import { useRef } from "react";

const FoodForm = (props) => {
  const amountInput = useRef();

  const addMeaHandler = (e) => {
    e.preventDefault();
    props.addMealCart(+amountInput.current.value)
  };

  return (
    <form className={styles.form} onSubmit={addMeaHandler}>
      <Input
        label="Amount"
        ref={amountInput}
        input={{
          id: props.id,
          type: "number",
          min: "1",
          max: "10",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>Add</button>
    </form>
  );
};

export default FoodForm;
