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
const useStyles = questionStyle;

function RankingQuestion(props){

  const classes = useStyles();

  const [choices, setChoices] = useState(props.data.choices);

  return (
      <Typography component={"span"}>
        <Grid>
          <Paper
            variant="outlined"
            width={400}
            component="div"
            className={classes.wrapper}
          >
            <div>
              <Box align="left" className={classes.titleContainer}>
                {props.data.title}
              </Box>

              <Box align="left" className={classes.elementContainer}>
                {props.data.description}
              </Box>

              <DragDropContext
                onDragEnd={(param) => {

                  //Indici dei due elementi da scambiare
                  const srcIndex = param.source.index;
                  const destIndex = param.destination?.index;

                  let newList = [...choices]; //Copia dell'array di scelte da ordinare
                  const [reorderList] = newList.splice(
                    srcIndex,
                    1
                  ); //si rimuove l'indice sorgente dal nuovo array
                  newList.splice(destIndex, 0, reorderList); //si riaggiunge l'indice nell'array nella nuova posizione
                  console.log("The new list is", newList);
                  setChoices(newList);
                }}
              >
                <Droppable droppableId="1">
                  {(provided, _) => (
                    <div
                      className={classes.rankingContainer}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {choices.map((item, i) => (
                        <Draggable
                          key={item + i}
                          index={i}
                          draggableId={"draggable-" + item.id}
                        >
                          {(provided, snapshot) => (
                            <Card
                              className={classes.dragndropItem}
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                            >
                              <CardContent>
                                <DragHandleIcon
                                  className={classes.dragHandleIcon}
                                />
                                <div className={classes.rankingCardContent}>
                                  {item.value}
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </Paper>
        </Grid>
      </Typography>
    );
}

export default RankingQuestion;