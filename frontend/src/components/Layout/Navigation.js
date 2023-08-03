import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const originLinks = [
    { title: "Home", to: "/" },
    { title: "Food", to: "/food" },
    { title: "Tasks", to: "/tasks" },
    { title: "Posts", to: "/posts" },
    { title: "Login", to: "/signin" },
    { title: "Signup", to: "/signup" },
  ];

  const [links, setLinks] = useState(originLinks);

  useEffect(() => {
    if (userInfo) {
      const updatedLinks = links.filter(
        (link) => link.title !== "Login" && link.title !== "Signup"
      );
      setLinks(updatedLinks);
    } else {
      setLinks(originLinks);
    }
  }, [userInfo]);

  return (
    <nav className={styles.topnav}>
      {links.map((link, idx) => (
        <NavLink key={idx} to={link.to} exact={link.exact}>
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
