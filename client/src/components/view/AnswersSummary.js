import React, { useState, useEffect, useContext } from "react";
import { questionStyle } from "../../viewStyles.js";
// Importing Material
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = questionStyle;

function AnswerSummary(props) {
  const classes = useStyles();
  //prende correttamente i props
  console.log("RISPOSTE: ", props.answers);
  console.log("JSON: ", props.jsonData);
  let tempPreparedAnswers = [];
  let tempPreparedQuestions = [];

  console.log("PROPS: ", props.answers);

  const prepareAnswers = () => {
    let tempRanking = "";
    console.log("Prepare answer, props answers is : ", props.answers);

    props.answers.forEach((item) =>
      item.forEach((s, i) =>
        s.answer === null
          ? tempPreparedAnswers.push("NON È STATA FORNITA UNA RISPOSTA")
          : Array.isArray(s.answer)
          ? s.answer.map((r) => (tempRanking = tempRanking + " " + r.value)) &&
            tempPreparedAnswers.push(tempRanking)
          : s.contentType !== "Image" &&
            s.contentType !== "Text" &&
            s.contentType !== "Random Number"
          ? tempPreparedAnswers.push(s.answer)
          : s.contentType === "Image" || s.contentType === "Text"
          ? tempPreparedAnswers.push(s)
          : ""
      )
    );
    console.log("Prepare answer, tempPrepareAnswer is : ", tempPreparedAnswers);
  };

  const prepareQuestions = () => {
    props.jsonData.pages.map((item) =>
      item.contents.map((s) =>
        s.type !== "Image" && s.type !== "Random Number"
          ? tempPreparedQuestions.push(s.data.title)
          : s.type === "Image" || s.type === "Text"
          ? tempPreparedQuestions.push(s.data.title)
          : ""
      )
    );
  };

  const renderAnswersSummaryHeader = () => {
    return (
      <Typography component="div" color="textPrimary" align="center">
        <Grid>
          <Paper
            variant="outlined"
            width={400}
            component="div"
            className={classes.wrapper}
          >
            <Box
              fontWeight={500}
              align="left"
              className={classes.questionnaireTitleContainer}
            >
              Answers Summary
            </Box>
            <Box align="left" className={classes.elementContainer}>
              Here you can view your answers
            </Box>
          </Paper>
        </Grid>
      </Typography>
    );
  };

  return (
    <div>
      {prepareQuestions()}
      {prepareAnswers()}
      {renderAnswersSummaryHeader()}
      {tempPreparedAnswers.map((q, i) => (
        <div key={tempPreparedQuestions.id}>
          <Typography component={"span"} color="textPrimary" align="center">
            <Grid>
              <Paper
                variant="outlined"
                width={400}
                component="div"
                className={classes.wrapper}
              >
                <Box
                  fontWeight={500}
                  align="left"
                  className={classes.titleContainer}
                >
                  {tempPreparedQuestions[i]}
                </Box>
                <Box align="left" className={classes.titleContainer}>
                  {typeof q === "object" &&
                  q !== null &&
                  q.contentType === "Image"
                    ? "È stata mostrata all'utente un'immagine con valore: " +
                      q.randomValue
                    : typeof q === "object" &&
                      q !== null &&
                      q.contentType === "Text"
                    ? "È stato mostrato all'utente un testo associato al valore : " +
                      q.randomValue
                    : q}
                </Box>
              </Paper>
            </Grid>
          </Typography>
        </div>
      ))}
    </div>
  );
}

export default AnswerSummary;
