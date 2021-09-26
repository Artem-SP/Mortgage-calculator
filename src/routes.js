import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { BanksPage } from "./pages/BanksPage";
import { CalculatorPage } from "./pages/CalculatorPage";

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/banks" exact component={BanksPage}></Route>
      <Route path="/calc" exact component={CalculatorPage}></Route>
      <Redirect to="/banks" />
    </Switch>
  );
};
