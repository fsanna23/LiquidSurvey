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
    right: theme.spacing(-15),
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
  surveyGrid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  surveyForm: {
    marginTop: theme.spacing(2),
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
  },
  manageSurveyBox: {
    border: "0.4px solid black",
    borderRadius: "10px",
  },
  manageSurveyBoxIcon: {
    margin: "2px",
  },
}));
export const newQuestionStyle = makeStyles((theme) => ({
  boxCardRoot: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  questionTitle: {
    fontSize: 15,
    width: "50%",
  },
  questionType: {
    marginLeft: theme.spacing(10),
    width: "30%",
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
    marginLeft: theme.spacing(2),
    float: "right",
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
}));
