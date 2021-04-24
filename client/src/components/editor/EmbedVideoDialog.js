/*
    Dialog for adding a video to the survey.
    Edit as needed since it's from the early versions of the app.
*/

function EmbedVideoDialog(props) {
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Embed video</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To embed a YouTube video into the survey, please insert its URL.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="embedvideourlfield"
          label="URL"
          type="url"
          fullWidth
          onChange={handleChange}
          value={url}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.handleClose();
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            props.handleSubmit(url);
            props.handleClose();
          }}
          color="primary"
        >
          Embed
        </Button>
      </DialogActions>
    </Dialog>
  );
}
