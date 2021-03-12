import React, { useState, useEffect, useContext } from "react";
import { questionStyle } from "../../viewStyles.js";
// Importing Material
import { Box, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SelectedSurveyContext from "../../SelectedSurveyContext";
import Page from "./Page.js";
import RandomNamesContext from "./RandomNamesContext";
import DataCollectorContext from "./DataCollectorContext.js";
import AnswersSummary from "./AnswersSummary.js";

const useStyles = questionStyle;

//Componente che si occupa di prelevare i dati dal Json che descrive il questionario e tutti gli elementi di cui è composto,
//divisi per pagine. per ogni tipo di domanda prende le informazioni presenti e le formatta in modo che siano
//pronte alla visualizzazione (che avverrà passando il componente a View e usandolo come <JsonLoader />)

function JsonLoader(props) {
  const classes = useStyles();
  const jsonData = useContext(SelectedSurveyContext);
  const [currentPage, setCurrentPage] = useState(0); //Stato usato per conoscere la pagina corrente del questionario
  const [vPages, setVPages] = useState([0]); //Stato che tiene traccia di tutte le pagine visitate dall'utente
  const [randomNames, setRandomNames] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);

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

  const saveSurvey = () => {
    console.log("The answers are: ", answers);
  };

  const onClickShowAnswers = () => {
    setShowAnswers(true);
  };

  /* Funzione di callback per le domande */
  const updateAnswer = (sectionIndex, contentIndex, answer) => {
    // Update the answer at sectionIndex and contentIndex
    console.log("The section index is ", sectionIndex);
    console.log("The content index is ", contentIndex);
    console.log("The answer is ", answer);

    if (answers.length > 0) {
      let newAnswers = [...answers];
      newAnswers[sectionIndex][contentIndex].answer = answer;
      setAnswers(newAnswers);
      console.log("The updated answers are ", newAnswers);
    }
  };

  useEffect(() => {
    console.log("Running useEffect for randomNames setting");
    const savedRandomNames = sessionStorage.getItem(
      "randomNames" + jsonData.id
    );
    if (savedRandomNames !== null) {
      const parsedNames = JSON.parse(savedRandomNames);
      setRandomNames(parsedNames);
    } else {
      let randomNamesArray = [];
      jsonData.pages.forEach((page) => {
        page.contents.forEach((content) => {
          if (content.type === "Random Number")
            randomNamesArray.push(content.data);
        });
      });
      if (randomNamesArray.length > 0) {
        let totalNumbers;
        let randomObjs = [];
        fetch("http://localhost:9000/getImageNumbers")
          .then((response) => response.json())
          .then((data) => (totalNumbers = data.length - 1))
          .then(() => {
            randomNamesArray.forEach((name) => {
              let rand = Math.floor(
                name.minRange + Math.random() * (name.maxRange - name.minRange)
              );
              let randInRange = rand % totalNumbers;
              //if(randomObjs.length)
              randomObjs.push({
                randomName: name.name,
                generatedNumber: randInRange,
              });
            });
          })
          .then(() => {
            sessionStorage.setItem(
              "randomNames" + jsonData.id,
              JSON.stringify(randomObjs)
            );
            setRandomNames(randomObjs);
          });
      } else {
        const newRandomNames = ["noNames"];
        setRandomNames(newRandomNames);
      }
    }
  }, []);

  /* Usiamo questo useEffect per impostare da subito la struttura delle risposte
  in base alla struttura del JSON passato dal MainPage.
  Lo vado a runnare dopo che setto randomNames in modo tale da avere anche le informazioni
  riguardante i valori random */
  useEffect(() => {
    if (randomNames.length > 0) {
      console.log("Running useEffect for answer setting");
      let initialAnswers = [];
      jsonData.pages.forEach((page) => {
        let pageArray = [];
        page.contents.forEach((content) => {
          if (content.type === "Question") {
            if (content.data.type === "Ranking") {
              pageArray.push({
                contentType: content.type,
                answer: content.data.choices,
              });
            } else if (content.data.type === "CheckBox") {
              pageArray.push({
                contentType: content.type,
                answer: content.data.choices,
              });
            } else {
              pageArray.push({ contentType: content.type, answer: null });
            }
          } else {
            if (
              content.data.randomStatus &&
              content.data.randomStatus === true
            ) {
              console.log("The item randomName is ", content.data.randomName);
              console.log("The randomNames are ", randomNames);
              const foundValue = randomNames.find(
                (rn) => rn.randomName === content.data.randomName
              );
              const randomValue = foundValue["generatedNumber"];
              pageArray.push({ contentType: content.type, randomValue });
            } else {
              pageArray.push({ contentType: content.type });
            }
          }
        });
        initialAnswers.push(pageArray);
      });
      console.log("SETTING INITIAL ANSWERS: ", initialAnswers);
      setAnswers(initialAnswers);
    } else {
      console.log("Use effect answer: randomNames length not > 0");
    }
  }, [randomNames]);

  const renderPages = () => {
    console.log("Rendering the pages, the randomNames are: ", randomNames);
    return (
      <RandomNamesContext.Provider value={randomNames}>
        <DataCollectorContext.Provider value={updateAnswer}>
          <Page
            sectionIndex={currentPage}
            contents={jsonData.pages[currentPage].contents}
          />
        </DataCollectorContext.Provider>
      </RandomNamesContext.Provider>
    );
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
              onClick={onClickShowAnswers}
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

  const showAnswersOnClick = () => {
    return (
      <div>
        <AnswersSummary answers={answers} jsonData={jsonData} />
      </div>
    );
  };

  switch (showAnswers) {
    case true:
      return showAnswersOnClick();

    case false:
      return newReturn();
  }
}

export default JsonLoader;
