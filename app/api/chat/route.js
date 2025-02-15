import { NextResponse } from 'next/server';
import axios from 'axios';

const systemMessage = {
	role: "system",
	content: `You are a nutrition expert assistant. Follow these rules:
1. When providing recipes, use EXACTLY this JSON format:
{
  "type": "recipe",
  "name": "Recipe name",
  "description": "1-sentence description",
  "prep_time": "X mins",
  "cook_time": "X mins",
  "servings": X,
  "ingredients": ["1 cup ingredient", ...],
  "instructions": ["Step 1...", "Step 2..."],
  "nutrition": {
    "calories": "XXX kcal",
    "protein": "XXg",
    "carbs": "XXg",
    "fat": "XXg"
  }
}

2. Validate JSON syntax before responding
3. For non-recipe responses, use regular text
4. Never mix JSON with text
5. Ingredients must include quantities
6. Keep instructions under 6 steps
7. Include cooking times and servings
8. Nutritional info per serving

Current date: ${new Date().toISOString().split('T')[0]}`
};

function validateRecipe(recipe) {
	return (
		recipe.type === 'recipe' &&
		recipe.name &&
		recipe.ingredients?.length > 0 &&
		recipe.instructions?.length > 0
	);
}

export async function POST(req) {
	try {
		const { message: userMessage, history = [] } = await req.json();

		if (!userMessage) {
			return NextResponse.json({ error: "Message required" }, { status: 400 });
		}

		const messages = [
			systemMessage,
			...history,
			{ role: "user", content: userMessage }
		];

		const response = await axios.post(
			"https://api.perplexity.ai/chat/completions",
			{
				model: "sonar",
				messages: messages,
				max_tokens: 1000,
				temperature: 0.2,
				top_p: 0.9,
				search_domain_filter: null,
				return_images: false,
				return_related_questions: false,
				search_recency_filter: null,
				top_k: 0,
				stream: false,
				presence_penalty: 0,
				frequency_penalty: 1,
				response_format: null
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.CHAT_BOT_API}`,
					"Content-Type": "application/json"
				}
			}
		);

		const assistantContent = response.data.choices[0].message.content;
		let metadata = { type: 'text' };
		let parsedContent = assistantContent;

		try {
			const potentialRecipe = JSON.parse(assistantContent);
			if (validateRecipe(potentialRecipe)) {
				metadata.type = 'recipe';
				parsedContent = potentialRecipe;
			}
		} catch {
			// Not JSON, continue as text
		}

		const newHistory = [
			...history,
			{ role: "user", content: userMessage },
			{
				role: "assistant",
				content: assistantContent,
				metadata
			}
		];

		return NextResponse.json({ history: newHistory }, { status: 200 });

	} catch (error) {
		console.error('Error:', error);
		return NextResponse.json(
			{ error: "Service unavailable. Please try again later." },
			{ status: 503 }
		);
	}
}
