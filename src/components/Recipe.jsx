

export default function Recipe() {

  return (
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
  )
}