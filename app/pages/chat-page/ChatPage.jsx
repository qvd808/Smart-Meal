import { useState, useRef, useEffect } from "react";
import ChatBubble from "../../components/chat-bubble/ChatBubble";
import ChatInput from "../../components/chat-input/ChatInput";
import ToggleChatButton from "../../components/toggle-chat-button/ToggleChatButton";

import axios from "axios";
import styles from "./ChatPage.module.css";

const ChatPage = () => {
	const showChat = true
	const [messages, setMessages] = useState([]);
	const [isExpanded, setIsExpanded] = useState(false);
	const [firstToggle, setFirstToggle] = useState(true);
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef(null);

	const handleSend = async (userInput) => {
		if (!userInput.trim()) return;
		setIsTyping(true);

		const newUserMessage = { text: userInput, isUser: true };
		const serverUrl = import.meta.env.VITE_SERVER_URL;

		// Add user message immediately
		setMessages(prevMessages => [...prevMessages, newUserMessage]);

		// Make API call
		try {
			const response = await axios.post(`${serverUrl}/chat`, {
				message: [...messages, newUserMessage], // Use current messages plus new message
			});

			setTimeout(() => {
				const botResponse = { text: response.data.response, isUser: false };
				setMessages(msgs => [...msgs, botResponse]);
				setIsTyping(false);
			}, 1000);
		} catch (error) {
			console.error("Error:", error);
			setTimeout(() => {
				const errorMessage = {
					text: "Failed to get response from the server.",
					isUser: false,
				};
				setMessages(msgs => [...msgs, errorMessage]);
				setIsTyping(false);
			}, 1000);
		}
	};

	const toggleChat = () => {
		setShowChat(!showChat);
		if (firstToggle) {
			setTimeout(() => {
				setMessages([{ text: "Hi! How can I help you?", isUser: false }]);
			}, 1000);
			setFirstToggle(false);
		}
	};

	const toggleExpand = () => setIsExpanded(!isExpanded);

	useEffect(() => {
		const scrollToBottom = () => {
			const current = messagesEndRef.current;
			if (current) {
				current.scrollTop = current.scrollHeight - current.clientHeight;
			}
		};

		scrollToBottom();
	}, [messages]);

	return (
		<>
			{showChat ? (
				<div
					className={`${styles.chatContainer} ${isExpanded ? styles.expanded : ""
						}`}
				>
					<div className={styles.header}>
						<div className={styles.headerLeft}>

							<span className={styles.title}>SmartMeal</span>
						</div>
						<div className={styles.headerRight}>
							<button className={styles.expandButton} onClick={toggleExpand}>
								Toggle chat size
							</button>
							<button className={styles.minimizeButton} onClick={toggleChat}>
								Minimize chat
							</button>
						</div>
					</div>
					<div className={styles.messagesContainer} ref={messagesEndRef}>
						{messages.map((msg, index) => (
							<div
								key={index}
								className={
									msg.isUser
										? styles.userMessageWrapper
										: styles.messageWithAvatar
								}
							>

								<ChatBubble text={msg.text} isUser={msg.isUser} />
							</div>
						))}
						{isTyping && (
							<div className={styles.messageWithAvatar}>

								<div className={styles.typingIndicatorWrapper}>
									<div className={styles.typingIndicator}>
										<span>.</span>
										<span>.</span>
										<span>.</span>
									</div>
								</div>
							</div>
						)}
					</div>
					<ChatInput onSend={handleSend} />
				</div>
			) : (
				<ToggleChatButton onClick={toggleChat} />
			)}
		</>
	);
};

export default ChatPage;
