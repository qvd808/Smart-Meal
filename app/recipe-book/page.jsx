'use client';
import { useState } from "react";

export default function RecipeBook() {
	const [recipes, setRecipes] = useState([
		{ id: 1, name: "Greek Chicken Bowls", details: "with Lemon Potatoes & Kale", added: false },
		{ id: 2, name: "Zucchini Frittata", details: "with Asiago Cheese", added: true },
		{ id: 3, name: "Spicy Salmon Salad", details: "with Chickpeas & Lemon Dressing", added: false },
		{ id: 4, name: "Zucchini Frittata", details: "with Asiago Cheese", added: false },
	]);

	const [groceryList, setGroceryList] = useState([
		"Creamy Chicken & Mushroom",
		"Thai Shrimp And Papaya Salad",
		"Zucchini Frittata",
	]);

	return (
		<div className="flex flex-col lg:flex-row min-h-screen">
			{/* Saved Recipes Section */}
			<div className="w-full lg:w-1/2 p-6">
				<h2 className="text-2xl font-semibold mb-4">Saved Recipe</h2>
				{recipes.map((recipe) => (
					<div key={recipe.id} className="mb-4 p-4 border rounded-lg flex justify-between">
						<div>
							<h3 className="font-bold">{recipe.name}</h3>
							<p className="text-gray-600">{recipe.details}</p>
						</div>
						<div>
							<button className="border px-4 py-2 mr-2">View Details</button>
							<button className={`px-4 py-2 ${recipe.added ? 'bg-gray-400' : 'bg-yellow-400'}`}>
								{recipe.added ? "Added" : "Add to Cook"}
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Grocery Shopping List Section */}
			<div className="w-full lg:w-1/2 p-6 bg-gray-100">
				<h2 className="text-2xl font-semibold mb-4">Grocery Shopping List</h2>
				<div className="flex flex-wrap gap-2 mb-4">
					{groceryList.map((item, index) => (
						<span key={index} className="bg-yellow-300 px-3 py-1 rounded-lg">{item} X</span>
					))}
					<button className="border px-4 py-1">+ Add More</button>
				</div>

				<div className="p-4 border rounded-lg bg-white">
					<h3 className="font-bold mb-2">🥩 Proteins</h3>
					<ul>
						<li><input type="checkbox" /> Chicken Breast (Boneless, Skinless) - 2</li>
						<li><input type="checkbox" /> Shrimp (Peeled & Deveined) - ½ Lb</li>
						<li><input type="checkbox" /> Eggs - 6</li>
					</ul>
					<h3 className="font-bold mt-4 mb-2">🥛 Dairy & Pantry Staples</h3>
					<ul>
						<li><input type="checkbox" /> Heavy Cream - ½ Cup</li>
						<li><input type="checkbox" /> Parmesan Cheese - ¼ Cup</li>
						<li><input type="checkbox" /> Butter - 2 Tbsp</li>
					</ul>
					<h3 className="font-bold mt-4 mb-2">🥦 Vegetables & Herbs</h3>
					<ul>
						<li><input type="checkbox" /> Mushrooms (Cremini) - 1 Cup, Sliced</li>
						<li><input type="checkbox" /> Onion - 1 Small</li>
						<li><input type="checkbox" /> Garlic - 3 Cloves</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
