import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { ThemeContext } from "../../App";

function Search(props) {
  const { theme } = useContext(ThemeContext);

  const { getDataFromSearchComponent, apiCalledSucces, setApiCalledSuccess } =
    props;

  const [inputValue, setInputValue] = useState("");

  const [isHover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleInputValue = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getDataFromSearchComponent(inputValue);
  };

  useEffect(() => {
    if (apiCalledSucces) {
      setInputValue("");
      setApiCalledSuccess(false);
    }
  }, [apiCalledSucces, setApiCalledSuccess]);

  return (
    <form onSubmit={handleSubmit} className="search">
      <input
        name="search"
        onChange={handleInputValue}
        value={inputValue}
        placeholder="Search Recipes"
        id="search"
      />
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={
          theme ? { backgroundColor: isHover ? "#437551" : "#539165" } : {}
        }
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

export default Search;
