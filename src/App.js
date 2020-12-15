import React, {useEffect} from "react";

import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <h2>App component</h2>
        <a href="http://localhost:3001/auth/github">
          Login
        </a>
      </div>
    </Router>
  );
}

export default App;
