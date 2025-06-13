// Import the Anthropic SDK for interacting with Claude models
import Anthropic from "@anthropic-ai/sdk";
import { HfInference } from "@huggingface/inference";


// Define a shared system prompt used by both AI models.
// This guides the assistant's behavior: use the given ingredients to suggest a recipe,
// allow for optional additional ingredients, and format the result in markdown.

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`



// Create an instance of the Anthropic SDK
const anthropic = new Anthropic({
  // TODO SET ANTHROPIC KEY.
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
})


// Function to get a recipe from Claude using the Anthropic SDK
export async function getRecipeFromChefClaude(ingredientsArray) {
    
    // Join ingredients into a comma-separated string for natural language input
    const ingredientsString = ingredientsArray.join(", ");
    
    // Call the Claude Project
    const msg = await anthropic.messages.create({
        model: "claude-3-haiku-20240307", // Chose the Claude model
        max_tokens: 1024, // Maximum length of the generated response
        system: SYSTEM_PROMPT, // Pass in the system instructions
        messages: [
          {
            role: "user", 
            content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
          },
        ],
    });
  
  // Return the generated recipe text (first part of the response)
  return msg.content[0].text
}



// Create an instance of Hugging Face Inference SDK  // TODO: It seems HfInference is deprecated - Look into it.
// const hf = new HfInference(process.env.HF_ACCESS_TOKEN) //TODO add HuggingFace API key


// Function to get a recipe from Mistral (model hosted on Hugging Face)
export async function getRecipeFromMistral(ingredientsArray) {
  // Join ingredients into a comma-separated string for natural language input
  const ingredientsString = ingredientsArray.join(", "); 

  try {

    // Send a chat-style completion request to the Mistral model
    const response = await hf.chatCompletion({
      model: "[ADD MISTRAL MODEL]", // TODO Add Mistral model
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make! ` },
      ],
      max_tokens: 1024,
    });


    // Return the content of the model's reply
    return response.choices[0].message.content;

  } catch {
    // Log any errors to the console (for debugging)
    console.error(err.message);
  }
}
