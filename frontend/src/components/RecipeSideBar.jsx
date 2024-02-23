import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { IconButton, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const RecipeSideBar = ({ cuisineOptions, courseOptions, onSidebarData }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cuisine, setCuisine] = useState();
  const [course, setCourse] = useState();
  const [optionsDict, setOptionsDict] = useState({
    Cuisine: [],
    Course: [],
    "Time Required": [],
    Availability: [],
  });
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Filter Checkbox" } };

  useEffect(() => {
    setCourse(courseOptions);
    setCuisine(cuisineOptions);
    setLoading(false);
  }, []);

  const initialRender = useRef(true);

  useEffect(() => {
    if (!initialRender.current) {
      onSidebarData(optionsDict);
    } else {
      initialRender.current = false;
    }
  }, [optionsDict]);

  const handleButtonClick = (filterOption, text) => {
    let newCheckedItems = checkedItems;
    if (filterOption == "Time Required" || filterOption == "Sort") {
      setOptionsDict((prevOptions) => ({
        ...prevOptions,
        [filterOption]: [text],
      }));
      return;
    }
    if (checkedItems.includes(text)) {
      newCheckedItems = checkedItems.filter((item) => item !== text);
      setOptionsDict((prevOptions) => ({
        ...prevOptions,
        [filterOption]: prevOptions[filterOption].filter(
          (item) => item !== text
        ),
      }));
    } else {
      newCheckedItems = [...checkedItems, text];
      setOptionsDict((prevOptions) => ({
        ...prevOptions,
        [filterOption]: [...prevOptions[filterOption], text],
      }));
    }
    setCheckedItems(newCheckedItems);
  };

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                // marginTop: "68.5px",
                zIndex: 1,
              },
            }}
            variant="permanent"
          >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ mx: 2, my: 2, display: "flex", justifyContent: "center" }}
              >
                Recipes
              </Typography>
              <Box textAlign="center">
                <Button
                  variant="contained"
                  sx={{
                    paddingX: 6,
                    my: 2,
                    borderRadius: 30,
                    backgroundColor: "#e7e7e7",
                    color: "black",
                    ":hover": {
                      bgcolor: "#ffffff",
                      color: "black",
                    },
                  }}
                  onClick={() => navigate("/recipes/addRecipe")}
                >
                  Add
                </Button>
              </Box>
              <Typography
                variant="h7"
                component="div"
                sx={{
                  mx: 2,
                  my: 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Sort
              </Typography>

              <FormControl
                sx={{
                  marginTop: "-5%",
                  marginLeft: "15%",
                  marginBottom: "5%",
                }}
              >
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Recently Added"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="Recently Added"
                    control={<Radio />}
                    label={
                      <span style={{ fontSize: "14px" }}>Recently Added</span>
                    }
                    onClick={() => handleButtonClick("Sort", "Recently Added")}
                  />
                  <FormControlLabel
                    value="Time Required"
                    control={<Radio />}
                    label={
                      <span style={{ fontSize: "14px" }}>
                        {"Time Required"}
                      </span>
                    }
                    onClick={() => handleButtonClick("Sort", "Time Required")}
                  />
                </RadioGroup>
              </FormControl>
              <Divider />
              <Typography
                variant="h7"
                component="div"
                sx={{
                  mx: 2,
                  my: 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Filters
              </Typography>
              {["Cuisine", "Course"].map((filterOption, index) => {
                let optionList = [];
                switch (filterOption) {
                  case "Cuisine":
                    optionList = cuisine;
                    break;
                  case "Course":
                    optionList = course;

                    break;
                }

                return (
                  <div key={index}>
                    <Divider />
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{
                        mx: 2,
                        display: "flex",
                        justifyContent: "left",
                        fontSize: "16px",
                      }}
                    >
                      {filterOption}
                    </Typography>

                    <List>
                      {optionList.map((text, index) => (
                        <ListItem key={text} sx={{ maxHeight: "36px" }}>
                          <ListItemButton
                            onClick={() =>
                              handleButtonClick(filterOption, text)
                            }
                            sx={{ maxHeight: "36px" }}
                          >
                            <Checkbox checked={checkedItems.includes(text)} />
                            <ListItemText
                              primary={text}
                              primaryTypographyProps={{ fontSize: "14px" }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                    <Divider />
                  </div>
                );
              })}
              <Typography
                variant="body2"
                component="div"
                sx={{
                  mx: 2,
                  display: "flex",
                  justifyContent: "left",
                  fontSize: "16px",
                }}
              >
                Time Required
              </Typography>

              <FormControl
                sx={{
                  marginTop: "5%",
                  marginLeft: "15%",
                  marginBottom: "5%",
                }}
              >
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Any"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="< 30 min"
                    control={<Radio />}
                    label={
                      <span style={{ fontSize: "14px" }}>{"< 30 min"}</span>
                    }
                    onClick={() =>
                      handleButtonClick("Time Required", "< 30 min")
                    }
                  />
                  <FormControlLabel
                    value="30 min ~ 1 hr"
                    control={<Radio />}
                    label={
                      <span style={{ fontSize: "14px" }}>30 min ~ 1 hr</span>
                    }
                    onClick={() =>
                      handleButtonClick("Time Required", "30 min ~ 1 hr")
                    }
                  />
                  <FormControlLabel
                    value="1 hr+"
                    control={<Radio />}
                    label={<span style={{ fontSize: "14px" }}>1 hr+</span>}
                    onClick={() => handleButtonClick("Time Required", "1 hr+")}
                  />
                  <FormControlLabel
                    value="Any"
                    control={<Radio />}
                    label={<span style={{ fontSize: "14px" }}>Any</span>}
                    onClick={() => handleButtonClick("Time Required", "Any")}
                  />
                </RadioGroup>
              </FormControl>
              <Divider />
              <Typography
                variant="body2"
                component="div"
                sx={{
                  mx: 2,
                  display: "flex",
                  justifyContent: "left",
                  fontSize: "16px",
                }}
              >
                Availability
              </Typography>

              <List>
                <ListItem key={"Available"} sx={{ maxHeight: "36px" }}>
                  <ListItemButton
                    onClick={() =>
                      handleButtonClick("Availability", "Available")
                    }
                    sx={{ maxHeight: "36px" }}
                  >
                    <Checkbox checked={checkedItems.includes("Available")} />
                    <ListItemText
                      primary={"Available"}
                      primaryTypographyProps={{ fontSize: "14px" }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
              <Divider />
            </Box>
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          ></Box>
        </Box>
      )}
    </>
  );
};

export default RecipeSideBar;
