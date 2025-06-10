import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Used to generate unique IDs for each ingredient

import ListIngredients from './ListIngredients';
import Recipe from './Recipe';




export default function IngredientsList() {


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

        <ListIngredients ingredients={ingredients} toggleRecipeShown={toggleRecipeShown} />
        
      ) : null}


      {/* When `recipeShown` is true - show hard-coded recipe */}
      { 
        recipeShown && ( <Recipe />)
      } 
        </main>
        
  );
}


