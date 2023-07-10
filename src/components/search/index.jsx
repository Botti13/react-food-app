import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { ThemeContext } from "../../App";

function Search(props) {
  const { theme } = useContext(ThemeContext);

  const { getDataFromSearchComponent, apiCalledSucces, setApiCalledSuccess } =
    props;

  const [inputValue, setInputValue] = useState("");

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
      <button style={theme ? { backgroundColor: "#12343b" } : {}} type="submit">
        Search
      </button>
    </form>
  );
}

export default Search;
