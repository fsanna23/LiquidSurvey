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
  let imageElement = [];
  let randomElement = [];
  const [vPages, setVPages] = useState([0]);

  console.log("visitedPages Inizio: ", vPages)
  /*[ES6] action è il parametro passato (indica se l'utente vuole andare alla prossima pagina (1) o quella precedente (0)), 
	'e' è l'event object ritornato*/
  const handlePaging = (action) => (e) => {
    let visitedPages = [...vPages]
    if (action) {
      
      setCurrentPage(currentPage + 1);
      
      if(visitedPages == undefined){
        visitedPages.push(currentPage)
      }
      else if(!visitedPages.includes(currentPage)){
        visitedPages.push(currentPage)
      }
    }
    else {

      setCurrentPage(currentPage - 1);
      
      if(visitedPages == undefined){
        visitedPages.push(currentPage)
      }
      else if(!visitedPages.includes(currentPage)){
        visitedPages.push(currentPage)
      }
    }
    setVPages(visitedPages)
  };

  const classes = useStyles();
  const jsonData = useContext(SelectedSurveyContext);

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
                    {/*loadImage(img)*/}
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
    switch(item.type){

      case "Random Number":
      //Vengono inseriti nell'array randomElement tutti gli elementi di tipo Random Number
      if(!randomElement.includes(item.data)){

          randomElement.push(item.data)
        }
      break;

      case "Image":
        //Vengono inseriti nell'array randomElement tutti gli elementi di tipo Image
        if(!imageElement.includes(item.data)){

          imageElement.push(item.data)
        }
    }
  };
  const questionImagesNames = [];
  const [imagesNames, setImagesNames] = useState([]);
  var minValue = 0;
  const nameNumberAssociation = [];
  const images = [];
  const [toPrint, setToPrint] = useState([]);
  var name = null;
  var assValue = null;
  let obj = [];
  

  useEffect(() => {

    if(!vPages.includes(currentPage)){
    let printP = [...toPrint];
    let promises = nameNumberAssociation.map((s, i) => {
          return new Promise((resolve) => {
          let imgPath = new URL("http://localhost:9000/getImage")
          imgPath.search = new URLSearchParams({imageName: s.value, folder: "question"})
          fetch(imgPath)
          .then((response) => response.blob())
          .then((data) => {
            resolve({img: URL.createObjectURL(data),name: s.name});
          });
        });
        });

        Promise.all(promises)
        .then((results) => {
          printP.push(...results)
          setToPrint(printP)
        })
    }
  }, [currentPage])

  const renderImage = () => {

    let printP = [];

    //se esistono Elementi di tipo immagine allora esegue tutto il resto (c'è la stessa condizione a riga 496)
    if(imageElement && imageElement.length > 0){
    //se l'array imagesNames è vuoto allora prende dal server i nomi delle immagini (sia question che explaination)
    //e le mette dentro imagesNames
    if(imagesNames.length == 0){

      fetch('http://localhost:9000/getImageList')
      .then(response => response.json())
      .then(data => {setImagesNames(data)})
    }
    //Se esistono le immagini di tipo Question Images allora mette dentro un array tutti i nomi
    if(imagesNames['Question Images'] && imagesNames['Question Images'].length > 0){
      
      //data contiene i nomi delle immagini 'question' e 'explaination', quindi prendo solo le 'question'      
      imagesNames['Question Images'].map((name) =>{

        if(!questionImagesNames.includes(name)){
          questionImagesNames.push(name);
        }
      })

      //scorre l'array popolato nel case a riga 345 dello switch e per ogni elemento prende un nome di un'immagine casualmente
      //dall'array che contiene i nomi delle sole immagini di tipo Question Images. infine associa il nome dell'elemento casuale
      //ad un immagine casuale (nameNumberAssociation avrà tutte le associazioni nome numero casuale)
      

      randomElement.map((s, i) => {
        if(nameNumberAssociation[i] === undefined){
      //Generazione di un numero casuale da associare al randomName
          var rand = Math.floor(minValue + Math.random() * (questionImagesNames.length - minValue));
      
      //Array di oggetti. in ogni oggetto c'è l'associazione (randomName, immagineCasuale)
          nameNumberAssociation.push({name: `${s.name}`, value: `${questionImagesNames[rand]}`});
        }else if(nameNumberAssociation[i].name !== s.name){

          var rand = Math.floor(minValue + Math.random() * (questionImagesNames.length - minValue));
          nameNumberAssociation.push({name: `${s.name}`, value: `${questionImagesNames[rand]}`});
        }
      })
      
      //QUESTA PARTE L'ABBIAMO VISTA ASSIEME
      //Recupero delle immagini dal server
      
      if(toPrint.length == 0){
        let promises = nameNumberAssociation.map((s) => {
          return new Promise((resolve) => {
          let imgPath = new URL("http://localhost:9000/getImage")
          imgPath.search = new URLSearchParams({imageName: s.value, folder: "question"})
          fetch(imgPath)
          .then((response) => response.blob())
          .then((data) => {
            resolve({img: URL.createObjectURL(data),name: s.name});
          });
        });
        });

        Promise.all(promises)
        .then((results) => {
          printP.push(...results)
          setToPrint(printP)
        })
        

      }else{

        console.log("toPrint: ", toPrint)
        //console.log("To Print: ", toPrint)
        return imagesPrinter();
      }
      
      
    }
  }
  }

  const imagesPrinter = () => {
    return(
      <div>
      {/*
      ToPrint -> ha le associazioni tra nome del randomNumber e immagine da stampare
      scorre toPrint e per ogni nome di ogni elemento, controlla se esiste un elemento di tipo Image che ha
      lo stesso nome, in caso positivo stampa l'immagine associata allo stesso nome che sta dentro toPrint*/}
      {console.log("toPrint: ", toPrint)}
      {toPrint.map((tp, i) => (
        imageElement.map((ie) => (
        ie && ie.randomName === tp.name ?
        <Typography component={"span"} color="textPrimary" align="center">
        <Grid>
          <Paper
            variant="outlined"
            width={400}
            component="div"
            className={classes.wrapper}
          >
            <Box align="left" className={classes.titleContainer}>
              {ie.title}
            </Box>
            <Box align="left" className={classes.elementContainer}>
              {ie.description}
            </Box>
            <div className={classes.singleImageContainer}>

                <img src={tp.img} width="200px" height="200px" /> 
               
                {ie.randomName}
            </div>
          </Paper>
        </Grid>
      </Typography>

        : ""
      ))
      ))}
      </div>
    
    );
  }


  return (
    <div>
    {/*Mappa il file .json*/}
      {jsonData.map((item) => (
        <div>
          {/*Renders the questionnaire's header*/}
          {renderHeader(item)}
          {/*Mappa tutti i contenuti (contents nel json) della pagina corrente e per ogni contenuto chiama il contentSorter
          e lo renderizza*/}
          {item.pages[currentPage].contents.map((s) => {
            return <div>{contentSorter(s)}</div>;
            
            //if(imageElement && imageElement.length > 0){
            //}
          })}
          {/*se l'array che contiene elementi immagine casuale chiama il renderImage(). per ogni pagina richiama il renderImage
          se le condizioni sono vere*/}
          {imageElement && imageElement.length > 0 ?
              renderImage()
            : ""
          }
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
