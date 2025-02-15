import React, { useState, useRef, useEffect } from 'react';

const ChatPage = () => {
	// Initialize messages with empty array to prevent undefined
	const [messages, setMessages] = useState(() => {
		const initialMessage = {
			role: 'assistant',
			content: "Hello! I'm your nutrition assistant. Ask me for recipes or nutritional advice!",
			metadata: { type: 'text' }
		};
		return [initialMessage]; // Ensure initial array is never empty
	});

	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef(null);

	// Scroll handling
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!inputValue.trim() || isLoading) return;

		// Create new messages array safely
		const userMessage = {
			role: 'user',
			content: inputValue,
			metadata: { type: 'text' }
		};

		setMessages(prev => {
			// Ensure we're always working with an array
			const safePrev = Array.isArray(prev) ? prev : [];
			return [...safePrev, userMessage];
		});

		setInputValue('');
		setIsLoading(true);

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					message: inputValue,
					history: messages.filter(msg => msg.role !== 'assistant') // Skip initial message
				})
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			// Ensure received history is valid
			if (Array.isArray(data?.history)) {
				setMessages(data.history);
			} else {
				throw new Error('Invalid response format');
			}
		} catch (error) {
			console.error('Fetch error:', error);
			setMessages(prev => {
				const safePrev = Array.isArray(prev) ? prev : [];
				return [...safePrev, {
					role: 'assistant',
					content: 'Sorry, something went wrong. Please try again.',
					metadata: { type: 'text' }
				}];
			});
		} finally {
			setIsLoading(false);
		}
	};

	// Rest of your component remains the same...
	// [Keep the RecipeCard and MessageBubble components]
	// [Keep the JSX structure]

	return (
		<div className="flex flex-col h-full flex-grow max-w-3xl mx-auto py-4 px-8">
			{/* Header */}
			<div className="mb-2">
				<h1 className="text-2xl font-bold text-green-700 mb-1">Nutrition Chef</h1>
				<p className="text-gray-600">Get personalized recipes and nutrition advice</p>
			</div>

			{/* Chat Messages */}
			<div className="overflow-scroll h-[400px] mb-4 bg-white rounded-lg shadow-inner p-4">
				{Array.isArray(messages) && messages.map((msg, i) => (
					<div key={i} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
						<div className={`inline-block p-4 rounded-xl ${msg.role === 'user'
							? 'bg-green-600 text-white'
							: 'bg-gray-100 text-gray-800'
							} max-w-[90%] text-left`}>
							<MessageBubble msg={msg} />
						</div>
					</div>
				))}
				{isLoading && (
					<div className="text-left mb-4">
						<div className="inline-block p-4 rounded-xl bg-gray-100">
							<div className="flex items-center space-x-2 text-gray-500">
								<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
								<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-100"></div>
								<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-200"></div>
							</div>
						</div>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			{/* Input Form */}
			<form onSubmit={handleSubmit} className="flex gap-2">
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Ask for a recipe or nutrition advice..."
					className="flex-grow p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
					disabled={isLoading}
				/>
				<button
					type="submit"
					disabled={isLoading || !inputValue.trim()}
					className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
				>
					{isLoading ? 'Cooking...' : 'Send'}
				</button>
			</form>
		</div>
	);
};

function extractAndParseJSON(text) {
	// Handle markdown code blocks
	const codeBlockRegex = /```(?:json)?\n([\s\S]*?)\n```/g;
	const match = codeBlockRegex.exec(text);
	// console.log(match)

	if (match) {
		try {
			return JSON.parse(match[1]);
		} catch (error) {
			console.error("Failed to parse JSON from code block:", error);
		}
	}

	// Fallback to original method if no code blocks
	const jsonStart = text.indexOf('{');
	const jsonEnd = text.lastIndexOf('}');

	if (jsonStart === -1 || jsonEnd === -1) return null;

	try {
		return JSON.parse(text.slice(jsonStart, jsonEnd + 1));
	} catch (error) {
		console.error("Invalid JSON:", error);
		return null;
	}
}

// Add MessageBubble component inside ChatPage
const MessageBubble = ({ msg }) => {
	// Try parsing JSON if it's a recipe
	let recipe;
	if (msg.metadata?.type === 'recipe') {
		recipe = msg.content; // Directly use the object
	} else if (msg.content.includes("{") && msg.content.includes("}")) {
		try {
			recipe = extractAndParseJSON(msg.content);
		} catch (error) {
			console.error("Error parsing JSON recipe:", error);
		}
	}

	if (recipe && recipe.type === "recipe") {
		return (
			<div className="bg-white rounded-lg shadow-md p-4 max-w-full">
				<h2 className="text-lg font-bold text-green-700">{recipe.name}</h2>
				<p className="text-gray-600 italic">{recipe.description}</p>

				<div className="mt-2">
					<p><strong>Prep Time:</strong> {recipe.prep_time}</p>
					<p><strong>Cook Time:</strong> {recipe.cook_time}</p>
					<p><strong>Servings:</strong> {recipe.servings}</p>
				</div>

				<div className="mt-2">
					<h3 className="font-bold text-gray-700">Ingredients:</h3>
					<ul className="list-disc list-inside text-gray-800">
						{recipe.ingredients.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</div>

				<div className="mt-2">
					<h3 className="font-bold text-gray-700">Instructions:</h3>
					<ol className="list-decimal list-inside text-gray-800">
						{recipe.instructions.map((step, index) => (
							<li key={index}>{step}</li>
						))}
					</ol>
				</div>

				<div className="mt-2">
					<h3 className="font-bold text-gray-700">Nutrition:</h3>
					<p><strong>Calories:</strong> {recipe.nutrition.calories}</p>
					<p><strong>Protein:</strong> {recipe.nutrition.protein}</p>
					<p><strong>Carbs:</strong> {recipe.nutrition.carbs}</p>
					<p><strong>Fat:</strong> {recipe.nutrition.fat}</p>
				</div>
			</div>
		);
	}

	// Default text message
	return (
		<div className="whitespace-pre-wrap">
			{msg.content.split('\n').map((line, i) => (
				<React.Fragment key={i}>
					{line}
					{i < msg.content.split('\n').length - 1 && <br />}
				</React.Fragment>
			))}
		</div>
	);
};

export default ChatPage;
