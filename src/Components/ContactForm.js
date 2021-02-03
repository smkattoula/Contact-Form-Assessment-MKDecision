import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  makeStyles,
} from "@material-ui/core";

const ContactForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const classes = useStyles();

  return (
    <Container>
      <Paper elevation={10} className={classes.paperStyle}>
        <form className={classes.form}>
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

const useStyles = makeStyles(() => ({
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
}));

export default ContactForm;
