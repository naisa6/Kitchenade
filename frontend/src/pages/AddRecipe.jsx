import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import axios from "axios";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Box from "@mui/material/Box";
import { IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import YouTube from "react-youtube";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [dishName, setDishName] = useState("");
  const [course, setCourse] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [serves, setServes] = useState();
  const [ingredients, setIngredients] = useState("1. ");
  const [instructions, setInstructions] = useState("1. ");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");

  const navigate = useNavigate();

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
  const backButton = () => {
    navigate("/recipes");
  };

  const addButton = () => {
    console.log("PRESSED");
    console.log([
      dishName,
      course,
      cuisine,
      prepTime,
      cookTime,
      serves,
      ingredients,
      instructions,
      notes,
      file,
      videoUrl,
    ]);
  };

  const handleTextChange = (e, label) => {
    switch (label) {
      case "Dish name":
        setDishName(e.target.value);
        break;
      case "Course":
        setCourse(e.target.value);
        break;
      case "Cuisine":
        setCuisine(e.target.value);
        break;
      case "Prep Time (Numbers only, in minutes)":
        if (e.target.value == "") {
          setPrepTime(0);
          return;
        }
        setPrepTime(e.target.value);
        break;
      case "Cooking Time (Numbers only, in minutes)":
        if (e.target.value == "") {
          setCookTime(0);
          return;
        }
        setCookTime(e.target.value);
        break;
      case "Serves":
        setServes(e.target.value);
        break;
    }
  };

  const handleIngredientChange = (e) => {
    const ingredientsLength = ingredients.split("\n").length;
    const inputValue = e.target.value;
    const isLastCharNewLine = inputValue.endsWith("\n");
    if (isLastCharNewLine) {
      const lines = e.target.value.split("\n");

      if (lines.length == ingredientsLength) {
        console.log(lines.slice(0, -2));
        setIngredients(lines.slice(0, -1).join("\n"));
        return;
      }
      if (lines[0].substring(0, 2) !== "1.") {
        lines[0] = "1. " + lines[0];
      }
      const numberedLines = lines.filter((elt) => elt != "");
      numberedLines.push(lines.length + ". ");
      console.log(numberedLines);
      const updatedIngredients = numberedLines.join("\n");
      setIngredients(updatedIngredients);
    } else {
      setIngredients(inputValue);
    }
  };

  const handleInstructionChange = (e) => {
    const instructionsLength = instructions.split("\n").length;
    const inputValue = e.target.value;
    const isLastCharNewLine = inputValue.endsWith("\n");
    if (isLastCharNewLine) {
      const lines = e.target.value.split("\n");

      if (lines.length == instructionsLength) {
        console.log(lines.slice(0, -2));
        setInstructions(lines.slice(0, -1).join("\n"));
        return;
      }
      if (lines[0].substring(0, 2) !== "1.") {
        lines[0] = "1. " + lines[0];
      }
      const numberedLines = lines.filter((elt) => elt != "");
      numberedLines.push(lines.length + ". ");
      console.log(numberedLines);
      const updatedInstructions = numberedLines.join("\n");
      setInstructions(updatedInstructions);
    } else {
      setInstructions(inputValue);
    }
  };

  const handleImagePreview = (event) => {
    setFile(event.target.files);
    const input = document.getElementById("imageInput");
    if (input.files && input.files[0]) {
      for (let i = 0; i < input.files.length; i++) {
        const reader = new FileReader();

        reader.onload = function (e) {
          let newDiv = document.createElement("div");
          newDiv.id = input.files[i].name + "-Div";
          newDiv.style.position = "relative";
          document.getElementById("imagePreviews").appendChild(newDiv);

          let newImage = document.createElement("img");
          newImage.id = input.files[i].name;
          newImage.src = e.target.result;
          newImage.alt = "Image Preview";
          newImage.style.width = "100px";
          document
            .getElementById(input.files[i].name + "-Div")
            .appendChild(newImage);

          let xButton = document.createElement("button");
          xButton.id = input.files[i].name + "-XButton";
          xButton.textContent = "X";
          xButton.style.position = "absolute";
          xButton.style.top = "0";
          xButton.style.right = "0";
          xButton.addEventListener("click", () => {
            const previewDiv = document.getElementById(
              input.files[i].name + "-Div"
            );
            if (previewDiv) {
              previewDiv.remove();
            }
          });

          document
            .getElementById(input.files[i].name + "-Div")
            .appendChild(xButton);
        };

        reader.readAsDataURL(input.files[i]);
      }
    }
  };

  const handleVideoUrlChange = (event) => {
    setVideoUrl(event.target.value.split("v=")[1]);
  };

  const getYoutubeEmbedUrl = (url) => {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleAddRecipe = () => {
    console.log("literally", cookTime, prepTime);
    const formData = new FormData();
    formData.append("dishName", dishName);
    formData.append("course", course);
    formData.append("cuisine", cuisine);
    formData.append("prepTime", prepTime);
    formData.append("cookTime", cookTime);
    formData.append("serves", parseInt(serves));
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("notes", notes);
    formData.append("file", file);
    formData.append("videoUrl", videoUrl);
    formData.append("directoryName", dishName + "-" + Date.now());

    for (const entry of formData.entries()) {
      console.log(entry);
    }
    for (let i = 0; i < file.length; i++) {
      formData.append("files", file[i]);
    }
    axios
      .post("http://localhost:5000/recipes/addRecipe", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        navigate("/recipes");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
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
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                textAlign: "center",
                maxWidth: "100%",
                marginRight: "25%",
              }}
            >
              Add Recipe
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{ maxWidth: "100%", marginLeft: "35%", justifyContent: "center" }}
      >
        <Stack spacing={2} sx={{ marginBottom: "5%" }}>
          {[
            "Dish name",
            "Course",
            "Cuisine",
            "Prep Time (Numbers only, in minutes)",
            "Cooking Time (Numbers only, in minutes)",
            "Serves (Numbers only)",
          ].map((elt, index) => (
            <TextField
              id={`standard-search-${elt}`}
              key={index}
              label={elt}
              type="search"
              variant="standard"
              onChange={(e) => handleTextChange(e, elt)}
              sx={{
                textAlign: "center",
                width: "40%",
              }}
            />
          ))}
          <Box sx={{ textAlign: "center", width: "40%" }}>
            <TextField
              id="outlined-multiline-static"
              label="Ingredients"
              multiline
              rows={6}
              value={ingredients}
              onChange={handleIngredientChange}
              sx={{
                textAlign: "center",
                width: "100%",
                marginTop: "10%",
              }}
            />
          </Box>
          <Box sx={{ textAlign: "center", width: "40%" }}>
            <TextField
              id="outlined-multiline-static"
              label="Instructions"
              multiline
              rows={6}
              value={instructions}
              onChange={handleInstructionChange}
              sx={{
                textAlign: "center",
                width: "100%",
                marginTop: "10%",
              }}
            />
          </Box>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ width: "40%" }}
          >
            Upload file
            <VisuallyHiddenInput
              multiple
              id="imageInput"
              accept="image/*"
              type="file"
              onChange={(e) => handleImagePreview(e)}
            />
          </Button>
          <Box id="imagePreviews" sx={{ display: "flex" }}></Box>
          <Box sx={{ textAlign: "center", width: "40%" }}>
            <TextField
              id="outlined-multiline-static"
              label="YouTube Video URL"
              variant="standard"
              onChange={handleVideoUrlChange}
              sx={{
                textAlign: "center",
                width: "100%",
                marginTop: "10%",
              }}
            />
            {videoUrl && (
              <Box sx={{ marginTop: "10%" }}>
                <YouTube
                  videoId={getYoutubeEmbedUrl(videoUrl)}
                  opts={{ width: "100%" }}
                />
              </Box>
            )}
          </Box>
          <TextField
            id="standard-search"
            label="Source URL"
            type="search"
            variant="standard"
            sx={{
              textAlign: "center",
              width: "40%",
            }}
          />
          <Box sx={{ textAlign: "center", width: "40%" }}>
            <TextField
              id="outlined-multiline-static"
              label="Additional Notes"
              multiline
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              sx={{
                textAlign: "center",
                width: "100%",
                marginTop: "10%",
              }}
            />
          </Box>
          <Button
            variant="contained"
            onClick={handleAddRecipe}
            sx={{
              paddingX: 6,
              my: 2,
              borderRadius: 30,
              backgroundColor: "#e7e7e7",
              color: "black",
              maxWidth: "40%",
              ":hover": {
                bgcolor: "#ffffff",
                color: "black",
              },
            }}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default AddRecipe;
