import React, { useState, useEffect, useContext } from "react";
import { questionStyle } from "../../viewStyles.js";
// Importing Material
import {
  Box,
  FormControlLabel,
  Typography,
  Grid,
  Paper,
  Checkbox,
} from "@material-ui/core";
import DataCollectorContext from "./DataCollectorContext";

const useStyles = questionStyle;

/*BUG: se in due domande diversele possibili risposte
dei radio button sono uguali, allora quando si sceglie la risposta in una domanda, verrà in automatico
selezionata anche nell'altra.*/

function CheckBoxQuestion(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const updateAnswer = useContext(DataCollectorContext);

  const calculateArray = (newChecked) => {
    const choices = props.data.choices;
    let checkedArray = [];
    choices.forEach((choice, ix) => {
      if (newChecked[ix] === true) checkedArray.push(choice);
    });
    return checkedArray;
  };

  //Salva la risposta data
  const changeChecked = (choiceIndex) => {
    console.log("The checked state in checkbox is :", checked);
    let newChecked = [...checked];
    newChecked[choiceIndex] = !newChecked[choiceIndex];
    setChecked(newChecked);
    let answerArray = calculateArray(newChecked);
    console.log("Checkbx answer array is: ", answerArray);
    updateAnswer(props.sectionIndex, props.contentIndex, answerArray);
  };

  useEffect(() => {
    console.log("UseEffect on CheckBox");
    let initialChecked = [];
    let objKeys = [...props.data.choices.keys()];
    objKeys.forEach((key) => {
      initialChecked.push(false);
    });
    setChecked(initialChecked);
    let answerArray = calculateArray(initialChecked);
    console.log("Checkbx answer array is: ", answerArray);
    updateAnswer(props.sectionIndex, props.contentIndex, answerArray);
  }, []);

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

          <Box align="left" className={classes.elementContainer}>
            {props.data.description}
          </Box>

          {props.data.images && (
            <Grid className={classes.grid} container spacing={3}>
              <Grid item>
                {/*Se l'array non è vuoto, allora lo scorre*/}
                {props.data.images.map((img) => (
                  <Paper
                    variant="outlined"
                    className={classes.imagePaperContainer}
                    key={props.data}
                  >
                    {/*loadImage(img) - NON STA PASSANDO LE IMMAGINI STATICHE*/}
                    <img src={props.data.images} width="200px" height="200px" />
                  </Paper>
                ))}
              </Grid>
            </Grid>
          )}
          <div className={classes.spacer}>
            {props.data.choices.map((s, choiceIndex) => (
              <Box
                align="left"
                className={classes.choicesContainer}
                key={s.value}
              >
                <FormControlLabel
                  value={s.value}
                  control={
                    <Checkbox
                      checked={
                        typeof checked[choiceIndex] === "boolean"
                          ? checked[choiceIndex]
                          : false
                      }
                      color="primary"
                      onChange={() => changeChecked(choiceIndex)}
                    />
                  }
                  label={s.value}
                />
              </Box>
            ))}
          </div>
        </Paper>
      </Grid>
    </Typography>
  );
}

export default CheckBoxQuestion;
