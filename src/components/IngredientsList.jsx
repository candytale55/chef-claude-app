import capitalizeWord from '../utils/capitalize' // Utility to capitalize ingredient names
export default function IngredientsList({ ingredients, getRecipe }) {

    // Create list items for each non-empty ingredient with capitalized names
    const ingredientsListItems = ingredients
        .filter(ingredient => ingredient.name.trim() !== "") // Ignore empty or whitespace-only names
        .map(ingredient => (
            <li key={ingredient.id}>{capitalizeWord(ingredient.name)}</li> // Render each ingredient as a list item
        ));

    return (
        <section>
            {/* Section title */}
            <h2>Ingredients on hand:</h2>

            <section>
                {/* Display the list of ingredients */}
                <ul className='ingredients-list'>{ingredientsListItems}</ul>

                {/* Show "Get a recipe" button only if there are 3 or more valid ingredients */}
                {ingredients.filter(i => i.name.trim() !== "").length > 2 ? (
                    <div className='get-recipe-container'>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe with your list of ingredients.</p>
                        {/* Clicking the button triggers the function to show the recipe */}
                        <button onClick={getRecipe}>Get a recipe</button>
                    </div>
                ) : null}

                {/* TODO: Fix the inline display style of the "Ready for a recipe" section */}
            </section>

        </section>
    )
}
