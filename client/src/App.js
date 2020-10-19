import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <div className="App">This is a homepage</div>
          </Route>
          <Route exact path="/test">
            This is a test page
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
