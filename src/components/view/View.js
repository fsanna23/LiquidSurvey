import React, { Component } from 'react';
import JsonLoader from './JsonLoader.js';
import { questionStyle } from '../viewStyles.js';

const useStyles = questionStyle;

function View() {
	const classes = useStyles();
	
	return(

		<div className={classes.root}>
			<JsonLoader />
		</div>

	);
	
}

export default View;