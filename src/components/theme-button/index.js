import { useContext, useState } from "react";
import "./styles.css";
import { ThemeContext } from "../../App";

const ThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isHover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div>
      <h1 style={theme ? { color: "#539165" } : {}}>
        Welcome to your recipe book!
      </h1>

      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={
          theme ? { backgroundColor: isHover ? "#437551" : "#539165" } : {}
        }
        onClick={() => setTheme(!theme)}
        className="themeButton"
      >
        Change Theme
      </button>
    </div>
  );
};

export default ThemeButton;
