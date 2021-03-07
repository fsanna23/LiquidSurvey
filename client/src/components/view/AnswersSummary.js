import React, { useState, useEffect, useContext } from "react";
import { questionStyle } from "../../viewStyles.js";
// Importing Material
import {
  Box,
  Button
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SelectedSurveyContext from "../../SelectedSurveyContext";
import Page from "./Page.js";
import RandomNamesContext from "./RandomNamesContext";

const useStyles = questionStyle;

function AnswerSummary(props){

    const classes = useStyles();
    //prende correttamente i props
    console.log("RISPOSTE: ", props.answers);
    console.log("JSON: ", props.jsonData);
    let tempPreparedAnswers = [];
    let tempPreparedQuestions = [];

    const prepareAnswers = () => {

        props.answers.map((item) =>
            
            item.map((s) => 

                s.contentType !== 'Image' && s.contentType !== 'Random Number' ?
                
                    tempPreparedAnswers.push(s.answer)
                
                : ""
            )
            
        )
    }

    const prepareQuestions = () => {

        props.jsonData.pages.map((item) => 

            item.contents.map((s) => 
            
            s.type !== 'Image' && s.type !== 'Random Number' ?
                
                tempPreparedQuestions.push(s.data.title)
            
            : ""
            )
        )
        console.log("DOMANDE: ", tempPreparedQuestions)
    }

    const renderAnswersSummaryHeader = () => {

        return(

            <Typography component="div" color="textPrimary" align="center">
                <Grid>
                <Paper
                    variant="outlined"
                    width={400}
                    component="div"
                    className={classes.wrapper}
                >
                    <Box fontWeight={500} align="left" className={classes.questionnaireTitleContainer}>
                        Answers Summary
                    </Box>
                    <Box align="left" className={classes.elementContainer}>
                    Here you can view your answers
                    </Box>
                </Paper>
                </Grid>
            </Typography>
        );
    }

    return(
        <div>
            {prepareQuestions()}
            {prepareAnswers()}
            {renderAnswersSummaryHeader()}
            {tempPreparedQuestions.map((q, i)=>

                <div>
                    <Typography key={tempPreparedQuestions.id} component={"span"} color="textPrimary" align="center">
                    <Grid>
                    <Paper
                        variant="outlined"
                        width={400}
                        component="div"
                        className={classes.wrapper}
                    >
                        <Box fontWeight={500} align="left" className={classes.titleContainer}>
                            {q}
                        </Box>
                        <Box align="left" className={classes.titleContainer}>
                         {tempPreparedAnswers[i]}
                        </Box>
                           
                    </Paper>
                    </Grid>
                </Typography>
                    
                </div>
                
            )}
            
        </div>
        
         
    );
}

export default AnswerSummary;