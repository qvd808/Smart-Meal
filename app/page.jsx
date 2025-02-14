'use client';

import React from 'react';

import Hero from '../components/Hero';
import Content from '../components/Content';
import BackgroundContainer from './components/background-container/BackgroundContainer';
import ChatPage from './pages/chat-page/ChatPage';

export default function Index() {
	return (
		<>
			<ChatPage />
			{/* <Hero /> */}
			{/* <hr /> */}
			{/* <Content /> */}
		</>
	);
}
