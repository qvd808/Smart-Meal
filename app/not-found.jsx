import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
	const width = 100;
	return (
		<div className="flex flex-col items-center justify-center h-screen p-4">
			<h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
			<p className="text-gray-500 text-center mb-4">
				Oops! The page you're looking for doesn't exist.
			</p>

			{/* Responsive Image */}
			<div className={`relative w-full max-w-[${width}px] h-auto mb-4`}>
				<Image
					src="/crying.jpg"
					alt="Crying Image"
					layout="responsive"
					width={width}
					height={width}
					className="object-contain"
				/>
			</div>

			{/* Go Back Home Link */}
			<Link href="/" className="text-blue-500 underline mt-4">
				Go Back Home
			</Link>
		</div >
	);
}
