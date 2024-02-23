import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import NavBar from "../components/NavBar.jsx";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import YouTube from "react-youtube";
import { IconButton, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ImageCarousel from "../components/ImageCarousel.jsx";
import YoutubeEmbed from "../components/YoutubeEmbed.jsx";

const RecipePage = () => {
  const { recipeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState();
  const [dishName, setDishName] = useState("");
  const [course, setCourse] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [prepTime, setPrepTime] = useState();
  const [cookTime, setCookTime] = useState();
  const [serves, setServes] = useState();
  const [ingredients, setIngredients] = useState("1. ");
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [instructionsArray, setInstructionsArray] = useState([]);
  const [instructions, setInstructions] = useState("1. ");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/recipes/${recipeId}`)
      .then((res) => {
        setRecipe(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      setVideoUrl(recipe.videoUrl);
      const ingredientString = JSON.stringify(recipe.ingredients);
      const ingredientArray = ingredientString
        .substring(2, ingredientString.length - 2)
        .split("\\r\\n");

      setIngredientsArray(ingredientArray);
      const instructionString = JSON.stringify(recipe.instructions);
      const instructionArray = instructionString
        .substring(2, instructionString.length - 2)
        .split("\\r\\n");

      setInstructionsArray(instructionArray);
    }
  }, [recipe]);

  const backButton = () => {
    navigate("/recipes");
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <NavBar sx={{ zIndex: 2 }} />
          <Box sx={{ marginTop: "10%", marginLeft: "10%" }}>
            <Grid container spacing={2}>
              <Grid item xs={1}>
                <IconButton aria-label="add to favorites" onClick={backButton}>
                  <NavigateBeforeIcon
                    sx={{
                      backgroundColor: "grey",
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      ":hover": {
                        backgroundColor: "black",
                        color: "white",
                      },
                    }}
                  />
                </IconButton>
              </Grid>
              <Grid item xs={11} sx={{ justifyContent: "center" }}>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      textAlign: "center",
                      maxWidth: "100%",
                      marginRight: "25%",
                    }}
                  >
                    {recipe.dishName}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              maxWidth: "100%",
              marginLeft: "35%",
              justifyContent: "center",
            }}
          >
            <Stack spacing={2} sx={{ marginBottom: "5%" }}>
              {recipe.image ? (
                <ImageCarousel
                  imagesList={recipe.image}
                  directoryName={recipe.directoryName}
                />
              ) : null}

              <Grid container spacing={2} sx={{ maxWidth: "40%" }}>
                {[
                  { label: "", value: recipe.course },
                  { label: "", value: recipe.cuisine },
                  { label: "Prep Time: ", value: recipe.prepTime },
                  { label: "Cook Time: ", value: recipe.cookTime },
                  { label: "Serves: ", value: recipe.serves },
                ].map((elt, index) => (
                  <Grid
                    item
                    xs={6}
                    key={index}
                    sx={{
                      textAlign: index % 2 === 0 ? "left" : "right",
                      maxWidth: "100%",
                      marginLeft: index % 2 === 0 ? "-5%" : "5%",
                    }}
                  >
                    {loading ? (
                      <div>Loading...</div>
                    ) : (
                      <Typography variant="body2" component="div">
                        {elt.value
                          ? index == 2 || index == 3
                            ? elt.label + elt.value + " min"
                            : elt.label + elt.value
                          : ""}
                      </Typography>
                    )}
                  </Grid>
                ))}
              </Grid>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textAlign: "center",
                  maxWidth: "40%",
                }}
              >
                Ingredients
              </Typography>
              {ingredientsArray.map((elt, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  component="div"
                  sx={{
                    textAlign: "left",
                    maxWidth: "40%",
                    marginRight: "25%",
                  }}
                >
                  {elt}
                </Typography>
              ))}
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textAlign: "center",
                  maxWidth: "40%",
                }}
              >
                Instructions
              </Typography>
              {instructionsArray.map((elt, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  component="div"
                  sx={{
                    textAlign: "left",
                    maxWidth: "40%",
                    marginRight: "25%",
                  }}
                >
                  {elt}
                </Typography>
              ))}
              {recipe.videoUrl ? (
                <Box marginBottom={"10%"}>
                  <YoutubeEmbed embedId={videoUrl} />
                </Box>
              ) : null}
              {recipe.source ? (
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    textAlign: "center",
                    maxWidth: "40%",
                    marginRight: "25%",
                  }}
                >
                  {recipe.source}
                </Typography>
              ) : null}
              {recipe.notes ? (
                <>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      textAlign: "left",
                      maxWidth: "40%",
                    }}
                  >
                    Additional Notes
                  </Typography>

                  <Typography
                    variant="body2"
                    component="div"
                    sx={{
                      textAlign: "left",
                      maxWidth: "40%",
                      marginRight: "25%",
                    }}
                  >
                    {recipe.notes}
                  </Typography>
                </>
              ) : null}
            </Stack>
          </Box>
        </Box>
      )}
    </>
  );
};

export default RecipePage;
