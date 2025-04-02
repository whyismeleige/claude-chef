

export default function IngredientsList(props) {
  return(
    <>
    {props.ingredientsListItems.length > 0 && <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {props.ingredientsListItems}
      </ul>
      {props.ingredientsListItems.length > 3 && <div className="get-recipe-container">
        <div>
          <h3>Ready for a recipe?</h3>
          <p>Generate a recipe from the list of ingredients.</p>
        </div>
        <button onClick={props.fetchRecipe}>Get a recipe</button>
      </div>}
    </section>}
    </>
  );
}
