import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const links = [
    { title: "Home", to: "/" },
    { title: "Food", to: "/food" },
    { title: "Tasks", to: "/tasks" },
    { title: "Posts", to: "/posts" },
    { title: "Login", to: "/login" },
  ];
 
  return (
    <nav className={styles.topnav}>
      {links.map((link, idx) => (
        <NavLink
          key={idx}
          to={link.to}
        >
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
