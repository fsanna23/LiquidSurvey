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
import Page from "./Page.js";
import RandomNamesContext from "./RandomNamesContext";

const useStyles = questionStyle;

//Componente che si occupa di prelevare i dati dal Json che descrive il questionario e tutti gli elementi di cui è composto,
//divisi per pagine. per ogni tipo di domanda prende le informazioni presenti e le formatta in modo che siano
//pronte alla visualizzazione (che avverrà passando il componente a View e usandolo come <JsonLoader />)

function JsonLoader(props) {
  const classes = useStyles();
  const jsonData = useContext(SelectedSurveyContext);
  const [currentPage, setCurrentPage] = useState(0); //Stato usato per conoscere la pagina corrente del questionario
  let imageElement = []; //Array che contiene gli elementi di tipo 'Image' (che hanno un RandomName collegato)
  let randomElement = []; //Array che contiene gli elementi di tipo 'Random Number'
  const [vPages, setVPages] = useState([0]); //Stato che tiene traccia di tutte le pagine visitate dall'utente
  const [randomNames, setRandomNames] = useState([]);

  /*---GESTIONE DELLE PAGINE DEL QUESTIONARIO---*/
  /*[ES6] action è il parametro passato (indica se l'utente vuole andare alla prossima pagina (1) o quella precedente (0)), 
	'e' è l'event object ritornato*/
  const handlePaging = (action) => (e) => {
    let visitedPages = [...vPages]; //Array ausiliario usato per settare lo state di vPages

    //In base all'azione scelta (Next o Back) viene settato la pagina corrente
    if (action) {
      setCurrentPage(currentPage + 1);

      if (visitedPages == undefined) {
        //se non ci sono pagine visitate allora imposta la pagina 0
        visitedPages.push(currentPage);
      } else if (!visitedPages.includes(currentPage)) {
        visitedPages.push(currentPage);
      }
    } else {
      setCurrentPage(currentPage - 1);
      if (visitedPages == undefined) {
        visitedPages.push(currentPage);
      } else if (!visitedPages.includes(currentPage)) {
        visitedPages.push(currentPage);
      }
    }
    setVPages(visitedPages);
  };

  const newRenderHeader = () => {
    const { title, description } = jsonData;

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
              {title}
            </Box>
            <Box align="left" className={classes.elementContainer}>
              {description}
            </Box>
          </Paper>
        </Grid>
      </Typography>
    );
  };
  
  useEffect(() => {
    
    const savedRandomNames = sessionStorage.getItem("randomNames");
    if (savedRandomNames !== null) {
      const parsedNames = JSON.parse(savedRandomNames);
      setRandomNames(parsedNames);
    } else {
      let randomNamesArray = [];
      jsonData.pages.forEach((page) => {
        page.contents.forEach((content) => {
          if (content.type === "Random Number") randomNamesArray.push(content.data);
        });
      });
      if (randomNamesArray.length > 0) {
        let totalNumbers;
        let randomObjs = [];
        fetch("http://localhost:9000/getImageNumbers")
        .then(response => response.json())
        .then(data => totalNumbers = data.length - 1)
        .then(() => {
          randomNamesArray.forEach(name => {
            let rand = Math.floor(name.minRange + Math.random() * (name.maxRange - name.minRange));
            let randInRange = rand % totalNumbers;
            //if(randomObjs.length)
            randomObjs.push({randomName: name.name, generatedNumber: randInRange});
          
        })})
        .then(() => {
          sessionStorage.setItem("randomNames", JSON.stringify(randomObjs));
          setRandomNames(randomObjs)});
      }
    }
  }, []);

  const renderPages = () => {
    console.log("Rendering the pages, the randomNames are: ", randomNames);
    return (<RandomNamesContext.Provider value={randomNames}>
      <Page contents={jsonData.pages[currentPage].contents} randomNames={randomNames} />
    </RandomNamesContext.Provider>);
  };

  const newReturn = () => {
    return (
      <div>
        {newRenderHeader()}
        {renderPages()}
        <Box
          display="flex"
          justifyContent="flex-end"
          className={classes.pagesSwitchButtonContainer}
        >
          {currentPage > 0 ? (
            <Button
              className={classes.pagesSwitchButton}
              variant="contained"
              onClick={handlePaging(false)}
              color="primary"
            >
              Back
            </Button>
          ) : (
            ""
          )}
          {currentPage === jsonData.pages.length - 1 ? (
            <Button
              className={classes.pagesSwitchButton}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          ) : (
            <Button
              className={classes.pagesSwitchButton}
              variant="contained"
              onClick={handlePaging(true)}
              color="primary"
            >
              Next
            </Button>
          )}
        </Box>
      </div>
    );
  };

  return newReturn();
}

export default JsonLoader;
