import { useContext } from "react";
import "./styles.css";
import { ThemeContext } from "../../App";

const FavoriteItem = (props) => {
  const { id, image, title, removeFromFavorites } = props;
  const { theme } = useContext(ThemeContext);

  return (
    <div key={id} className="favorite-item">
      <div>
        <img src={image} alt="Recipe image" />
      </div>

      <p style={theme ? { color: "#12343b" } : {}}>{title}</p>

      <button
        type="button"
        style={theme ? { backgroundColor: "#12343b" } : {}}
        onClick={removeFromFavorites}
      >
        Remove from favorites
      </button>
    </div>
  );
};

export default FavoriteItem;
