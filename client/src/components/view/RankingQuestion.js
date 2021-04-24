import React, { useState, useEffect, useContext } from "react";
import { questionStyle } from "./viewStyles.js";
// Importing Material
import { Box, Card, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import DataCollectorContext from "./DataCollectorContext";

const useStyles = questionStyle;

function RankingQuestion(props) {
  const classes = useStyles();
  const updateAnswer = useContext(DataCollectorContext);
  const [choices, setChoices] = useState(props.data.choices);

  useEffect(() => {
    // Sends the answers with their initial state
    console.log("Update answer ranking question running");
    updateAnswer(props.sectionIndex, props.contentIndex, props.data.choices);
  }, []);

  return (
    <Typography component={"span"}>
      {console.log("Running return for Ranking")}
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
                const [reorderList] = newList.splice(srcIndex, 1); //si rimuove l'indice sorgente dal nuovo array
                newList.splice(destIndex, 0, reorderList); //si riaggiunge l'indice nell'array nella nuova posizione
                setChoices(newList);
                updateAnswer(props.sectionIndex, props.contentIndex, newList);
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
                        key={"draggable-" + item.id}
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
