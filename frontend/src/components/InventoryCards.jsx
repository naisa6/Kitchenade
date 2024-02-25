import React, { useState, useEffect, useRef } from "react";
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
import Slider from "@mui/material/Slider";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useNavigate } from "react-router-dom";
import { unstable_useNumberInput as useNumberInput } from "@mui/base/unstable_useNumberInput";
import TextField from "@mui/material/TextField";
import { unstable_useForkRef as useForkRef } from "@mui/utils";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import UpDownButtons from "./UpDownButtons";
import axios from "axios";

function InventoryCards({ elt, inventoryDict }) {
  const navigate = useNavigate();
  const Item = styled(Paper)(() => ({
    backgroundColor: "#98d6a9",
    padding: 2,
    textAlign: "center",
    color: "black",
  }));

  let availablePercentage = 0;

  const savePercentage = (inventoryID) => {
    const jason = {
      availability: availablePercentage,
    };
    axios
      .put(`http://localhost:5000/inventory/${inventoryID}`, jason)
      .then((res) => console.log(res))
      .catch((error) => console.log("Error updating: ", error));
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const increaseQuantity = (itemId) => {
    const newQuantity =
      parseInt(document.getElementById("Typography-" + itemId).innerHTML) + 1;
    document.getElementById("Typography-" + itemId).innerHTML = newQuantity;
    const jason = {
      quantity: newQuantity,
    };
    axios
      .put(`http://localhost:5000/inventory/${itemId}`, jason)
      .then((res) => console.log(res))
      .catch((error) => console.log("Error updating: ", error));
  };

  const decreaseQuantity = (itemId) => {
    const newQuantity =
      parseInt(document.getElementById("Typography-" + itemId).innerHTML) - 1;
    document.getElementById("Typography-" + itemId).innerHTML = newQuantity;
    const jason = {
      quantity: newQuantity,
    };
    axios
      .put(`http://localhost:5000/inventory/${itemId}`, jason)
      .then((res) => console.log(res))
      .catch((error) => console.log("Error updating: ", error));
  };

  const handleRecipeClick = () => {
    navigate(`/recipes/${String(elt._id)}`);
  };

  const deleteItem = (inventoryID) => {
    [
      "GridItem-",
      "GridAmount-",
      "GridQuantity-",
      "GridPercentage-",
      "GridDate-",
      "Slider-",
      "GridButton-",
    ].map((idName) => {
      const removal = document.getElementById(idName + inventoryID);
      removal.parentNode.removeChild(removal);
    });

    axios
      .delete(`http://localhost:5000/inventory/${inventoryID}`)
      .then((res) => console.log(res))
      .catch((error) => console.log("Error deleting: ", error));
  };

  return (
    <Card
      key={"card-" + elt}
      sx={{
        border: "1px solid #aaf0d1",
        marginBottom: "10px",
      }}
    >
      <CardContent key={"cardContent-" + elt}>
        <Typography
          key={"cardTypography-" + elt}
          gutterBottom
          variant="h5"
          component="div"
        >
          {elt}
        </Typography>
        <Grid key={"GridContainer-" + elt} container spacing={1} marginTop="2%">
          {inventoryDict[elt].map((item, index) => {
            let dateToDisplay;
            if (item.expiryDate) {
              const dateTest = new Date(item.expiryDate);
              const dateString = dateTest.toISOString();

              const inputDate = new Date(
                Date.UTC(
                  parseInt(dateString.substr(0, 4)), // Year
                  parseInt(dateString.substr(5, 2)) - 1, // Month (0-indexed)
                  parseInt(dateString.substr(8, 2)), // Day
                  parseInt(dateString.substr(11, 2)), // Hours
                  parseInt(dateString.substr(14, 2)), // Minutes
                  parseInt(dateString.substr(17, 2)), // Seconds
                  parseInt(dateString.substr(20, 3)) // Milliseconds
                )
              );

              const options = {
                day: "numeric",
                month: "numeric",
                year: "2-digit",
              };
              dateToDisplay = new Intl.DateTimeFormat("en-GB", options).format(
                inputDate
              );
            }

            let newPercentage = item.availability;

            return (
              <React.Fragment key={"unique-key-" + index}>
                <Grid
                  key={"GridItem-" + index}
                  id={"GridItem-" + item._id}
                  item
                  xs={3}
                >
                  <Typography
                    key={"TypographyItem-" + index}
                    variant="h8"
                    component="div"
                    sx={{
                      textAlign: "left",
                      maxWidth: "100%",
                    }}
                  >
                    {item.item}
                  </Typography>
                </Grid>
                <Grid
                  key={"GridAmount-" + index}
                  id={"GridAmount-" + item._id}
                  item
                  xs={1}
                >
                  <Typography
                    key={"TypographyAmount-" + index}
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textAlign: "left",
                      maxWidth: "100%",
                    }}
                  >
                    {" "}
                    {item.amount ? item.amount + " " + item.unit : ""}
                  </Typography>
                </Grid>

                <Grid
                  key={"GridQuantity-" + index}
                  id={"GridQuantity-" + item._id}
                  item
                  xs={1}
                  sx={{
                    alignContent: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography
                    key={"TypographyQuantity-" + index}
                    id={"Typography-" + item._id}
                    variant="body3"
                    color="text.secondary"
                    sx={{
                      textAlign: "right",
                      maxWidth: "100%",
                    }}
                  >
                    {item.quantity}
                  </Typography>
                </Grid>
                <Grid
                  key={"GridPercentage-" + index}
                  id={"GridPercentage-" + item._id}
                  item
                  xs={1}
                  sx={{ marginTop: "-2%", marginLeft: "-5%" }}
                >
                  <UpDownButtons
                    value={availablePercentage}
                    onIncrease={() => increaseQuantity(item._id)}
                    onDecrease={() => decreaseQuantity(item._id)}
                  />
                </Grid>
                <Grid
                  key={"GridDate-" + index}
                  id={"GridDate-" + item._id}
                  item
                  xs={2}
                >
                  <Typography
                    key={"TypographyDate-" + index}
                    variant="body3"
                    color="text.secondary"
                    sx={{
                      textAlign: "left",
                      maxWidth: "100%",
                    }}
                  >
                    {item.expiryDate ? "Exp: " + dateToDisplay : ""}
                  </Typography>
                </Grid>
                <Grid
                  key={"Slider-" + index}
                  id={"Slider-" + item._id}
                  item
                  xs={2}
                >
                  <Box sx={{ width: 120 }}>
                    <Slider
                      aria-label="Temperature"
                      defaultValue={newPercentage}
                      getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                      shiftStep={30}
                      step={10}
                      marks
                      min={0}
                      max={100}
                      onChange={(e) => {
                        availablePercentage = e.target.value;
                      }}
                      onMouseUp={() => savePercentage(item._id)}
                    />
                  </Box>
                </Grid>

                <Grid
                  key={"GridButton-" + index}
                  id={"GridButton-" + item._id}
                  item
                  xs={2}
                >
                  <IconButton
                    aria-label="add to favorites"
                    sx={{ bottom: "25%", marginLeft: "40%", padding: "1ch" }}
                    onClick={() => deleteItem(item._id)}
                  >
                    <DeleteTwoToneIcon />
                  </IconButton>
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default InventoryCards;
