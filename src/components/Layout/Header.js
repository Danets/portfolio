import styles from "./Header.module.css";
import Navigation from "./Navigation";
import CartButton from "./CartButton";
import sushiImg from "../../assets/sushi.jpg";

const Header = () => {
  return <>
   <header className={styles.header}>
    <h1>Logo</h1>
     <Navigation />
     <CartButton />
  </header>
  <div className={styles['main-image']}>
    <img src={sushiImg} alt="Sushi" />
  </div>
  </>
 
};

export default Header;
