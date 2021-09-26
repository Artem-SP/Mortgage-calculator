import React from "react";
import banks from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap";
import { useRoutes } from "./routes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

function App(banks) {
  const routes = useRoutes();
  return (
    <div>
      <Router>
        <div>{routes}</div>
      </Router>
    </div>
  );
}

export default App;
