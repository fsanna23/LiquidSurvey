import React, { useState, useEffect, useContext } from "react";
import { questionStyle } from "../../viewStyles.js";
// Importing Material
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Input,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
  Select,
  Divider,
  FormControlLabel,
  Switch,
  Tooltip,
} from "@material-ui/core";
import Container from "@material-ui/core/container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import SelectedSurveyContext from "../../SelectedSurveyContext";
const useStyles = questionStyle;


/*BUG: se in due domande diversele possibili risposte
dei radio button sono uguali, allora quando si sceglie la risposta in una domanda, verrà in automatico
selezionata anche nell'altra.*/

function MultipleChoiceQuestion(props){

	const classes = useStyles();

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

            <Grid className={classes.grid} container spacing={3}>
              <Grid item>
                {/*Se l'array non è vuoto, allora lo scorre*/}
                {props.data.images && props.data.images.map((img) => (
                  <Paper
                    variant="outlined"
                    className={classes.imagePaperContainer}
                    key={props.data}
                  >
                    {/*loadImage(img)*/}
                  </Paper>
                ))}
              </Grid>
            </Grid>

            <Box align="left" className={classes.elementContainer}>
              {props.data.description}
            </Box>

            <RadioGroup name="RadioGroup">
              {props.data.choices.map((s) => (
                <Box align="left" className={classes.choicesContainer} key={s.value}>
                  <FormControlLabel
                    value={s.value}
                    control={<Radio color="primary" />}
                    label={s.value}
                  />
                </Box>
              ))}
            </RadioGroup>
          </Paper>
        </Grid>
      </Typography>
    );
}

export default MultipleChoiceQuestion;