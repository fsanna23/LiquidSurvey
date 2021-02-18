import React, { useState } from "react";
import { linearScaleQuestionStyle } from "../styles";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  Box,
  TextField,
} from "@material-ui/core";
const useStyles = linearScaleQuestionStyle;

function LinearScaleQuestion(props) {
  const classes = useStyles();
  let minValue = props.minValue;
  let maxValue = props.maxValue;
  let minValueLabel = props.minValueLabel;
  let maxValueLabel = props.maxValueLabel;

  const onChangeMinValue = (e) => {
    props.updateMinValue(e.target.value);
  };

  const onChangeMaxValue = (e) => {
    props.updateMaxValue(e.target.value);
  };

  const onChangeMinValueLabel = (e) => {
    props.updateMinValueLabel(e.target.value);
  };

  const onChangeMaxValueLabel = (e) => {
    props.updateMaxValueLabel(e.target.value);
  };

  return (
    <div className={classes.fieldContainer}>
      <Box component="div" className={classes.rangeSelectContainer}>
        <Typography variant="body1" className={classes.rangeSelectItem}>
          Da{" "}
        </Typography>
        <FormControl className={classes.rangeSelectItem}>
          <Select value={minValue} onChange={onChangeMinValue}>
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body1" className={classes.rangeSelectItem}>
          {" "}
          a{" "}
        </Typography>
        <FormControl className={classes.rangeSelectItem}>
          <Select value={maxValue} onChange={onChangeMaxValue}>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box component="div">
        <FormControl className={classes.labelChangeContainer}>
          <TextField
            label={"Minimum value label"}
            value={minValueLabel}
            className={classes.textField && classes.labelChangeItem}
            onChange={onChangeMinValueLabel}
          />
          <TextField
            label={"Maximum value label"}
            value={maxValueLabel}
            className={classes.textField && classes.labelChangeItem}
            onChange={onChangeMaxValueLabel}
          />
        </FormControl>
      </Box>
    </div>
  );
}

export default LinearScaleQuestion;
