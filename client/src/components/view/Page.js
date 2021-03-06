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
import TextQuestion from "./TextQuestion.js";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion.js";
import RankingQuestion from "./RankingQuestion.js";
import LinearScaleQuestion from "./LinearScaleQuestion.js";
import Image from "./Image.js";
const useStyles = questionStyle;




function Page(props) {
  const classes = useStyles();
  let randomElement = []; //Array che contiene gli elementi di tipo 'Random Number'
  let imageElement = [];
  const contentSorter = (item) => {

    /*switch (item.data.type) {
      case "Multiple Choice":
        return <MultipleChoiceQuestion item={item} />
      case "Short Text":
        return <TextQuestion item={item}/>
      case "Linear Scale":
        return <LinearScaleQuestion item={item} />
        //return renderLinearScaleQuestion(item);
      case "Ranking":
        return <RankingQuestion item={item} />
    }
    switch(item.type){

      case "Random Number":
        randomElement.push(item);
        break;

      case "Image":
        imageElement.push(item);
        break;
          
    }*/
    switch(item.type){

      case "Random Number":
      //Vengono inseriti nell'array randomElement tutti gli elementi di tipo Random Number
      if(!randomElement.includes(item.data)){

          randomElement.push(item.data)
        }
      break;

      case "Image":
        //Vengono inseriti nell'array randomElement tutti gli elementi di tipo Image
        if(item.data.randomStatus){
          if(!imageElement.includes(item.data)){

            imageElement.push(item.data)
          }
        }
        else{
          //console.log("Static Image: ", item.data)
          //return renderStaticImage(item.data)
        }
    }
  };

  const newContentSorter = (item) => {
    switch (item.data.type) {
      case "Multiple Choice":
        return <MultipleChoiceQuestion data={item.data} />;
      case "Short Text":
        return <TextQuestion data={item.data} />;
      case "Linear Scale":
        return <LinearScaleQuestion data={item.data} />;
      //return renderLinearScaleQuestion(item);
      case "Ranking":
        return <RankingQuestion data={item.data} />;
    }
    switch (item.type) {
      case "Image":
        return <Image data={item.data} />;
    }
  };

  return(
    <div>
          {/*Mappa tutti i contenuti (contents:[] nel json) della pagina corrente e per ogni contenuto chiama il contentSorter*/}
          {props.contents.map((s, i) => {

            return <div key={s.contentId + i}>{newContentSorter(s)}</div>;
          })}
    </div>
  );
}

export default Page;