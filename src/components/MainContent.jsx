import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Generates unique IDs for each ingredient
import { getRecipeFromChefClaude } from '../utils/ai';


import ListIngredients from './IngredientsList'; // Component to display the ingredient list and recipe button
import Recipe from './Recipe'; // Component to display a hardcoded recipe (used for testing)

export default function IngredientsList() {

  // State: holds the list of ingredients added by the user
  const [ingredients, setIngredients] = useState([]);

  // State: tracks the current value of the input field
  const [inputValue, setInputValue] = useState("");

  // TODO Change comment
  const [recipe, setRecipe] = useState("");

 
  // TODO Change comment
  async function getRecipe() {
    const ingredientNames = ingredients.map(ing => ing.name); // Extract only names
    const recipeMarkdown = await getRecipeFromChefClaude(ingredientNames);
    setRecipe(recipeMarkdown);
  }
  


  // Handles the form submission when user adds a new ingredient
  function addIngredient(e) {
    if (!inputValue.trim()) return; // Do not add empty or whitespace-only ingredients

    const newIngredient = {
      id: uuidv4(), // Unique identifier for the ingredient
      name: inputValue.trim() // Trimmed ingredient name
    };

    // Add new ingredient to the existing list
    setIngredients(prev => [...prev, newIngredient]);

    // Clear the input field after adding
    setInputValue("");
  }

  return (
    <main>
      {/* === Ingredient Input Form === */}
      <form className='add-ingredient-form' action={addIngredient}>
        <label htmlFor='input-ingredient'></label>
        <input
          id='input-ingredient'
          type='text'
          placeholder='i.e. Oregano'
          aria-label='Add ingredient'
          name='ingredient'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)} // Update state as user types
        />
        <button type="submit">Add ingredient</button>
      </form>

      {/* === Show ListIngredients Section if at least 1 valid item exists === */}
      {ingredients.filter(i => i.name.trim() !== "").length > 0 ? (
        <ListIngredients
          ingredients={ingredients}
          getRecipe={getRecipe}
        />
      ) : null}

      {/* === Show Recipe Section if toggle is active === */}
      {recipe && <Recipe recipe={recipe} />}
    </main>
  );
}


