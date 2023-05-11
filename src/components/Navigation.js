import { useState } from "react";
import "./Navigation.css";

const Navigation = () => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const links = ["Home", "News", "Contact", "About"];
    const handlerClick = (idx) => {
      setActiveIndex(idx);
    }
    return (
      <div className="topnav">
        {links.map((text, idx) => (
          <a 
            className={idx === activeIndex ? 'active' : ''}
            onClick={() => handlerClick(idx)}
            key={idx}>
            {text}
          </a>
        ))}
      </div>
    );
  };
  

export default Navigation;
