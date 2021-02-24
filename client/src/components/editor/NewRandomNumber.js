import React, { useState } from "react";
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
  const [title, setTitle] = useState("");
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(100);

  const classes = useStyles();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeMinRange = (e) => {
    setMinRange(e.target.value);
  };

  const onChangeMaxRange = (e) => {
    setMaxRange(e.target.value);
  };

  const onRemoveContent = () => {
    props.removeRandomNumber(props.index);
  };

  return (
    <Box width={800} className={classes.boxCardRoot}>
      <Card className={classes.cardRoot} variant="outlined">
        <CardContent className={classes.cardContent}>
          <Input
            placeholder="Insert the name for your random number"
            inputProps={{ "aria-label": "description" }}
            className={classes.placeholderTitle}
            value={title}
            onChange={onChangeTitle}
          />
          <Typography variant="body1">
            Insert the values for the random generation range
          </Typography>
          <FormControl>
            <InputLabel>Minimum range value</InputLabel>
            <Input type="number" value={minRange} onChange={onChangeMinRange} />
          </FormControl>
          <FormControl>
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
