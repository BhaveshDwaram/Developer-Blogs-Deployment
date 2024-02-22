import Read from "./pages/read/Read";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Home from "./pages/home/Home";

import Footer from "../src/components/Footer/Footer"
import AboutUs from "./components/About us/Aboutus";


function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <div className="App">
     
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/About us"><AboutUs /></Route>
        <Route path="/read">{user ? <Read /> : <Login />}</Route>
        <Route path="/register">{user ? <Read/> : <Register />}</Route>
        <Route path="/login">{user ? <Read /> : <Login />}</Route>
        <Route path="/write">{user ? <Write /> : <Login />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Register />}</Route>
        <Route path="/post/:postId">
          <Single />
        </Route>
      </Switch>
      <Footer/>
      </div>

    </Router>
  );
}

export default App;
