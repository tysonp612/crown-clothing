import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import "./App.css";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { onSnapshot } from "firebase/firestore";

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
    //async await becasue we are waiting the result from createUserProfileDocument (must use or code get broken)
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //Check if there is any user signing in
      if (userAuth) {
        // fire function to save user to database
        const userRef = await createUserProfileDocument(userAuth);
        //using onSnapshot will send us information about data being stored in DB, we get back snapshot object
        onSnapshot(userRef, (snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
          console.log(this.state);
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
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
        {/* pass current user as prop to check if there is any current user, if
        yes, change header to signout */}
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
