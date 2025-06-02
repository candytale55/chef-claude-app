import { useState } from 'react';

function IngredientsList() {

  const [ingredients, setIngredients] = useState([""]);
  const [inputValue, setInputValue] = useState("");
  


  function addIngredient(e) {
    e.preventDefault(); // Prevent page reload on form submit

    if (!inputValue.trim()) return; // Don't add empty strings

    {/*UUID will be added here*/}

    setIngredients(prev => [...prev, inputValue.trim()]);
    setInputValue(""); // Clear input after adding
  }

  //TODO - set better keys - ALSO: If user enters two of the same, tell the user and don't add it. 
  const ingredientsListItems = ingredients
    .filter(ingredient => ingredient.trim() !== "")
    .map(ingredient => (
      <li key={ingredient}>{ingredient}</li>
    ));

  return (
    <main>
      <form className='add-ingredient-form' onSubmit={addIngredient}>
        <label htmlFor='input-ingredient' ></label>
        <input
          id='input-ingredient'
          type='text'
          placeholder='i.e. Oregano'
          aria-label='Add ingredient'
          name='ingredient'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button type="submit" >Add ingredient</button>
      </form>
      
      {ingredients.filter(i => i.trim() !== "").length > 0 && (
        <ul>{ingredientsListItems}</ul>
      )}
      // TODO - Check that this does not affect rendering (ul taking space even when empty)
      
    </main>
  )
}

export default IngredientsList

