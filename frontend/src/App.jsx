import React from "react";
import { Routes, Route } from "react-router-dom";
import Grocery from "./pages/Grocery";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Recipes from "./pages/Recipes";
import AddRecipe from "./pages/AddRecipe";
import RecipePage from "./pages/RecipePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/grocery" element={<Grocery />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipes/addRecipe" element={<AddRecipe />} />
      <Route path="/recipes/:recipeId" element={<RecipePage />} />
    </Routes>
  );
};

export default App;
