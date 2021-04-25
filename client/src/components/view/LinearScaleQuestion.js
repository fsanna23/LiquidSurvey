import React, { useState, useEffect, useContext } from "react";
import { questionStyle } from "./viewStyles.js";
// Importing Material
import {
  Box,
  Container,
  FormControlLabel,
  Typography,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormControl,
  Slider,
} from "@material-ui/core";

import DataCollectorContext from "./DataCollectorContext";

const useStyles = questionStyle;

function LinearScaleQuestion(props) {
  const classes = useStyles();
  const [linearScaleSelectedValue, setLinearScaleSelectedValue] = useState("");
  const [sliderValue, setSliderValue] = useState(0);

  const [answer, setAnswer] = useState([]);
  const updateAnswer = useContext(DataCollectorContext);

  // Linear scale new features
  const { continuousSwitch, radioBtnSwitch, horizontalSwitch } = props.data;

  const saveAnswer = (answer) => (e) => {
    console.log("LINEAR ANSW: ", answer);
    setAnswer(answer);
    updateAnswer(props.sectionIndex, props.contentIndex, answer);
  };

  /*---GESTIONE DELLA SELEZIONE NELLA LINEAR SCALE---*/
  const handleLinearScaleChange = (e) => {
    setLinearScaleSelectedValue(e.target.value);
  };

  const handleSlider = (e, newValue) => {
    setSliderValue(newValue);
  };

  const renderSlider = (continuous) => {
    const marks = [
      {
        value: Number(props.data.minValue),
        label: props.data.minValueLabel,
      },
      {
        value: Number(props.data.maxValue),
        label: props.data.maxValueLabel,
      },
    ];

    return (
      <Container>
        <Box component="div">
          <Slider
            value={sliderValue}
            onChange={handleSlider}
            step={continuous === true ? 0.001 : 1}
            min={Number(props.data.minValue)}
            max={Number(props.data.maxValue)}
            marks={marks}
          />
        </Box>
        <Box component="div">
          <Typography>The value is: {sliderValue}</Typography>
        </Box>
      </Container>
    );
  };

  /*  TODO: check if correct cause not made by me */
  const renderHorizontalRadioButtons = () => {
    return (
      <Box display="flex" flexdirection="row">
        <Box className={classes.labelContainer}>{props.data.minValueLabel}</Box>

        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="gender"
            name="LinearScale"
            value={linearScaleSelectedValue}
            onChange={handleLinearScaleChange}
          >
            {/*Creazione del range della LinearScale dati minValue e maxValue*/}
            {
              //Number converte una stringa in un numero
              [
                ...Array(
                  Number(props.data.maxValue) + 1 - Number(props.data.minValue)
                ).keys(),
              ].map((s, i) => {
                return (
                  <FormControlLabel
                    value={Number(props.data.minValue) + i}
                    control={
                      <Radio
                        onChange={saveAnswer(s + 1)}
                        checked={
                          linearScaleSelectedValue ===
                          (Number(props.data.minValue) + i).toString()
                        }
                        color="primary"
                      />
                    }
                    label={Number(props.data.minValue) + i}
                    labelPlacement="top"
                    key={s}
                  />
                );
              })
            }
          </RadioGroup>
        </FormControl>
        <Box className={classes.labelContainer}>{props.data.maxValueLabel}</Box>
      </Box>
    );
  };

  const renderVerticalRadioButtons = () => {
    return <Typography>Rendering vertical radio buttons</Typography>;
  };

  return (
    <Typography component={"span"} color="textPrimary" align="center">
      <Grid>
        <Paper
          variant="outlined"
          width={400}
          component="div"
          className={classes.wrapper}
        >
          <Box align="left" className={classes.titleContainer}>
            {props.data.title}
          </Box>

          {(continuousSwitch === false || continuousSwitch === undefined) &&
            renderSlider(true)}

          {continuousSwitch === true &&
            (radioBtnSwitch === false || radioBtnSwitch === undefined) &&
            renderSlider(false)}

          {radioBtnSwitch === true &&
            (horizontalSwitch === false || horizontalSwitch === undefined) &&
            renderHorizontalRadioButtons()}

          {horizontalSwitch === true && renderVerticalRadioButtons()}
        </Paper>
      </Grid>
    </Typography>
  );
}

export default LinearScaleQuestion;
