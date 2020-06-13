import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Forum from "./Pages/Forum";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import LoginRegistration from "./Pages/LoginRegistration";
import Navigation from "./Components/Navigation";
import NotFound from "./Pages/NotFound";
import ExpandedForum from "./Components/ExpandedForum";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <div>
          <Switch>
            <Route path="/" component={Home} exact></Route>
            <Route exact path={`/forum/:forumId`} component={ExpandedForum} />
            <Route path="/forum" component={Forum}></Route>
            <Route path="/loginRegister" component={LoginRegistration}></Route>
            <Route path="/search" component={Search}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
