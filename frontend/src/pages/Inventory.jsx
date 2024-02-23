import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import InventorySideBar from "../components/InventorySideBar.jsx";
import axios from "axios";
const Inventory = () => {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar
        func={(data) => searchFilter(data)}
        sx={{ position: "relative", zIndex: 2 }}
      />
      {loading ? (
        <div>Loading</div>
      ) : (
        <InventorySideBar sx={{ position: "relative", zIndex: 1 }} />
      )}
    </Box>
  );
};
export default Inventory;
