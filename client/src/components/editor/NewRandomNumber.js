import React, {useState} from "react";
import {Box, Card, CardContent, Input, Divider, CardActions, Tooltip, IconButton} from "@material-ui/core";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import DeleteIcon from "@material-ui/icons/Delete";

import {newRandomNumberStyle} from "../../editorStyles";
const useStyles = newRandomNumberStyle;

function NewRandomNumber(props) {

    const [title, setTitle] = useState("");
    
    const classes = useStyles();

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