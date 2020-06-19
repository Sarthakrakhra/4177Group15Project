import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Thread from "./Pages/Thread";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import LoginRegistration from "./Pages/LoginRegistration";
import Navigation from "./Components/Navigation";
import NotFound from "./Pages/NotFound";
import ExpandedThread from "./Components/ExpandedThread";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <div>
          <Switch>
            <Route path="/" component={Home} exact></Route>
            <Route
              exact
              path={`/thread/:threadId`}
              component={ExpandedThread}
            />
            <Route path="/thread" component={Thread}></Route>
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
