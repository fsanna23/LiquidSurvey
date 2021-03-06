import React, { useState, useEffect, useContext } from "react";
import { questionStyle } from "../../viewStyles.js";
import RandomNamesContext from "./RandomNamesContext";
import { Box, Typography, Grid, Paper } from "@material-ui/core";

const useStyles = questionStyle;

function TextField(props) {
  const classes = useStyles();
  const [text, setText] = useState();
  const randomNames = useContext(RandomNamesContext);

  useEffect(() => {
    let tempGeneratedNumber = undefined;
    if (props.data.randomStatus) {
      randomNames.forEach((r) => {
        if (r.randomName === props.data.randomName) {
          tempGeneratedNumber = r.generatedNumber;
        }
      });
      if (tempGeneratedNumber === undefined) return;
      let imgPath = new URL("http://localhost:9000/getRandomText");
      imgPath.search = new URLSearchParams({
        textName: tempGeneratedNumber,
      });
      fetch(imgPath)
        .then((response) => response.json())
        .then((data) => {
          console.log("The resulting text is ", data);
          setText(data);
        });
    } else {
      setText(props.data.description);
    }
  }, [randomNames]);

  return (
    <div>
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
            {/* Create the class descriptionContainer (or change its name) into the style file */}
            <Box align="left" className={classes.descriptionContainer}>
              {text}
            </Box>
          </Paper>
        </Grid>
      </Typography>
    </div>
  );
}

export default TextField;
