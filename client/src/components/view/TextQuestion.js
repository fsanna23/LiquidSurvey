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
import DataCollectorContext from "./DataCollectorContext";

const useStyles = questionStyle;

function TextQuestion(props){

  const classes = useStyles();
  const [answer, setAnswer] = useState([]);
  const updateAnswer = useContext(DataCollectorContext);

  const saveAnswer = (e) => {

    setAnswer(e.target.value);
    updateAnswer(props.sectionIndex, props.contentIndex, e.target.value);
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

            <form autoComplete="off">
              <TextField
                className={classes.textField}
                id="standard-textarea"
                label="Type here your answer"
                placeholder="Placeholder"
                multiline
                rowsMax={3}
                onChange={saveAnswer}
              />
            </form>
          </Paper>
        </Grid>
      </Typography>
    );
}

export default TextQuestion;