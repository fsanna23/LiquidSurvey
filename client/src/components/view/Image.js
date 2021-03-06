import React, { useState, useEffect, useContext, useRef } from "react";
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
import RandomNamesContext from "./RandomNamesContext";

const useStyles = questionStyle;

function Image(props) {

  const classes = useStyles();
  let rand;
  let randInRange;
  let printAux = [];
  const [toPrint, setToPrint] = useState([]);
  const [imagesNames, setImagesNames] = useState([]);
  const [generatedNumber, setGeneratedNumber] = useState(0);
  const [image, setImage] = useState("");
  const randomNames = useContext(RandomNamesContext);
  console.log("The random names in IMAGE are: ", randomNames);
  
  useEffect(() => {
    //if(image.length == 0){
      let tempGeneratedNumber = undefined;
      console.log("The randomNames in useEffect Image are: ", randomNames);
      if (props.data.randomStatus) {
        randomNames.forEach((r) => {
          if (r.randomName === props.data.randomName) {
            tempGeneratedNumber = r.generatedNumber;
          }
        });
        if (tempGeneratedNumber === undefined) return;
        let imgPath = new URL("http://localhost:9000/getRandomImage");
        imgPath.search = new URLSearchParams({
          imageName: tempGeneratedNumber,
          folder: "question",
        });
        fetch(imgPath)
          .then((response) => response.blob())
          .then((data) => {
            console.log("BLOB: ", URL.createObjectURL(data))
            setImage(URL.createObjectURL(data));
          });
      } else {
      setImage(URL.createObjectURL(props.data.img));
    }
  //}
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
        <div className={classes.singleImageContainer}>
          <img src={image} width="200px" height="200px" />
        </div>
      </Paper>
    </Grid>
  </Typography>
  </div>

  );
}

export default Image;
