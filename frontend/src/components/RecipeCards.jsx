import React from "react";
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
import { useNavigate } from "react-router-dom";

function RecipeCards({ animal }) {
  const navigate = useNavigate();
  const Item = styled(Paper)(() => ({
    backgroundColor: "#98d6a9",
    padding: 2,
    textAlign: "center",
    color: "black",
  }));

  const handleRecipeClick = () => {
    navigate(`/recipes/${String(animal._id)}`);
  };

  return (
    <>
      <Card
        sx={{ maxWidth: 345 }}
        onClick={() => {
          handleRecipeClick(animal);
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="240"
            image={
              "http://localhost:5000/images/" +
              animal.directoryName +
              "/" +
              animal.image[0]
            }
            alt={"Image"}
          />
          <CardContent
            sx={{ display: "flex", flexDirection: "column", marginTop: "-5%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    textAlign: "left",
                    maxWidth: "100%",
                  }}
                >
                  {animal.dishName}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textAlign: "right",
                    maxWidth: "100%",
                  }}
                >
                  {animal.prepTime
                    ? animal.cookTime
                      ? animal.prepTime + animal.cookTime + " min"
                      : animal.prepTime + " min"
                    : animal.cookTime
                    ? animal.cookTime + " min"
                    : ""}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textAlign: "left",
                    justifyContent: "left",
                    maxWidth: "50%",
                  }}
                >
                  {animal.course ? animal.course : ""}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ justifyContent: "right", textAlign: "right" }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textAlign: "right",
                    justifyContent: "right",
                  }}
                >
                  {animal.cuisine ? animal.cuisine : ""}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
        <Box sx={{ height: "50px", marginTop: "-10%" }}>
          <CardActions
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Button size="small" color="primary">
              Share
            </Button>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Box>
      </Card>
    </>
  );
}

export default RecipeCards;
