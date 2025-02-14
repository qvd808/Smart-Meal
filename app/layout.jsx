'use client';

import './globals.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="h-full">
			<head>
				<link
					rel="stylesheet"
					href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
					integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
					crossOrigin="anonymous"
				/>
				<link rel="stylesheet" href="https://cdn.auth0.com/js/auth0-samples-theme/1.0/css/auth0-theme.min.css" />
			</head>
			<body className="h-full flex flex-col">
				<UserProvider>
					{/* Full-width Navbar */}
					<div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
						<NavBar />
					</div>

					{/* Main Content */}
					<main className="flex-grow pt-20 pb-40"> {/* Adjust padding based on navbar/footer height */}
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							{children}
						</div>
					</main>

					{/* Full-width Footer */}
					<div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
						<Footer />
					</div>
				</UserProvider>
			</body>
		</html>
	);
}
