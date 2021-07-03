import { makeStyles } from "@material-ui/core/styles";
/* Old Classes */

export const appStyle = makeStyles((theme) => ({
  drawer: {
    width: 250,
  },
}));

export const mainPageStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  cardRoot: {
    minWidth: 275,
    backgroundColor: "rgba(68,122,236,0.65)",
    borderColor: "white",
    borderRadius: "15px 5px",
  },
  cardTitle: {
    color: "white",
  },
  cardContent: {
    marginLeft: theme.spacing(1),
  },
  cardActions: {
    marginLeft: theme.spacing(2),
  },
  surveyTitle: {
    margin: theme.spacing(1),
  },
  moreButton: {
    position: "relative",
    bottom: theme.spacing(0),
    right: theme.spacing(-6),
  },
  pos: {
    marginBottom: 12,
  },
  cardDeck: {
    marginTop: theme.spacing(3),
  },

  /*  New styles  */
  newCardRoot: {
    width: 280,
    height: 250,
  },
  cardActionArea: {
    height: 190,
  },
  cardText: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  cardMedia: {
    height: 100,
  },
  newCardActions: {
    display: "flex",
  },
}));

export const appBarStyle = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

/* New Classes */

export const newSurveyStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  titleDescContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    justify: "center",
    alignItems: "center",
  },
  boxTitleDescContainer: {
    width: "auto",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  cardContainer: {
    marginTop: theme.spacing(2),
  },
  bottomButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  bottomButtonsContainer: {
    justify: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

export const sectionManagerStyle = makeStyles((theme) => ({
  manageSurveyBox: {
    border: "3px solid " + theme.palette.primary.light,
    borderRadius: "30px",
    marginBottom: theme.spacing(2),
  },
}));

/* For both sectionManagerBtn and imageInputBtn */
export const sectionManagerBtnStyle = makeStyles((theme) => ({
  manageSurveyBoxIcon: {
    margin: "7px 10px",
  },
}));

/* For both content and randomizableContent */
export const contentStyle = makeStyles((theme) => ({
  sectionDecor: {
    display: "inline-block",
    border: "2px solid",
    borderColor: "#90caf9",
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 1, 1, 1),
    background: "#90caf9",
    borderRadius: "10px 10px 0px 0px",
  },
  pageContent: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  innerCardItem: {
    padding: theme.spacing(2, 2, 1, 1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  cardActions: {
    display: "flex",
  },
}));

export const contentActionsStyle = makeStyles((theme) => ({
  cardActionsRight: {
    marginLeft: theme.spacing(2),
    justifyContent: "end",
    display: "flex",
  },
  cardActionsLeft: {
    marginLeft: theme.spacing(2),
    justifyContent: "flex-end",
    flex: "1",
  },
  cardActionsDivider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export const pageStyle = makeStyles((theme) => ({
  cardItem: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "auto",
    maxWidth: "774px",
  },
  sectionManagerContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

export const questionStyle = makeStyles((theme) => ({
  questionDescription: {
    fontSize: 12,
    width: "70%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  noQuestionBlank: {
    marginTop: theme.spacing(2),
  },
  imgContainer: {
    display: "flex",
  },
  imgContent: {
    width: "50%",
    height: "50%",
    display: "inline-block",
    margin: theme.spacing(2),
  },
  removeImgBtn: {
    display: "flex",
    height: "50%",
    color: "red",
    justifySelf: "center",
    alignSelf: "center",
  },
  questionTitle: {
    width: 500,
    maxWidth: 500,
    marginRight: theme.spacing(3),
  },
  questionSelect: {
    width: "auto",
    minWidth: 160,
    maxWidth: 160,
  },
}));

export const questionTypeSelectStyle = makeStyles((theme) => ({
  questionType: {
    minWidth: "100%",
    maxWidth: "50%",
    marginTop: "-1rem",
  },
}));

export const imageStyle = makeStyles((theme) => ({
  imageTitle: {
    fontSize: 15,
    marginTop: theme.spacing(1),
  },
  imgContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  imgContent: {
    width: "20%",
    margin: theme.spacing(2),
  },
  selectAndChangeImgBtn: {
    margin: theme.spacing(2),
  },
  randomNameSelector: {
    margin: theme.spacing(2),
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
  },
  controlRandomSelector: {
    width: "100%",
    paddingTop: theme.spacing(1),
  },
}));

/* Not used now */
export const newVideoStyle = makeStyles((theme) => ({
  boxCardRoot: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  imageTitle: {
    fontSize: 15,
    width: "50%",
  },
  cardRoot: {
    minWidth: 275,
    borderColor: theme.palette.primary.light,
  },
  dragHandle: {
    alignContent: "center",
    marginTop: -12,
  },
  dragHandleIcon: {
    right: "100%",
    justifySelf: "center",
  },
  cardTitle: {
    color: "white",
  },
  cardContent: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  cardActions: {
    marginLeft: theme.spacing(2),
    float: "right",
  },
  imgContent: {
    width: "50%",
    height: "50%",
    display: "block",
    margin: theme.spacing(2),
  },
}));

export const textStyle = makeStyles((theme) => ({
  textTitle: {
    fontSize: 15,
    width: "50%",
  },
  textDescription: {
    fontSize: 12,
    width: "70%",
    marginTop: theme.spacing(2),
  },
  randomNameSelector: {
    margin: theme.spacing(2),
  },
}));

export const randomNumberStyle = makeStyles((theme) => ({
  boxCardRoot: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  placeholderTitle: {
    fontSize: 15,
    width: "50%",
    marginTop: theme.spacing(1),
  },
  cardRoot: {
    minWidth: 275,
    borderColor: theme.palette.primary.light,
  },
  dragHandle: {
    alignContent: "center",
    marginTop: -12,
  },
  dragHandleIcon: {
    right: "100%",
    justifySelf: "center",
  },
  cardContent: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  rangeText: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  rangeInput: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  cardActions: {
    display: "flex",
  },
  cardActionsRight: {
    marginLeft: theme.spacing(2),
    justifyContent: "end",
    display: "flex",
  },
  cardActionsLeft: {
    marginLeft: theme.spacing(2),
    justifyContent: "flex-end",
    flex: "1",
  },
  cardActionsDivider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export const randomGalleryStyle = makeStyles((theme) => ({
  randomImage: {
    width: 250,
  },
  textContent: {
    margin: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
}));

export const multipleChoiceQuestionStyle = makeStyles((theme) => ({
  fieldContainer: {
    marginTop: theme.spacing(1),
  },
  textField: {
    width: "40%",
  },
  addOptionBtn: {
    marginTop: theme.spacing(1),
  },
  removeOptionBtn: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    color: "red",
  },
}));

export const linearScaleQuestionStyle = makeStyles((theme) => ({
  fieldContainer: {
    marginTop: theme.spacing(1),
  },
  textField: {
    width: "40%",
  },
  rangeSelectContainer: {
    display: "block",
    paddingTop: theme.spacing(2),
  },
  rangeSelectItem: {
    float: "left",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  labelChangeContainer: {
    display: "block",
    clear: "both",
    paddingTop: theme.spacing(2),
  },
  labelChangeItem: {
    display: "block",
    marginTop: theme.spacing(1),
  },
  gridContainer: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
  },
}));
