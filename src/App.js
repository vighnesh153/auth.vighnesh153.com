import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Main from "./main";

function App() {
  return (
    <Router>
      <Switch>
        <Route component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
