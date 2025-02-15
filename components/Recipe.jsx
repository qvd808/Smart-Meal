import React from 'react';
import styled from 'styled-components';

// Styled Components for Styling
const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc; // Light grey border
  margin-bottom: 20px;
  background-color: #f8f8f8; // Light grey background
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 200px; // Adjust as needed
  object-fit: cover;
`;

const RecipeContent = styled.div`
  padding: 15px;
`;

const RecipeTitle = styled.h3`
  margin-bottom: 5px;
`;

const RecipeDescription = styled.p`
  color: #666; // Slightly darker grey for description
  font-size: 14px;
`;

const Button = styled.button`
  background-color: #ffcc00; // Yellow button
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

// Recipe Component
const RecipeComponent = ({ recipe }) => {
  const { image, title, description, added } = recipe;

  return (
    <RecipeContainer>
      <RecipeImage src={image} alt={title} />
      <RecipeContent>
        <RecipeTitle>{title}</RecipeTitle>
        <RecipeDescription>{description}</RecipeDescription>
        <Button disabled={added}>
          {added ? 'ADDED' : 'ADD TO COOK'} 
        </Button>
      </RecipeContent>
    </RecipeContainer>
  );
};


// Sample Data (Replace with your actual data)
const sampleRecipes = [
  {
    image: 'path/to/greek_chicken.jpg', // Replace with actual paths
    title: 'Greek Chicken Bowls',
    description: 'with Lemon Potatoes & Kale',
    added: false,
  },
  {
    image: 'path/to/zucchini_frittata.jpg',
    title: 'Zucchini Frittata',
    description: 'with Asiago Cheese',
    added: true,
  },
  {
    image: 'path/to/salmon_salad.jpg',
    title: 'Spicy Salmon Salad',
    description: 'with Chickpeas & Lemon Dressing',
    added: false,
  },
  {
    image: 'path/to/zucchini_frittata.jpg', // Duplicate for demo
    title: 'Zucchini Frittata',
    description: 'with Asiago Cheese',
    added: false,
  },
];

// Usage Example in your App
const App = () => {
  return (
    <div>
      {sampleRecipes.map((recipe, index) => (
        <RecipeComponent key={index} recipe={recipe} />
      ))}
    </div>
  );
};

export default App;