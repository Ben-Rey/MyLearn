import React, { Component } from "react";

//Routes
import { Router, Route } from "react-router-dom";
import Protected from "../tools/hoc/ProtectedRoutes";

import history from "../history";

//Component
import Home from "../container/home/home";
import GlobalSidebar from "../components/ui/Sidebar/GlobalSidebar";

//Styles ???

//Redux
import { Provider } from "react-redux";
import store from "../store/store";
import { setCurrentUser } from "../store/actions/authentication";

import setAuthToken from "../tools/setAuthToken";
import jwt_decode from "jwt-decode";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  // const currentTime = Date.now() / 1000;
  // if (decoded.exp < currentTime) {
  //   store.dispatch(logoutUser());
  //   window.location.href = "/";
  // }
}

class App extends Component {
  render() {
    const isAuthenticated = store.getState().auth.isAuthenticated;
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route exact path="/" component={Home} />
          <Protected
            path="/GlobalSidebar"
            component={GlobalSidebar}
            isAuthenticated={isAuthenticated}
          />
        </Router>
      </Provider>
    );
  }
}

export default App;
