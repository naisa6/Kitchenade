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
import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const InventorySideBar = () => {
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
    setLoading(false);
  }, []);

  const initialRender = useRef(true);

  useEffect(() => {
    if (!initialRender.current) {
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
              height: "100000",

              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                height: "100000",

                marginTop: "2%",
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
                sx={{
                  mx: 2,
                  my: 2,
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "50px",
                  marginBottom: "100px",
                }}
              >
                My Inventory
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{
                  mx: 2,
                  display: "flex",
                  justifyContent: "left",
                  fontSize: "16px",
                  marginBottom: "20px",
                }}
              >
                Add Item
              </Typography>

              <TextField
                id={`standard-search`}
                label="Item Name"
                type="search"
                sx={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  textAlign: "center",
                  width: "80%",
                  marginLeft: "10%",
                }}
                onChange={console.log("")}
              />
              <TextField
                id={`standard-search`}
                label="Quantity"
                type="search"
                sx={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  textAlign: "center",
                  width: "80%",
                  marginLeft: "10%",
                }}
                onChange={console.log("")}
              />
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
            </Box>
          </Drawer>
        </Box>
      )}
    </>
  );
};

export default InventorySideBar;
