import { useState } from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromChefClaude } from "../ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

export default function Main() {
  const [ingredients, setIngredient] = useState([]);
  const [recipe, setRecipe] = useState("");

  const deleteIngredient = (item) => {
    setIngredient(prevIngredients => prevIngredients.map(ingredient => 
      ingredient !== item ? ingredient : undefined
    ))
  };

  let ingredientsListItems = ingredients.map((ingredient) => (
    <>
    {ingredient && <li key={ingredient}>
      {ingredient}
      <FontAwesomeIcon className="x-icon" id={ingredient} onClick={() => deleteIngredient(ingredient)} icon={faCircleXmark} />
    </li>}
    </>
  ));

  const handleSubmit = (formData) => {
    const newIngredient = formData.get("ingredient");
    if(!newIngredient) return;
    setIngredient((prevIngredients) => [...prevIngredients, newIngredient]);
  };

  const fetchRecipe = async () => {
    let data = await getRecipeFromChefClaude(ingredients);
    setRecipe(data);
    setTimeout(() => {
      const target = document.querySelector(".suggested-recipe-container");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    },100);
  };

  return (
    <main>
      <form action={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add Ingredient"
          name="ingredient"
        />
        <button>Add Ingredient</button>
      </form>
      <IngredientsList
        ingredientsListItems={ingredientsListItems}
        fetchRecipe={fetchRecipe}
      />
      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
