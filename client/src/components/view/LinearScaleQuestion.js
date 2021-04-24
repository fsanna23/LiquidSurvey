import React, { useState, useEffect, useContext } from "react";
import { questionStyle } from "./viewStyles.js";
// Importing Material
import { Box, FormControlLabel } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";

import DataCollectorContext from "./DataCollectorContext";

const useStyles = questionStyle;

function LinearScaleQuestion(props) {
  const classes = useStyles();
  const [linearScaleSelectedValue, setLinearScaleSelectedValue] = useState("");

  const [answer, setAnswer] = useState([]);
  const updateAnswer = useContext(DataCollectorContext);

  const saveAnswer = (answer) => (e) => {
    console.log("LINEAR ANSW: ", answer);
    setAnswer(answer);
    updateAnswer(props.sectionIndex, props.contentIndex, answer);
  };

  /*---GESTIONE DELLA SELEZIONE NELLA LINEAR SCALE---*/
  const handleLinearScaleChange = (e) => {
    setLinearScaleSelectedValue(e.target.value);
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

          <Box
            align="left"
            fontWeight="fontWeightBold"
            className={classes.elementContainer}
          ></Box>

          <Box display="flex" flexdirection="row">
            <Box className={classes.labelContainer}>
              {props.data.minValueLabel}
            </Box>

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
                      Number(props.data.maxValue) +
                        1 -
                        Number(props.data.minValue)
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
            <Box className={classes.labelContainer}>
              {props.data.maxValueLabel}
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Typography>
  );
}

export default LinearScaleQuestion;
