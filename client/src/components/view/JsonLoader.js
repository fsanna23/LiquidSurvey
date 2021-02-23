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

//Componente che si occupa di prelevare i dati dal Json importato, per ogni tipo di domanda prende le informazioni presenti
//e le formatta in modo che siano pronte alla visualizzazione (che avverrà passando il componente a View)
function JsonLoader(props) {
  const [currentPage, setCurrentPage] = useState(0);

  /*[ES6] action è il parametro passato (indica se l'utente vuole andare alla prossima pagina (1) o quella precedente (0)), 
	'e' è l'event object ritornato*/
  const handlePaging = (action) => (e) => {
    if (action) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const classes = useStyles();
  const jsonData = useContext(SelectedSurveyContext);

  useEffect(() => {
    console.log("The json data is", jsonData);
  }, []);

  const [linearScaleSelectedValue, setLinearScaleSelectedValue] = useState("");
  const handleLinearScaleChange = (e) => {
    setLinearScaleSelectedValue(e.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [value, setValue] = React.useState("");

  /*BUG: se in due domande diversele possibili risposte
	dei radio button sono uguali, allora quando si sceglie la risposta in una domanda, verrà in automatico
	selezionata anche nell'altra.*/
  const renderRadioButtonQuestion = (question) => {
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
              {question.data.title}
            </Box>

            <Grid className={classes.grid} container spacing={3}>
              <Grid item>
                {/*Se l'array non è vuoto, allora lo scorre*/}
                {question.data.images && question.data.images.map((img) => (
                  <Paper
                    variant="outlined"
                    className={classes.imagePaperContainer}
                  >
                    {loadImage(img)}
                  </Paper>
                ))}
              </Grid>
            </Grid>

            <Box align="left" className={classes.elementContainer}>
              {question.data.description}
            </Box>

            <RadioGroup name="RadioGroup">
              {question.data.choices.map((s) => (
                <Box align="left" className={classes.choicesContainer}>
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
  };

  const renderTextFieldQuestion = (question) => {
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
              {question.data.title}
            </Box>
            <Box align="left" className={classes.elementContainer}>
              {question.data.description}
            </Box>

            <form autoComplete="off">
              <TextField
                className={classes.textField}
                id="standard-textarea"
                label="Type here your answer"
                Placeholder="Placeholder"
                multiline
                rowsMax={3}
              />
            </form>
          </Paper>
        </Grid>
      </Typography>
    );
  };

  const renderRankingQuestion = (question) => {
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
                {question.data.title}
              </Box>

              <Box align="left" className={classes.elementContainer}>
                {question.data.description}
              </Box>

              <DragDropContext
                onDragEnd={(param) => {
                  //Indici dei due elementi da scambiare
                  const srcIndex = param.source.index;
                  const destIndex = param.destination?.index;

                  const newList = question.data.choices; //Copia dell'array di scelte da ordinare
                  const [reorderList] = question.data.choices.splice(
                    srcIndex,
                    1
                  ); //si rimuove l'indice sorgente dal nuovo array
                  newList.splice(destIndex, 0, reorderList); //si riaggiunge l'indice nell'array nella nuova posizione
                }}
              >
                <Droppable droppableId="1">
                  {(provided, _) => (
                    <div
                      className={classes.rankingContainer}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {question.data.choices.map((item, i) => (
                        <Draggable
                          key={item.id}
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
  };

  const renderLinearScaleQuestion = (question) => {
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
              {question.data.title}
            </Box>

            <Box
              align="left"
              fontWeight="fontWeightBold"
              className={classes.elementContainer}
            >
              {question.data.description}
            </Box>
            <Box display="flex" flexdirection="row">
              <Box className={classes.labelContainer}>
                {question.data.minValueLabel}
              </Box>

              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="gender"
                  name="LinearScale"
                  value={linearScaleSelectedValue}
                  onChange={handleLinearScaleChange}
                >
                    {console.log(question)}
                  {
                    //Number converte una stringa in un numero

                    [
                      ...Array(Number(question.data.maxValue) + 1 - Number(question.data.minValue)
                      ),
                    ].map((s, i) => (
                      <FormControlLabel
                        value={Number(question.data.minValue) + i}
                        control={
                          <Radio
                            checked={
                              linearScaleSelectedValue ==
                              Number(question.data.minValue) + i
                            }
                            color="primary"
                          />
                        }
                        label={Number(question.data.minValue) + i}
                        labelPlacement="top"
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
              <Box className={classes.labelContainer}>
                {question.data.maxValueLabel}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Typography>
    );
  };

  const loadImage = (image) => {
    const path = process.env.PUBLIC_URL + "/img/" + image;
    return <img className={classes.imageFormat} src={path} />;
  };

  const renderImage = (question) => {
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
              {question.data.title}
            </Box>
            <Box align="left" className={classes.elementContainer}>
              {question.data.description}
            </Box>
            <div className={classes.singleImageContainer}>
              {loadImage(question.data.img)}
            </div>
          </Paper>
        </Grid>
      </Typography>
    );
  };

  const renderHeader = (item) => {
    return (
      <Typography component="div" color="textPrimary" align="center">
        <Grid>
          <Paper
            variant="outlined"
            width={400}
            component="div"
            className={classes.wrapper}
          >
            <Box align="left" className={classes.questionnaireTitleContainer}>
              {item.title}
            </Box>

            <Box align="left" className={classes.elementContainer}>
              {item.description}
            </Box>
          </Paper>
        </Grid>
      </Typography>
    );
  };

  const contentSorter = (item) => {
    switch (item.data.type) {
      case "Multiple Choice":
        return renderRadioButtonQuestion(item);
      case "Short Text":
        return renderTextFieldQuestion(item);
      case "Linear Scale":
        return renderLinearScaleQuestion(item);
      case "Ranking":
        return renderRankingQuestion(item);
    }
    //Smistamento delle Immagini
    if (item.type === "Image") {
      return renderImage(item);
    }
  };

  return (
    <div>
    {/*Mappa il file .json*/}
      {console.log("The json data is ", jsonData)}
      {jsonData.map((item) => (
        <div>
          {/*Renders the questionnaire's header*/}
          {renderHeader(item)}
          
          {/*Loops over the contents array and for every element calls the contentSorter in order to call the correct function
          that renders that specific content*/}
          {item.pages[currentPage].contents.map((s) => {
            return <div>{contentSorter(s)}</div>;
          })}

          <Box
            display="flex"
            justifyContent="flex-end"
            className={classes.pagesSwitchButtonContainer}
          >
            {/*If currentPage is > 0 it shows the "Back" button in order to scroll back one page*/}
            {currentPage > 0 ? (
              <Button
                className={classes.pagesSwitchButton}
                variant="contained"
                onClick={handlePaging(0)}
                color="primary"
              >
                Back
              </Button>
            ) : (
              ""
            )}
            {/*If currentPage is equal to the last element of the 'pages' array it shows the 'Save' button that will save the survey,
          if not, it will shows the 'Next' button until there is a next page (the array index starts from 0)*/}
            {currentPage === item.pages.length - 1 ? (
              <Button
                className={classes.pagesSwitchButton}
                variant="contained"
                /*GESTIRE ONCLICK*/ color="primary"
              >
                Save
              </Button>
            ) : (
              <Button
                className={classes.pagesSwitchButton}
                variant="contained"
                onClick={handlePaging(1)}
                color="primary"
              >
                Next
              </Button>
            )}
          </Box>
        </div>
      ))}
      
    </div>

  );
}

export default JsonLoader;
