import React, { useState, useEffect, useContext } from "react";
import { questionStyle } from "../../viewStyles.js";
import TextQuestion from "./TextQuestion.js";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion.js";
import RankingQuestion from "./RankingQuestion.js";
import LinearScaleQuestion from "./LinearScaleQuestion.js";
import TextField from "./TextField";
import Image from "./Image.js";
const useStyles = questionStyle;

function Page(props) {
  const classes = useStyles();

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
      case "Text":
        return <TextField data={item.data} />;
    }
  };

  return (
    <div>
      {/*Mappa tutti i contenuti (contents:[] nel json) della pagina corrente e per ogni contenuto chiama il contentSorter*/}
      {props.contents.map((s, i) => {
        return <div key={s.contentId + i}>{newContentSorter(s)}</div>;
      })}
    </div>
  );
}

export default Page;
