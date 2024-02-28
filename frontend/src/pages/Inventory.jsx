import React, { useState, useEffect, useCallback } from "react";
import NavBar from "../components/NavBar.jsx";
import InventorySideBar from "../components/InventorySideBar.jsx";
import InventoryCards from "../components/InventoryCards.jsx";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const Inventory = () => {
  const [loading, setLoading] = useState(true);
  const [inventoryDict, setInventoryDict] = useState([]);
  const [inventorySection, setInventorySection] = useState([]);
  const [user, setUser] = useState("65d8843652572f9bda40ab76");
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    setForceRender((prev) => !prev);
  }, [inventorySection]);

  useEffect(() => {
    let tempDict = {};
    axios
      .get(`http://localhost:5000/users/${user}`)
      .then((response) => {
        setInventorySection(response.data.inventorySection);
        const inventoryPromises = response.data.inventorySection.map(
          (section) =>
            axios
              .get(
                `http://localhost:5000/inventory/getUserInventory/${user}/${section}`
              )
              .then((response) => {
                tempDict[section] = response.data;
              })
              .catch((error) => {
                console.log(`ERROR inventory (${section}):`, error);
                return null;
              })
        );
        Promise.all(inventoryPromises)
          .then((inventoryData) => {
            setInventoryDict(tempDict);
            setLoading(false);
          })
          .catch((error) => console.log("ERROR Promise.all:", error));
      })
      .catch((error) => console.log("ERROR section:", error));
  }, []);

  useEffect(() => {
    console.log(inventoryDict);
    console.log(inventorySection);
    console.log("changed");
  }, [inventoryDict]);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      // Check if inventorySection[dragIndex] is defined
      if (inventorySection[dragIndex] === undefined) {
        console.log("ITEM undefined");
        return;
      }

      const listItem = inventorySection[dragIndex];
      const newInventorySection = [...inventorySection];
      newInventorySection.splice(dragIndex, 1); // Remove the dragged item
      newInventorySection.splice(hoverIndex, 0, listItem); // Insert the item at the new position

      setInventorySection(newInventorySection);
    },
    [inventorySection]
  );
  useEffect(() => {
    console.log("change");
  }, [inventorySection]);

  const renderCard = useCallback(
    (elt, index) => {
      console.log("ITERATE", elt, index, inventoryDict);

      if (!inventoryDict || Object.keys(inventoryDict).length === 0) {
        console.log("No data or data is still loading");
        return <div>Loading or No data</div>;
      }

      return (
        <InventoryCards
          elt={elt}
          id={elt + index}
          index={index}
          inventoryDict={inventoryDict}
          key={index}
          moveCard={moveCard}
          sx={{
            border: "1px solid #aaf0d1",
            marginBottom: "10px",
            "&:hover": {
              cursor: "move",
            },
          }}
        />
      );
    },
    [inventorySection, inventoryDict, forceRender]
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <NavBar
        func={(data) => searchFilter(data)}
        sx={{ position: "relative", zIndex: 2 }}
      />
      {loading ? (
        <div>Loading</div>
      ) : (
        <InventorySideBar
          addItemToPage={(data) => {
            setInventoryDict((prevDict) => {
              const updatedDict = { ...prevDict };
              if (data.section in updatedDict) {
                updatedDict[data.section] = [
                  ...updatedDict[data.section],
                  data,
                ];
              } else {
                updatedDict[data.section] = [data];
              }
              return updatedDict;
            });
          }}
          addSectionToPage={(data) => {
            setInventorySection((prevDict) => {
              return [...prevDict, data];
            });
            setInventoryDict((prevDict) => {
              return { ...prevDict, [data]: [] };
            });
          }}
          inventorySection={inventorySection}
          sx={{ position: "relative", zIndex: 1 }}
        />
      )}
      {loading ? (
        <div>Loading</div>
      ) : (
        <Box
          key={"Unique"}
          sx={{
            marginLeft: { xs: "40%", sm: "35%", md: "25%", lg: "20%" },
            width: { xs: "50%", sm: "60%", md: "70%", lg: "75%" },
            marginTop: { xs: "25%", sm: "15%", md: "9%", lg: "7%" },
          }}
        >
          {loading ? (
            <div>Loading</div>
          ) : (
            <div style={{ cursor: "grab" }}>
              {inventorySection.map((elt, index) => renderCard(elt, index))}
            </div>
          )}
        </Box>
      )}
    </Box>
  );
};
export default Inventory;
