import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import "./App.css";
import Header from "./components/header/header.component";
import { auth } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }
  //this is open subscription between the app and firebase, we also have to unsubscribe to avoid memory leak
  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
      console.log(user);
    });
  }

  //   line 21: unsubscribeFromAuth is initialised as null

  // line 24: unsubscribeFromAuth is reassigned to the return value of calling auth.onAuthStateChanged(). Yihua doesn't say this in the vid but this method returns another method: firebase.unsubscribe().

  // (see docs here: https://firebase.google.com/docs/reference/js/firebase.auth.Auth#returns-firebase.unsubscribe)

  // line 32: so when unsubscribeFromAuth() is called inside the componentWillUnmount, it now has the value of firebase.unsubscribe(), which executes, closing the session.
  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  };
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/registration" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
