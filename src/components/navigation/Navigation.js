import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const links = [
    { title: "Home", to: "/" },
    { title: "Tasks", to: "/tasks" },
    { title: "Posts", to: "/posts" },
    { title: "Login", to: "/login" },
  ];
 
  return (
    <nav className="topnav">
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
