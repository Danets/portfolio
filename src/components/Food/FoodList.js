import styles from "./FoodList.module.css";
import Card from "../ui/Card";
import FoodOne from "./FoodOne";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: 'Ролл "Наоми"',
    description:
      "Сыр Филадельфия, куриное филе, масаго, помидор, огурец, кунжут",
    price: 11.99,
  },
  {
    id: "m2",
    name: "Спайс в лососе",
    description: "Рис, лосось, соус спайс",
    price: 3.99,
  },
  {
    id: "m3",
    name: "Суши с угрем",
    description: "Угорь копченый, соус унаги, кунжут",
    price: 4.99,
  },
  {
    id: "m4",
    name: 'Салат "Поке с лососем"',
    description:
      "Рис, лосось, огурец, чука, нори, стружка тунца, соус ореховый",
    price: 7.99,
  },
];

const FoodList = (props) => {
  const meals = DUMMY_MEALS.map((meal) => <FoodOne key={meal.id} {...meal} />);
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{meals}</ul>
      </Card>
    </section>
  );
};

export default FoodList;
