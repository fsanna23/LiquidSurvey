import React, { useState, useEffect, useContext } from "react";
import { questionStyle } from "./viewStyles.js";
// Importing Material
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import TextField from "@material-ui/core/TextField";
import DataCollectorContext from "./DataCollectorContext";

const useStyles = questionStyle;

function TextQuestion(props) {
  const classes = useStyles();
  const [answer, setAnswer] = useState([]);
  const updateAnswer = useContext(DataCollectorContext);

  const saveAnswer = (e) => {
    setAnswer(e.target.value);
    updateAnswer(props.sectionIndex, props.contentIndex, e.target.value);
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
