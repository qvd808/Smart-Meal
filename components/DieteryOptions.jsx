
import React, { useState, useEffect } from 'react';
// Data structure for dietary options
const dietaryCategories = [
  {
    title: "General",
    options: [
      { id: "keto", label: "Keto", icon: "⭕️" },
      { id: "vegan", label: "Vegan", icon: "🌱" },
      { id: "vegetarian", label: "Vegetarian", icon: "🥗" },
      { id: "low-sodium", label: "Low-Sodium", icon: "🧂" }
    ]
  },
  {
    title: "Special Condition",
    options: [
      { id: "diabetic", label: "Diabetic Friendly", icon: "🩸" },
      { id: "high-cholesterol", label: "High Cholesterol", icon: "💧" },
      { id: "high-bp", label: "High Blood Pressure", icon: "❤️" },
      { id: "renal", label: "Renal Diet", icon: "🧍" }
    ]
  }
];

const OptionCard = ({ label, icon, selected, onClick }) => (
  <div 
    className={`w-24 h-24 border ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} 
    flex flex-col items-center justify-center cursor-pointer transition-colors`}
    onClick={onClick}
  >
    <div className="text-2xl mb-2">{icon}</div>
    <div className="text-xs text-center">{label}</div>
  </div>
);



// Modified CategorySection - you can either keep ExamplesLink or remove it
const CategorySection = ({ category, selectedOptions, onOptionToggle }) => (
  <div className="mb-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-sm font-medium">{category.title}</h2>
      
    </div>
    
    <div className="grid grid-cols-4 gap-2">
      {category.options.map(option => (
        <div key={option.id} className="flex flex-col items-center">
          <OptionCard 
            label={option.label} 
            icon={option.icon}
            selected={selectedOptions.includes(option.id)}
            onClick={() => onOptionToggle(option.id)}
          />
          
        </div>
      ))}
    </div>
  </div>
);

// Modified main component
const DietaryOptions = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Load saved preferences on component mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('dietaryPreferences');
    if (savedPreferences) {
      const parsedPreferences = JSON.parse(savedPreferences);
      setSelectedOptions(parsedPreferences);
      // Check if current selection differs from saved preferences
      const currentSelection = JSON.stringify(selectedOptions.sort());
      const savedSelection = JSON.stringify(parsedPreferences.sort());
      setHasChanges(currentSelection !== savedSelection);
    }
  }, []);

  const handleOptionToggle = (optionId) => {
    setSelectedOptions(prev => {
      const newSelection = prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId];
      
      // Check if the new selection is different from what's saved in localStorage
      const savedPreferences = JSON.parse(localStorage.getItem('dietaryPreferences') || '[]');
      const hasUnsavedChanges = JSON.stringify(newSelection.sort()) !== JSON.stringify(savedPreferences.sort());
      setHasChanges(hasUnsavedChanges);
      
      return newSelection;
    });
  };

  const handleSaveChanges = () => {
    localStorage.setItem('dietaryPreferences', JSON.stringify(selectedOptions));
    setHasChanges(false);
    // You might want to send this to your backend as well
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-medium">Dietary Options</h1>
        {hasChanges && (
          <button
            onClick={handleSaveChanges}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        )}
      </div>
      
      {dietaryCategories.map((category, index) => (
        <CategorySection 
          key={index} 
          category={category}
          selectedOptions={selectedOptions}
          onOptionToggle={handleOptionToggle}
        />
      ))}
      
      {hasChanges && (
        <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-md shadow-lg">
          You have unsaved changes
        </div>
      )}
    </div>
  );
};

export default DietaryOptions;