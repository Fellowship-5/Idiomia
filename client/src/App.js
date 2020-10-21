import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./pages/layout/Navbar";

import "./App.css";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer newestOnTop autoClose={2000} />
        <Navbar />
        <Switch>
          <Route exact path="/">
            <div className="App">This is a homepage</div>
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
