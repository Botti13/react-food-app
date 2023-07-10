import { useContext, useState } from "react";
import "./styles.css";
import { ThemeContext } from "../../App";

const RecipeItem = (props) => {
  const { id, image, title, addToFavorites } = props;
  const { theme } = useContext(ThemeContext);
  const [isHover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const openRecipe = async function () {
    const apiResponse = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=6dee2e7168154be88eee0ee48d551706`
    );
    const result = await apiResponse.json();
    const recipeURL = result.sourceUrl;
    window.open(recipeURL, "_blank");
  };

  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} alt="Recipe image" onClick={openRecipe} />
      </div>

      <p style={theme ? { color: "#539165" } : {}} onClick={openRecipe}>
        {title}
      </p>

      <button
        type="button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={
          theme ? { backgroundColor: isHover ? "#437551" : "#539165" } : {}
        }
        onClick={addToFavorites}
      >
        Add to favorites
      </button>
    </div>
  );
};

export default RecipeItem;
