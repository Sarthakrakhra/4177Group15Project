import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import LoginRegistration from "./Pages/LoginRegistration";
import Navigation from "./Components/Navigation";
import NotFound from "./Pages/NotFound";
import ExpandedThread from "./Components/ExpandedThread";
import Forums from "./Pages/Forums";
import ExpandedForum from "./Components/ExpandedForum";
import ManageForum from "./Pages/ManageForum";
import NewThread from "./Pages/NewThread";
import Messaging from "./Pages/Messaging";
import ActualMessaging from "./Pages/ActualMessaging";
import Notifications from "./Pages/Notifications";

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
            <Route
              exact
              path={`/forums/:forumId/manage`}
              component={ManageForum}
            />
            <Route
              exact
              path={`/forums/:forumId/newThread`}
              component={NewThread}
            />
            <Route exact path={`/forums/:forumId`} component={ExpandedForum} />
            <Route path="/forums" component={Forums}></Route>
            <Route path="/loginRegister" component={LoginRegistration}></Route>
            <Route path="/search" component={Search}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/messaging" component={Messaging}></Route>
            <Route path="/actualMessaging" component={ActualMessaging}></Route>
            <Route path="/Notifications" component={Notifications}></Route>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
