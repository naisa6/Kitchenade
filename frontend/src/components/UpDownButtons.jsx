import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

const UpDownButtons = ({ value, onIncrease, onDecrease }) => {
  const containerStyle = { display: "flex", flexDirection: "column" };
  const buttonStyle = { padding: "0px", margin: "0px" }; // Adjust padding and margin values as needed

  return (
    <div style={containerStyle}>
      <IconButton
        aria-label="increase"
        onClick={onIncrease}
        style={buttonStyle}
      >
        <ArrowDropUpRoundedIcon />
      </IconButton>
      <IconButton
        aria-label="decrease"
        onClick={onDecrease}
        style={buttonStyle}
      >
        <ArrowDropDownRoundedIcon />
      </IconButton>
    </div>
  );
};

export default UpDownButtons;
