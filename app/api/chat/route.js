import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
	try {
		const body = await req.json();
		const userMessage = body.message; // New user message from client
		const history = body.history || []; // Existing conversation history

		if (!userMessage) {
			return NextResponse.json(
				{ error: "Please provide a message" },
				{ status: 403 }
			);
		}

		// System message configuration
		const systemMessage = {
			role: "system",
			content: "Be precise and concise."
		};

		// Construct messages array with system message, history, and new user message
		let messages = [
			systemMessage,
			...history,
			{ role: "user", content: userMessage }
		];

		// API call to Perplexity
		const response = await axios.post(
			"https://api.perplexity.ai/chat/completions",
			{
				model: "sonar",
				messages: messages,
				max_tokens: 123,
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

		// Extract assistant's response
		const assistantContent = response.data.choices[0].message.content;
		const assistantMessage = {
			role: "assistant",
			content: assistantContent
		};

		// Append assistant response to messages
		messages.push(assistantMessage);

		// Trim history to retain last 10 conversations (20 messages after system)
		if (messages.length > 21) {
			const recentMessages = messages.slice(1).slice(-20); // Remove system & get last 20
			messages = [systemMessage, ...recentMessages];
		}

		// Prepare updated history (excluding system message for client)
		const newHistory = messages.slice(1);

		return NextResponse.json(
			{
				history: newHistory, // Send back updated history
				response: response.data
			},
			{ status: 200 }
		);

	} catch (error) {
		console.error("Error:", error.response?.data || error.message);
		return NextResponse.json(
			{ error: error.response?.data || "An error occurred" },
			{ status: error.response?.status || 500 }
		);
	}
}
