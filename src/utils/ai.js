// Import the Anthropic SDK for interacting with Claude models
import Anthropic from "@anthropic-ai/sdk";




// Define a shared system prompt used by both AI models.
// This guides the assistant's behavior: use the given ingredients to suggest a recipe,
// allow for optional additional ingredients, and format the result in markdown.

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page`


const anthropic = new Anthropic({
    // TODO SET ANTHROPIC KEY.
})


// Function to get a recipe from Claude using the Anthropic SDK
export async function getRecipeFromChefClaude(ingredientsArray) {
    
    // Join ingredients into a comma-separated string for natural language input
    const ingredientsString = ingredientsArray.join(", ");
    
    // Call the Claude Project
    const msg = await anthropic.messages.create({
        model: "[SET MODEL]", // TODO Chose the Claude model
        max_tokens: "[SET NUMBER OF TOKENS]", // TODO Maximum length of the generated response
        system: SYSTEM_PROMPT, // Pass in the system instructions
        messages: [
          {
            role: "user", 
            content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
          }
        ],
    });
  
  // Return the generated recipe text (first part of the response)
  return msg.content[0].text
}