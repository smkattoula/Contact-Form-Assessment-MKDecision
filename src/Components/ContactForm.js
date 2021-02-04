import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [open, setOpen] = useState(false);

  const api =
    "https://rnlgghyao7.execute-api.us-east-2.amazonaws.com/dev/email/send";

  const data = {
    name: `${name}`,
    email: `${email}`,
    content: `${message}`,
  };

  const sendEmail = () => {
    axios
      .post(api, data)
      .then((res) => {
        console.log("Email sent successfully!");
      })
      .catch((error) => {
        console.log("Error");
      });
  };

  const handleOpen = () => {
    if (name === "" || email === "" || message === "") {
      return null;
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

  const onSubmit = (e) => {
    e.preventDefault();
    sendEmail(name, email, message);
    clearFields();
    handleClose();
  };
  const classes = useStyles();

  return (
    <Container>
      <Paper elevation={10} className={classes.paperStyle}>
        <form id="formId" className={classes.form} onSubmit={onSubmit}>
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
            autoFocus
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
