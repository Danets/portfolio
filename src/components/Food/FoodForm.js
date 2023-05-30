import styles from "./FoodForm.module.css";
import Input from "../ui/Input";

const FoodForm = (props) => {
  return (
    <form className={styles.form}>
      <Input label="Amount" input={{
          id: props.id,
          type: 'number',
          min: '1',
          max: '10',
          step: '1',
          defaultValue: '1'
      }}/>
      <button>Add</button>
    </form>
  );
};

export default FoodForm;
