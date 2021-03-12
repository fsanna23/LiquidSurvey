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
import DataCollectorContext from "./DataCollectorContext";

const useStyles = questionStyle;


/*BUG: se in due domande diversele possibili risposte
dei radio button sono uguali, allora quando si sceglie la risposta in una domanda, verrà in automatico
selezionata anche nell'altra.*/

function MultipleChoiceQuestion(props){

	const classes = useStyles();
  let tempAnswer = [];
  const [answer, setAnswer] = useState([]);
  const updateAnswer = useContext(DataCollectorContext);

  //Salva la risposta data
  const saveAnswer = answer => (e) => {

    setAnswer(answer);
    updateAnswer(props.sectionIndex, props.contentIndex, answer);
  }


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

            {props.data.images &&
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
            }
            <div className={classes.spacer}>
              <RadioGroup name="RadioGroup">
                {props.data.choices.map((s) => (
                  <Box align="left" className={classes.choicesContainer} key={s.value}>
                    <FormControlLabel
                      value={s.value}
                      control={<Radio color="primary" onChange={saveAnswer(s.value)}/>}
                      label={s.value}
                    />
                  </Box>
                ))}
              </RadioGroup>
            </div>
          </Paper>
        </Grid>
      </Typography>
    );
}

export default MultipleChoiceQuestion;