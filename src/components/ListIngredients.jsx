
import capitalizeWord from '../utils/capitalize'
export default function IngredientsList({ ingredients, toggleRecipeShown }) {

    



    const ingredientsListItems = ingredients
        .filter(ingredient => ingredient.name.trim() !== "")
        .map(ingredient => (
            <li key={ingredient.id}>{capitalizeWord(ingredient.name)}</li>
        ));


    return (
        <section>
            {/* List of current ingredients */}
            <h2>Ingredients on hand:</h2>
            <section>

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

        </section>
    )
}


