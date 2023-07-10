import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import Search from "../../components/search";
import "./styles.css";
import RecipeItem from "../../components/recipe-item";
import FavoriteItem from "../../components/favorite-item";
import { ThemeContext } from "../../App";

const reducer = (state, action) => {
  switch (action.type) {
    case "filterFavorites":
      console.log(action);
      return {
        ...state,
        filteredValue: action.value,
      };

    default:
      return state;
  }
};

const initialState = {
  filteredValue: "",
};

function Homepage() {
  const [loadingState, setLoadingState] = useState(false);

  const [recipes, setRecipes] = useState([]);

  const [favorites, setFavorites] = useState([]);

  const [apiCalledSucces, setApiCalledSuccess] = useState(false);

  const [filteredState, dispatch] = useReducer(reducer, initialState);

  const { theme } = useContext(ThemeContext);

  const getDataFromSearchComponent = (getData) => {
    setLoadingState(true);

    async function getRecipes() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=6dee2e7168154be88eee0ee48d551706&query=${getData}`
      );
      const result = await apiResponse.json();
      const { results } = result;

      if (results && results.length > 0) {
        setLoadingState(false);
        setRecipes(results);
        setApiCalledSuccess(true);
      }
    }

    getRecipes();
  };

  const addToFavorites = useCallback(
    (currentRecipe) => {
      let copyFavorites = [...favorites];

      const index = copyFavorites.findIndex(
        (item) => item.id === currentRecipe.id
      );

      if (index === -1) {
        copyFavorites.push(currentRecipe);
        setFavorites(copyFavorites);
        localStorage.setItem("favorites", JSON.stringify(copyFavorites));
        window.scrollTo({ top: "0", behavior: "smooth" });
      } else {
        alert("Recipe already in favorites!");
      }
    },
    [favorites]
  );

  const removeFromFavorites = (getCurrentId) => {
    let copyFavorites = [...favorites];
    copyFavorites = copyFavorites.filter((item) => item.id !== getCurrentId);
    setFavorites(copyFavorites);
    localStorage.setItem("favorites", JSON.stringify(copyFavorites));
  };

  useEffect(() => {
    const extractFavoritesFromLocalStorageOnPageLoad =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(extractFavoritesFromLocalStorageOnPageLoad);
  }, []);

  console.log(filteredState, "filteredState");

  const filteredFavorites =
    favorites && favorites.length > 0
      ? favorites.filter((item) =>
          item.title.toLowerCase().includes(filteredState.filteredValue)
        )
      : [];

  const renderRecipes = useCallback(() => {
    if (recipes && recipes.length > 0) {
      return recipes.map((item) => (
        <RecipeItem
          addToFavorites={() => addToFavorites(item)}
          id={item.id}
          image={item.image}
          title={item.title}
        />
      ));
    }
  }, [recipes, addToFavorites]);

  return (
    <div className="homepage">
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        apiCalledSucces={apiCalledSucces}
        setApiCalledSuccess={setApiCalledSuccess}
      />

      <div className="favorites-wrapper">
        <h1
          style={theme ? { color: "#12343b" } : {}}
          className="favorites-title"
        >
          Favorites
        </h1>
        <div className="search-favorites">
          <input
            onChange={(event) =>
              dispatch({ type: "filterFavorites", value: event.target.value })
            }
            value={filteredState.filteredValue}
            name="searchfavorites"
            placeholder="Search Favorites"
          />
        </div>
        <div className="favorites">
          {!filteredFavorites.length && (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
              className="no-items"
            >
              No favorites found!
            </div>
          )}
          {filteredFavorites && filteredFavorites.length > 0
            ? filteredFavorites.map((item) => (
                <FavoriteItem
                  removeFromFavorites={() => removeFromFavorites(item.id)}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                />
              ))
            : null}
        </div>
      </div>

      {loadingState && (
        <div className="loading">Loading recipes! Please wait</div>
      )}

      <div className="items">
        {useMemo(
          () =>
            !loadingState && recipes && recipes.length > 0
              ? recipes.map((item) => (
                  <RecipeItem
                    addToFavorites={() => addToFavorites(item)}
                    id={item.id}
                    image={item.image}
                    title={item.title}
                  />
                ))
              : null,
          [loadingState, recipes, addToFavorites]
        )}

        {/* {renderRecipes()} */}
        {/* {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <RecipeItem
                addToFavorites={() => addToFavorites(item)}
                id={item.id}
                image={item.image}
                title={item.title}
              />
            ))
          : null} */}
      </div>

      {!loadingState && !recipes.length && (
        <div className="no-items">No recipes found!</div>
      )}
    </div>
  );
}

export default Homepage;
