import React, { useEffect, useState, useContext } from "react";
import { linearScaleQuestionStyle } from "./editorStyles";
import {
  Typography,
  Select,
  MenuItem,
  Box,
  TextField,
  Grid,
  Switch,
  FormControl,
} from "@material-ui/core";
//Context
import { NewSurveyDispatcherContext, action_types } from "./NewSurveyContext";

const useStyles = linearScaleQuestionStyle;

function LinearScaleQuestion({
  sectionIndex,
  contentIndex,
  minValue,
  maxValue,
  minValueLabel,
  maxValueLabel,
  continuousSwitch,
  radioBtnSwitch,
  horizontalSwitch,
}) {
  const classes = useStyles();
  const dispatch = useContext(NewSurveyDispatcherContext);

  useEffect(() => {
    /* INITIAL VALUES:
    minValue: 1,
    maxValue: 5,
    minValueLabel: "",
    maxValueLabel: "", */
    if (minValue === undefined) {
      const updates = {
        minValue: 1,
        maxValue: 5,
        minValueLabel: "",
        maxValueLabel: "",
        continuousSwitch: false,
        radioBtnSwitch: false,
        horizontalSwitch: false,
      };
      dispatch({
        type: action_types.UPDATE_CONTENT,
        payload: {
          sectionIndex: sectionIndex,
          contentIndex: contentIndex,
          updates,
        },
      });
    }
  }, []);

  const onChangeMinValue = (e) => {
    const updates = {
      minValue: e.target.value,
    };
    dispatch({
      type: action_types.UPDATE_CONTENT,
      payload: {
        sectionIndex: sectionIndex,
        contentIndex: contentIndex,
        updates,
      },
    });
  };

  const onChangeMaxValue = (e) => {
    const updates = {
      maxValue: e.target.value,
    };
    dispatch({
      type: action_types.UPDATE_CONTENT,
      payload: {
        sectionIndex: sectionIndex,
        contentIndex: contentIndex,
        updates,
      },
    });
  };

  const onChangeMinValueLabel = (e) => {
    const updates = {
      minValueLabel: e.target.value,
    };
    dispatch({
      type: action_types.UPDATE_CONTENT,
      payload: {
        sectionIndex: sectionIndex,
        contentIndex: contentIndex,
        updates,
      },
    });
  };

  const onChangeMaxValueLabel = (e) => {
    const updates = {
      maxValueLabel: e.target.value,
    };
    dispatch({
      type: action_types.UPDATE_CONTENT,
      payload: {
        sectionIndex: sectionIndex,
        contentIndex: contentIndex,
        updates,
      },
    });
  };

  const onChangeContinuousSwitch = () => {
    const updates = {
      continuousSwitch: !continuousSwitch,
    };
    dispatch({
      type: action_types.UPDATE_CONTENT,
      payload: {
        sectionIndex: sectionIndex,
        contentIndex: contentIndex,
        updates,
      },
    });
  };

  const onChangeRadioBtnSwitch = () => {
    const updates = {
      radioBtnSwitch: !radioBtnSwitch,
    };
    dispatch({
      type: action_types.UPDATE_CONTENT,
      payload: {
        sectionIndex: sectionIndex,
        contentIndex: contentIndex,
        updates,
      },
    });
  };

  const onChangeHorizontalSwitch = () => {
    const updates = {
      horizontalSwitch: !horizontalSwitch,
    };
    dispatch({
      type: action_types.UPDATE_CONTENT,
      payload: {
        sectionIndex: sectionIndex,
        contentIndex: contentIndex,
        updates,
      },
    });
  };

  return (
    <div className={classes.fieldContainer}>
      <Box component="div" className={classes.rangeSelectContainer}>
        <Typography variant="body1" className={classes.rangeSelectItem}>
          Da{" "}
        </Typography>
        <FormControl className={classes.rangeSelectItem}>
          <Select
            value={minValue !== undefined ? minValue : 0}
            onChange={onChangeMinValue}
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body1" className={classes.rangeSelectItem}>
          {" "}
          a{" "}
        </Typography>
        <FormControl className={classes.rangeSelectItem}>
          <Select
            value={maxValue !== undefined ? maxValue : 5}
            onChange={onChangeMaxValue}
          >
            {[...Array(9).keys()].map((value) => (
              <MenuItem value={value + 2} key={value}>
                {value + 2}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* Grid container for labels - switches */}
      <Box component="div" className={classes.gridContainer}>
        <Grid container alignItems="center" className={classes.gridContainer}>
          {/* Grid item for labels */}
          <Grid item lg={6}>
            <Box component="div">
              <FormControl className={classes.labelChangeContainer}>
                <TextField
                  label={"Minimum value label"}
                  value={minValueLabel !== undefined ? minValueLabel : ""}
                  className={classes.textField && classes.labelChangeItem}
                  onChange={onChangeMinValueLabel}
                />
                <TextField
                  label={"Maximum value label"}
                  value={maxValueLabel !== undefined ? maxValueLabel : ""}
                  className={classes.textField && classes.labelChangeItem}
                  onChange={onChangeMaxValueLabel}
                />
              </FormControl>
            </Box>
          </Grid>
          {/* Grid item for switches */}
          <Grid item lg={6}>
            <Box component="div">
              <Grid
                component="label"
                container
                alignItems="center"
                // justify="flex-end"
                justify="center"
                spacing={1}
              >
                <Grid item>
                  <Typography>Continuous</Typography>
                </Grid>
                <Grid item>
                  <Switch
                    checked={
                      continuousSwitch !== undefined ? continuousSwitch : false
                    }
                    onChange={onChangeContinuousSwitch}
                    color="primary"
                  />
                </Grid>
                <Grid item>
                  <Typography>Discrete</Typography>
                </Grid>
              </Grid>
              {/* {continuousSwitch === true ? (
                
              ) : null} */}
              <Grid
                component="label"
                container
                alignItems="center"
                // justify="flex-end"
                justify="center"
                spacing={1}
              >
                <Grid item>
                  <Typography>Slider</Typography>
                </Grid>
                <Grid item>
                  <Switch
                    checked={
                      radioBtnSwitch !== undefined ? radioBtnSwitch : false
                    }
                    onChange={onChangeRadioBtnSwitch}
                    disabled={continuousSwitch !== true}
                    color="primary"
                  />
                </Grid>
                <Grid item>
                  <Typography>Radio buttons</Typography>
                </Grid>
              </Grid>
              {/* {radioBtnSwitch === true ? (
                
              ) : null} */}
              <Grid
                component="label"
                container
                alignItems="center"
                // justify="flex-end"
                justify="center"
                spacing={1}
              >
                <Grid item>
                  <Typography>Horizontal ordering</Typography>
                </Grid>
                <Grid item>
                  <Switch
                    checked={
                      horizontalSwitch !== undefined ? horizontalSwitch : false
                    }
                    onChange={onChangeHorizontalSwitch}
                    disabled={radioBtnSwitch !== true}
                    color="primary"
                  />
                </Grid>
                <Grid item>
                  <Typography>Vertical ordering</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

// export default React.memo(LinearScaleQuestion);
export default LinearScaleQuestion;
