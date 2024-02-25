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
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTime } from "luxon";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const currencies = [
  {
    value: "none",
    label: "",
  },
  {
    value: "mg",
    label: "mg",
  },
  {
    value: "g",
    label: "g",
  },
  {
    value: "kg",
    label: "kg",
  },
  {
    value: "mL",
    label: "mL",
  },
  {
    value: "L",
    label: "L",
  },
];

const InventorySideBar = ({
  inventorySection,
  addItemToPage,
  addSectionToPage,
}) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [cuisine, setCuisine] = useState();
  const [course, setCourse] = useState();
  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState();
  const [user, setUser] = useState("65d8843652572f9bda40ab76");
  const [section, setSection] = useState("");
  const [newSection, setNewSection] = useState("");
  const [expirationDate, setExpirationDate] = useState(null);

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

  // const initialRender = useRef(true);

  // useEffect(() => {
  //   if (!initialRender.current) {
  //   } else {
  //     initialRender.current = false;
  //   }
  // }, [optionsDict]);

  const handleSection = (event) => {
    setSection(event.target.value);
  };

  const handleAmount = (e) => {
    try {
      const value = parseInt(e.target.value);
      if (value >= 0) {
        setAmount(value);
      } else {
        setAmount("");
      }
    } catch (error) {
      setAmount("");
    }
  };

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

  const addItem = () => {
    console.log(
      "items to add ",
      user,
      itemName,
      amount,
      unit,
      quantity,
      section,
      expirationDate
    );

    const today = DateTime.now().setZone("Pacific/Auckland");

    const jason = {
      user: user,
      section: section,
      item: itemName,
      amount: amount,
      unit: unit,
      quantity: quantity,
      availability: 100,
      purchaseDate: today,
      expiryDate: expirationDate,
    };
    setSection("");
    setItemName("");
    setAmount();
    setUnit("");
    setQuantity(1);
    setExpirationDate(null);

    addItemToPage(jason);

    console.log(jason);

    axios
      .post(`http://localhost:5000/inventory/addItem`, jason)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const addSection = () => {
    const jason = {
      inventorySection: newSection,
    };
    addSectionToPage(newSection);
    // inventorySection.push(newSection);
    axios
      .put(`http://localhost:5000/users/${user}`, jason)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    console.log(jason);
    setNewSection("");
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
                  marginTop: "20px",
                  marginBottom: "20%",
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
                id={`standard-search-item`}
                label="Item Name"
                type="search"
                value={itemName}
                sx={{
                  marginTop: "5px",
                  marginBottom: "0px",
                  textAlign: "center",
                  width: "80%",
                  marginLeft: "10%",
                }}
                onChange={(e) => setItemName(e.target.value)}
              />
              <Grid container spacing={0}>
                <Grid item xs={7}>
                  <TextField
                    id={`standard-search-amount`}
                    label="Amount"
                    type="search"
                    sx={{
                      marginBottom: "5px",
                      textAlign: "center",
                      width: "80%",
                      marginLeft: "17%",
                      marginTop: "5.5%",
                    }}
                    value={amount || ""}
                    onChange={(e) => {
                      handleAmount(e);
                    }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": {
                        m: 1,
                        width: "8ch",
                        height: "2ch",
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        defaultValue=""
                        onChange={(e) => setUnit(e.target.value)}
                      >
                        {currencies.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={option.value}
                            sx={{ lineHeight: "12px" }}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </Box>
                </Grid>
              </Grid>
              <TextField
                id="outlined-number"
                label="Quantity"
                type="number"
                sx={{
                  marginTop: "5px",
                  marginBottom: "4%",
                  textAlign: "center",
                  width: "80%",
                  marginLeft: "10%",
                }}
                value={quantity}
                onChange={(e) =>
                  e.target.value < 1 ? 1 : setQuantity(e.target.value)
                }
              />
              {loading ? (
                console.log(
                  "STILL LOADING ",
                  inventorySection
                )(<div>Loading</div>)
              ) : (
                <Box sx={{ marginLeft: "10%", width: "80%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Section
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={section}
                      label="Section"
                      onChange={handleSection}
                    >
                      {inventorySection.map((elt, index) => (
                        <MenuItem key={index} value={elt}>
                          {elt}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box container="true" components={["DatePicker"]}>
                  <DatePicker
                    label="Expiration Date"
                    format="DD-MM-YYYY"
                    value={expirationDate}
                    sx={{ width: "80%", marginLeft: "10%", marginTop: "3.5%" }}
                    onChange={(e) => setExpirationDate(e.$d)}
                  />
                </Box>
              </LocalizationProvider>
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
                  onClick={addItem}
                >
                  Add
                </Button>
              </Box>
              <Divider sx={{ marginTop: "5%", marginBottom: "5%" }} />
              <Typography
                variant="body2"
                component="div"
                sx={{
                  mx: 2,
                  display: "flex",
                  justifyContent: "left",
                  fontSize: "16px",
                  marginTop: "10%",
                  marginBottom: "20px",
                }}
              >
                Add Section
              </Typography>

              <TextField
                id={`standard-search-section`}
                label="Section Name"
                input={newSection}
                value={newSection}
                type="search"
                sx={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  textAlign: "center",
                  width: "80%",
                  marginLeft: "10%",
                }}
                onChange={(e) => setNewSection(e.target.value)}
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
                  onClick={() => addSection()}
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
