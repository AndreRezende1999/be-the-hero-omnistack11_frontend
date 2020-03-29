import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Logon";
import Register from "./pages/Register";
import Profile from "./pages/Profiles";
import NewIncident from "./pages/NewIncident";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon}></Route>
        <Route path="/Register" component={Register}></Route>
        <Route path="/Profile" component={Profile}></Route>
        <Route path="/Incident/New" component={NewIncident}></Route>
      </Switch>
    </BrowserRouter>
  );
}
