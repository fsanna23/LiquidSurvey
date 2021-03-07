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
import TextQuestion from "./TextQuestion.js";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion.js";
import RankingQuestion from "./RankingQuestion.js";
import DataCollectorContext from "./DataCollectorContext";

const useStyles = questionStyle;

function LinearScaleQuestion(props) {
  const classes = useStyles();
  const [linearScaleSelectedValue, setLinearScaleSelectedValue] = useState("");
  
  const [answer, setAnswer] = useState([]);
  const updateAnswer = useContext(DataCollectorContext);

  const saveAnswer = answer => (e) => {

    console.log("LINEAR ANSW: ", answer)
    setAnswer(answer);
  }

  //ogni volta che cambia la risposta, la passa a JsonLoader per salvarla
  useEffect(() => {

    updateAnswer(answer, props.contentIndex, props.sectionIndex);

  }, [answer])


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
          >
          </Box>
          
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
