import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Input,
  Divider,
  CardActions,
  Tooltip,
  IconButton,
  InputLabel,
  Select,
  Typography,
} from "@material-ui/core";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import DeleteIcon from "@material-ui/icons/Delete";

import { newRandomNumberStyle } from "../../editorStyles";
import FormControl from "@material-ui/core/FormControl";
const useStyles = newRandomNumberStyle;

function NewRandomNumber(props) {
  const [name, setName] = useState(
    props.data && props.data.name ? props.data.name : ""
  );
  const [minRange, setMinRange] = useState(
    props.data && props.data.minRange ? props.data.minRange : 0
  );
  const [maxRange, setMaxRange] = useState(
    props.data && props.data.maxRange ? props.data.maxRange : 100
  );

  useEffect(() => {
    props.update({ name, minRange, maxRange });
  }, []);

  const classes = useStyles();

  const onChangeName = (e) => {
    setName(e.target.value);
    props.update({ name: e.target.value });
  };

  const onChangeMinRange = (e) => {
    setMinRange(e.target.value);
    props.update({ minRange: e.target.value });
  };

  const onChangeMaxRange = (e) => {
    setMaxRange(e.target.value);
    props.update({ maxRange: e.target.value });
  };

  const onRemoveContent = () => {
    props.removeRandomNumber(props.index);
  };

  return (
    <Box width={800} className={classes.boxCardRoot}>
      <Card className={classes.cardRoot} variant="outlined">
        <CardContent className={classes.cardContent}>
          <Input
            placeholder="Name for your random number"
            inputProps={{ "aria-label": "description" }}
            className={classes.placeholderTitle}
            value={name}
            onChange={onChangeName}
          />
          <Typography variant="body1" className={classes.rangeText}>
            Insert the values for the random generation range
          </Typography>
          <FormControl className={classes.rangeInput}>
            <InputLabel>Minimum range value</InputLabel>
            <Input type="number" value={minRange} onChange={onChangeMinRange} />
          </FormControl>
          <FormControl className={classes.rangeInput}>
            <InputLabel>Maximum range value</InputLabel>
            <Input type="number" value={maxRange} onChange={onChangeMaxRange} />
          </FormControl>
        </CardContent>
        <Divider variant="middle" />
        <CardActions className={classes.cardActions}>
          <div
            id={"left-side-actions" + props.index}
            className={classes.cardActionsLeft}
          >
            <Tooltip title="Move up" placement="bottom">
              <IconButton
                onClick={() => {
                  props.move.up();
                }}
              >
                <ArrowUpward />
              </IconButton>
            </Tooltip>
            <Tooltip title="Move down" placement="bottom">
              <IconButton
                onClick={() => {
                  props.move.down();
                }}
              >
                <ArrowDownward />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.cardActionsRight}>
            <Tooltip title="Delete question" placement="bottom">
              <IconButton
                onClick={() => {
                  onRemoveContent();
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </CardActions>
      </Card>
    </Box>
  );
}

export default NewRandomNumber;
