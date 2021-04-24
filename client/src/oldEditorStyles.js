import { makeStyles } from "@material-ui/core/styles";
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
    backgroundColor: "#6b6b6b",
    borderColor: "black",
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
}));
export const appBarStyle = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
export const newSurveyStyle = makeStyles((theme) => ({
  // OLD STYLES
  surveyGrid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  surveyForm: {
    marginTop: theme.spacing(2),
  },
  sectionNameContainer: {
    padding: theme.spacing(1),
    borderBottom: "2px solid red",
    borderLeft: "2px solid red",
    borderRight: "2px solid red",
    borderBottomLeftRadius: "2px",
    borderBottomRightRadius: "2px",
    marginBottom: theme.spacing(1),
  },
  titleInput: {
    fontSize: 40,
  },
  titleInputBox: {
    margin: theme.spacing(0),
  },
  descInput: {
    fontSize: 24,
    marginTop: theme.spacing(3),
  },
  questionsContainerGrid: {
    marginTop: theme.spacing(2),
    border: "2px solid red",
    borderRadius: "10px",
  },
  questionsContainerGridHidden: {
    marginTop: theme.spacing(2),
  },
  manageSurveyBox: {
    border: "0.4px solid black",
    borderRadius: "10px",
    marginBottom: theme.spacing(2),
    height: "50px",
    width: "263px",
  },
  manageSurveyBoxSection: {
    border: "0.4px solid black",
    borderRadius: "10px",
    marginBottom: theme.spacing(2),
    height: "50px",
    width: "316px",
  },
  manageSurveyBoxIcon: {
    margin: "2px",
  },
  bottomButtonsContainer: {
    justify: "center",
    marginTop: theme.spacing(4),
  },
  bottomButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  // NEW STYLES
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
}));
export const newQuestionStyle = makeStyles((theme) => ({
  // OLD STYLES
  boxCardRoot: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  questionDescription: {
    fontSize: 12,
    width: "70%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  questionType: {
    minWidth: "50%",
    maxWidth: "100%",
  },
  questionTypeRenderValue: {
    paddingLeft: theme.spacing(1),
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
  // NEW STYLES
  cardItem: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "auto",
  },
  innerCardItem: {
    padding: theme.spacing(2, 2, 1, 1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
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
  noQuestionBlank: {
    marginTop: theme.spacing(2),
  },
  sectionManagerContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));
export const newImageStyle = makeStyles((theme) => ({
  boxCardRoot: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  imageTitle: {
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
  cardTitle: {
    color: "white",
  },
  cardContent: {
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
  imgContent: {
    width: "50%",
    height: "50%",
    display: "block",
    margin: theme.spacing(2),
  },
  selectAndChangeImgBtn: {
    margin: theme.spacing(2),
  },
  randomNameSelector: {
    margin: theme.spacing(2),
  },
}));
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
export const newTextFieldStyle = makeStyles((theme) => ({
  boxCardRoot: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  textTitle: {
    fontSize: 15,
    width: "50%",
  },
  textDescription: {
    fontSize: 12,
    width: "70%",
    marginTop: theme.spacing(2),
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
export const newRandomNumberStyle = makeStyles((theme) => ({
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
}));
