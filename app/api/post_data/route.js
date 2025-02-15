// app/api/post_data/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req) {
	try {
		// Parse the request body
		const body = await req.json();
		const { user, recipe } = body;

		if (!user || !recipe) {
			return NextResponse.json(
				{ error: "Missing user or recipe data" },
				{ status: 400 }
			);
		}

		// Insert the recipe into the "recipes" table
		const { data, error } = await supabase.from('recipes').insert([
			{
				user_id: user.sub, // Auth0 user ID (adjust if using a different property)
				recipe_data: recipe, // Save the full recipe JSON
				recipe_name: recipe.name, // Optional: store recipe name
				recipe_description: recipe.description, // Optional: store recipe description
			},
		]);

		if (error) {
			console.error("Supabase insert error:", error);
			return NextResponse.json(
				{ error: error.message },
				{ status: 500 }
			);
		}

		return NextResponse.json({ success: true, data });
	} catch (err) {
		console.error("Error in POST /api/post_data:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
