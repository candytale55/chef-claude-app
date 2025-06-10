import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Used to generate unique IDs for each ingredient
import { capitalizeWord } from '../utils/capitalize'; // Utility function to capitalize ingredient names

function IngredientsList() {

  // State to hold the list of ingredients
  const [ingredients, setIngredients] = useState([]);

  // State to manage the input field's value
  const [inputValue, setInputValue] = useState("");

  // State to determine whether the recipe is shown
  const [recipeShown, setRecipeShown] = useState(false);


  // Toggles the visibility of the hard-coded recipe (used for testing)
  function toggleRecipeShown() {
    setRecipeShown(prevShown => !prevShown);
  }


  // Handles form submission to add an ingredient
  function addIngredient(e) {
    e.preventDefault(); // Prevent page reload on form submit

    if (!inputValue.trim()) return; // Avoid adding empty strings

    const newIngredient = {
      id: uuidv4(), // Generate a unique ID
      name: inputValue.trim() // Trim and store the ingredient name
    };

    // Add the new ingredient to the existing list
    setIngredients(prev => [...prev, newIngredient]);

    // Clear the input field
    setInputValue("");
  }


  // Create the list items for rendering the ingredient list
  const ingredientsListItems = ingredients
    .filter(ingredient => ingredient.name.trim() !== "") // Filter out empty names
    .map(ingredient => (
      <li key={ingredient.id}>{capitalizeWord(ingredient.name)}</li> // Capitalize each name
    ));

  return (
    <main>

      {/* Form to add a new ingredient */}
      <form className='add-ingredient-form' onSubmit={addIngredient}>
        <label htmlFor='input-ingredient'></label>
        <input
          id='input-ingredient'
          type='text'
          placeholder='i.e. Oregano'
          aria-label='Add ingredient'
          name='ingredient'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)} // Update input state on change
        />
        <button type="submit">Add ingredient</button>
      </form>


      {/* Show ingredients section only if there’s at least one non-empty ingredient */}
      {ingredients.filter(i => i.name.trim() !== "").length > 0 ? (
        <section>

          {/* List of current ingredients */}
          <h2>Ingredients on hand:</h2>
          <ul className='ingredients-list'>{ingredientsListItems}</ul>

          {/* Show 'Get a recipe' section only if there are 3 or more ingredients */}
          {ingredients.filter(i => i.name.trim() !== "").length > 2 ? (
            <div className='get-recipe-container'>
              <h3>Ready for a recipe?</h3>
              <p>Generate a recipe with your list of ingredients.</p>
              <button onClick={toggleRecipeShown}>Get a recipe</button>
            </div>
          ) : null}

          {/* // TODO: Fix the Ready for a recipe inline display */}
        </section>
      ) : null}


      {/* Hard-coded recipe section – only visible when `recipeShown` is true */}
      {recipeShown && (
        <section>
          <h2>Chef Claude Recommends:</h2>
          <article className="suggested-recipe-container" aria-live="polite">
            <p>Based on the ingredients you have available, I would recommend making a simple and delicious <strong>Beef Bolognese Pasta</strong>. Here is the recipe:</p>

            <h3>Beef Bolognese Pasta</h3>
            <strong>Ingredients:</strong>
            <ul>
              <li>1 lb. ground beef</li>
              <li>1 onion, diced</li>
              <li>3 cloves garlic, minced</li>
              <li>2 tablespoons tomato paste</li>
              <li>1 (28 oz) can crushed tomatoes</li>
              <li>1 cup beef broth</li>
              <li>1 teaspoon dried oregano</li>
              <li>1 teaspoon dried basil</li>
              <li>Salt and pepper to taste</li>
              <li>8 oz pasta of your choice (e.g., spaghetti, penne, or linguine)</li>
            </ul>

            <strong>Instructions:</strong>
            <ol>
              <li>Bring a large pot of salted water to a boil for the pasta.</li>
              <li>In a large skillet or Dutch oven, cook the ground beef over medium-high heat until browned.</li>
              <li>Add the diced onion and garlic, cook until translucent.</li>
              <li>Stir in the tomato paste and cook for 1 minute.</li>
              <li>Add crushed tomatoes, broth, oregano, and basil. Season to taste.</li>
              <li>Simmer on low for 15–20 minutes, stirring occasionally.</li>
              <li>Cook pasta according to package instructions, then drain.</li>
              <li>Combine pasta with sauce and toss together.</li>
              <li>Serve hot with optional garnishes like basil or Parmesan.</li>
            </ol>
          </article>
        </section>
      )}
    </main>
  );
}

export default IngredientsList;
