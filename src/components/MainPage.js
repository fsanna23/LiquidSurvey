import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
import { mainPageStyle } from "../styles";
import pages from "./pages";

const useStyles = mainPageStyle;

function MainPage(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const displaySurveys = () => {
    return props.surveys.map((survey) => {
      return (
        <Grid item key={survey.title}>
          <Card className={classes.cardRoot} variant="outlined">
            <CardContent className={classes.cardContent}>
              <Typography variant="h6" className={classes.cardTitle}>
                {survey.title}
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button variant="contained" color="default" size="small">
                Edit
              </Button>
              <Button variant="contained" color="default" size="small">
                Open
              </Button>
              <IconButton className={classes.moreButton} onClick={handleClick}>
                <MoreIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      );
    });
  };

  const onCreateSurvey = () => {
    props.setPage(pages.NEWSURVEY);
  };

  return (
    <Box component="div" className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography variant="h4" className={classes.surveyTitle}>
          Your Surveys
        </Typography>
        <Grid item xs={10}>
          <Grid
            container
            direction="row"
            spacing={5}
            className={classes.cardDeck}
          >
            {displaySurveys()}
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          className={classes.cardDeck}
          onClick={() => {
            onCreateSurvey();
          }}
        >
          Create new survey
        </Button>
      </Grid>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Rename</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </Box>
  );
}

export default MainPage;
