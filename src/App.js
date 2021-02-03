import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import ContactForm from "./Components/ContactForm";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ContactForm} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
