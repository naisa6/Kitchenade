import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import RecipeSideBar from "../components/RecipeSideBar.jsx";
import axios from "axios";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import RecipeCards from "../components/RecipeCards.jsx";
import { Recipe } from "../../../backend/models/recipeModel.js";

const Recipes = () => {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [cuisineOptions, setCuisineOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [optionsDict, setOptionsDict] = useState({
    Cuisine: [],
    Course: [],
    "Time Required": [],
    Availability: [],
  });

  const Item = styled(Paper)(() => ({
    backgroundColor: "#98d6a9",
    padding: 8,
    textAlign: "center",
    color: "black",
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/recipes");
        setAllRecipes(response.data.data.reverse());
        setRecipes(response.data.data.reverse());

        let cuisineList = [];
        let courseList = [];

        response.data.data.forEach((recipe) => {
          if (recipe.cuisine && !cuisineList.includes(recipe.cuisine)) {
            cuisineList.push(recipe.cuisine);
          }
          if (recipe.course && !courseList.includes(recipe.course)) {
            courseList.push(recipe.course);
          }
        });

        setCuisineOptions(cuisineList);
        setCourseOptions(courseList);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("TEST", optionsDict);
    let tempArray = [];
    let conditions = [];
    let filtered = false;
    let bool = false;
    let sort = false;
    Object.keys(optionsDict).forEach((key) => {
      if (optionsDict[key].length > 0) {
        conditions.push(key);
        console.log("conditions", conditions);
      }
    });

    for (let i = 0; i < allRecipes.length; i++) {
      filtered = true;
      console.log("BEGIN", tempArray);
      bool = true;
      conditions.forEach((condition) => {
        if (condition == "Sort") {
          sort = true;
        } else if (condition == "Search") {
          const dishName = allRecipes[i]["dishName"].toLowerCase();
          const ingredientsString = allRecipes[i]["ingredients"]
            .join()
            .toLowerCase();
          const searchTerm = optionsDict[condition].toLowerCase();

          if (
            dishName.indexOf(searchTerm) == -1 &&
            ingredientsString.indexOf(searchTerm) == -1
          ) {
            bool = false;
          }
        } else if (bool && condition == "Time Required") {
          const combinedTime =
            allRecipes[i]["prepTime"] + allRecipes[i]["cookTime"];
          switch (optionsDict[condition][0]) {
            case "< 30 min":
              if (combinedTime >= 30) {
                console.log(allRecipes[i].dishName);
                bool = false;
              }
              break;
            case "30 min ~ 1 hr":
              if (combinedTime < 30 || combinedTime > 60) {
                bool = false;
              }
              break;
            case "1 hr+":
              if (combinedTime <= 60) {
                bool = false;
              }
              break;
            case "Any":
              break;
          }
          console.log("testing2", allRecipes[i], condition, bool);
        } else {
          if (
            bool &&
            !optionsDict[condition].includes(
              allRecipes[i][condition.toLowerCase()]
            )
          ) {
            bool = false;
            console.log("testing3", allRecipes[i], condition, bool);
          }
        }
      });
      if (bool == true) {
        console.log("testing6", allRecipes[i], "true");
        tempArray.push(allRecipes[i]);
      } else {
        console.log("testing6", allRecipes[i], "false");
        tempArray.filter((elt) => allRecipes[i]._id != elt._id);
      }
      console.log("testing4", allRecipes[i], bool);
      console.log("testing5 iteration: ", i, tempArray);
      bool = false;
    }

    if (sort) {
      if (optionsDict["Sort"][0] == "Recently Added") {
        const sortedItems = tempArray.slice().sort(compareDates);
        setRecipes(sortedItems);
      } else if (optionsDict["Sort"][0] == "Time Required") {
        console.log("SORT", sort, optionsDict);
        const sortedItems = tempArray
          .slice()
          .sort(
            (a, b) =>
              a["prepTime"] + a["cookTime"] - (b["prepTime"] + b["cookTime"])
          );
        console.log("SORTED!!!", sortedItems);
        setRecipes(sortedItems);
      }
    } else if (filtered) {
      setRecipes(tempArray);
    }
  }, [optionsDict]);

  const handleSidebarData = (data, dataData) => {
    console.log("Data received from RecipeSideBar:", data);
    setOptionsDict(data);
  };

  const searchFilter = (data) => {
    setOptionsDict((prevData) => {
      return {
        ...prevData,
        Search: data,
      };
    });
  };

  const compareDates = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateA - dateB;
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar
        func={(data) => searchFilter(data)}
        sx={{ position: "relative", zIndex: 2 }}
      />
      {loading ? (
        <div>Loading</div>
      ) : (
        <RecipeSideBar
          cuisineOptions={cuisineOptions}
          courseOptions={courseOptions}
          onSidebarData={handleSidebarData}
          sx={{ position: "relative", zIndex: 1 }}
        />
      )}

      <Box
        sx={{ marginLeft: "10%", marginTop: 4, flexGrow: 1, maxWidth: "60%" }}
      >
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ my: 4 }}
          columns={12}
        >
          {loading ? (
            <div>Loading</div>
          ) : (
            recipes.map((elt, index) => (
              <Grid key={index} item xs={6}>
                <RecipeCards key={index} animal={elt} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Recipes;
