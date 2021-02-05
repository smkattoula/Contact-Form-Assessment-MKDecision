import React, { useState } from "react";
import { SECRET, REGION } from "./Config";
import axios from "axios";
import { Alert } from "@material-ui/lab";
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Modal,
  Backdrop,
  Fade,
  makeStyles,
} from "@material-ui/core";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");
  const [open, setOpen] = useState("");
  const [disable, setDisable] = useState(false);

  const api = `https://${SECRET}.execute-api.${REGION}.amazonaws.com/dev/email/send`;

  const data = {
    name: name,
    email: email,
    message: message,
  };

  const sendEmail = () => {
    axios
      .post(api, data)
      .then(() => {
        console.log(data);
      })
      .catch((error) => {
        console.log("Server Error");
      });
  };

  const handleOpen = () => {
    if (name === "" || email === "" || message === "") {
      return setAlert(<Alert severity="error">Please enter all fields</Alert>);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clearFields = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  const submitDisable = () => {
    setDisable(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendEmail(name, email, message);
    setAlert(<Alert severity="success">Message sent!</Alert>);
    clearFields();
    handleClose();
    submitDisable();
  };
  const classes = useStyles();

  return (
    <Container>
      <Paper elevation={10} className={classes.paperStyle}>
        <form id="formId" className={classes.form} onSubmit={onSubmit}>
          {alert}
          <Typography
            className={classes.typography}
            component="h1"
            variant="h4"
            align="center"
          >
            Contact us
          </Typography>
          <TextField
            className={classes.textField}
            onChange={(e) => setName(e.target.value)}
            value={name}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            className={classes.textField}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            className={classes.textField}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="message"
            label="Message"
            name="message"
            multiline
            rows={12}
          />
          <Button
            className={classes.button}
            onClick={handleOpen}
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            disabled={disable}
          >
            Submit
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            className={classes.modal}
            open={open}
            closeAfterTransition
            onClose={handleClose}
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.modalPaper}>
                <h2 id="transition-modal-title">Are you sure?</h2>
                <Button
                  type="submit"
                  form="formId"
                  variant="contained"
                  color="primary"
                >
                  Yes
                </Button>{" "}
                <Button
                  type="button"
                  onClick={handleClose}
                  variant="contained"
                  color="secondary"
                >
                  No
                </Button>
              </div>
            </Fade>
          </Modal>
        </form>
      </Paper>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    paddingTop: "30px",
    height: "45rem",
    width: "0px auto",
  },
  form: {
    padding: "10px 40px",
  },
  typography: {
    marginBottom: "10px",
  },
  textField: {
    marginBottom: "5px",
    paddingBottom: "20px",
  },
  button: {
    padding: "10px",
    marginTop: "5px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default ContactForm;
