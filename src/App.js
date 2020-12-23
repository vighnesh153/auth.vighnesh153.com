import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Root from "./components/Root";

function App() {
  return (
    <Router>
      <Switch>
        <Route component={Root} />
      </Switch>
    </Router>
  );
}

export default App;
