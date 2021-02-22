import React from "react";
import JsonLoader from "./JsonLoader.js";
import { questionStyle } from "../../viewStyles.js";


const useStyles = questionStyle;

function View(props) {
  const classes = useStyles();
  //Settaggio del colore dello sfondo full-size
  document.body.style.backgroundColor= "#edf2fb";

  return (
		<div className={classes.root}>
	      <JsonLoader />
	    </div>
  );
}

export default View;
