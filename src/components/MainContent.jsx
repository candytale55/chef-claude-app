import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { capitalizeWord } from '../utils/capitalize'

function IngredientsList() {

  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  


  function addIngredient(e) {
    e.preventDefault(); // Prevent page reload on form submit

    if (!inputValue.trim()) return; // Don't add empty strings

    const newIngredient = {
      id: uuidv4(),
      name: inputValue.trim()
    };

    setIngredients(prev => [...prev, newIngredient]);
    setInputValue("");
  }


  const ingredientsListItems = ingredients
    .filter(ingredient => ingredient.name.trim() !== "")
    .map(ingredient => (
      <li key={ingredient.id}>{capitalizeWord(ingredient.name)}</li>
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
      

      {/* Conditional Rendering of the Ingredient list */}

          {ingredients.filter(i => i.name.trim() !== "").length > 0 && (
        <section>

          {/* List of INGREDIENTS Section*/}  

              <h2>Ingredients on hand:</h2>
              <ul className='ingredients-list'>{ingredientsListItems}</ul>
              
          
          {/* Get Recipe Section*/}
          <div className='get-recipe-container'>
                <h3>Ready for a recipe?</h3>
            <p>Generate a recipe with your list of ingredients.</p>
            <button>Get a recipe</button>
          </div>
          {/*  // TODO: Fix the Ready for a recipe inline display */}
        </section>
          )} 
      
      

      


      
    </main>
  )
}

export default IngredientsList

