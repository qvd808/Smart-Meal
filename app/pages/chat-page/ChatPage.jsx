import React, { useState, useRef, useEffect } from 'react';

const ChatPage = () => {
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const messagesEndRef = useRef(null);

	// Auto-scroll to bottom when new messages are added
	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (inputValue.trim() === '') return;

		// Add user message to chat UI immediately
		const userMessage = {
			role: 'user',
			content: inputValue
		};

		setMessages(prevMessages => [...prevMessages, userMessage]);
		setInputValue('');
		setIsLoading(true);

		try {
			// Call your API endpoint
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					message: userMessage.content,
					history: messages.map(msg => ({
						role: msg.role,
						content: msg.content
					}))
				})
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();

			// Update messages with the complete history returned from the API
			setMessages(data.history);
			setIsLoading(false);

		} catch (error) {
			console.error('Error:', error);
			setIsLoading(false);

			// Show error message in chat
			setMessages(prevMessages => [
				...prevMessages,
				{
					role: 'assistant',
					content: 'Sorry, an error occurred. Please try again.'
				}
			]);
		}
	};

	return (
		<div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Chat</h1>

			{/* Chat messages container */}
			<div className="flex-grow overflow-auto mb-4 border rounded-lg p-4 bg-gray-50">
				{messages.length === 0 ? (
					<p className="text-gray-500 italic">Start a conversation...</p>
				) : (
					messages.map((msg, index) => (
						<div
							key={index}
							className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
						>
							<div
								className={`inline-block p-3 rounded-lg ${msg.role === 'user'
										? 'bg-blue-500 text-white'
										: 'bg-gray-200 text-gray-800'
									}`}
							>
								{msg.content}
							</div>
						</div>
					))
				)}
				{isLoading && (
					<div className="text-left mb-4">
						<div className="inline-block p-3 rounded-lg bg-gray-200 text-gray-800">
							<div className="flex items-center">
								<div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse mr-1"></div>
								<div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse mr-1" style={{ animationDelay: '0.2s' }}></div>
								<div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
							</div>
						</div>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			{/* Input form */}
			<form onSubmit={handleSubmit} className="flex">
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Type your message..."
					className="flex-grow mr-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					disabled={isLoading}
				/>
				<button
					type="submit"
					disabled={isLoading || !inputValue.trim()}
					className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
				>
					Send
				</button>
			</form>
		</div>
	);
};

export default ChatPage;
