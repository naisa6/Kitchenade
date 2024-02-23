import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function ImageCarousel({ imagesList, directoryName }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = imagesList.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        flexGrow: 1,
        position: "relative",
      }}
    >
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      ></Paper>

      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {imagesList.map((step, index) => (
          <div key={`wrapper-${index}`}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                key={`box-${index}`}
                component="img"
                sx={{
                  height: 255,
                  display: "block",
                  maxWidth: 400,
                  overflow: "hidden",
                  width: "100%",
                  objectFit: "contain",
                }}
                src={
                  "http://localhost:5000/images/" + directoryName + "/" + step
                }
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: 0,
        }}
      >
        <IconButton
          onClick={handleBack}
          disabled={activeStep === 0}
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
        >
          <NavigateBeforeIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: 0,
        }}
      >
        <IconButton
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
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
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default ImageCarousel;
