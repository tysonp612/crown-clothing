import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import "./App.css";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { onSnapshot } from "firebase/firestore";
import { connect } from "react-redux";
import setCurrentUser from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";
import { createStructuredSelector } from "reselect";
class App extends React.Component {
  //this is open subscription between the app and firebase, we also have to unsubscribe to avoid memory leak
  unsubscribeFromAuth = null;
  componentDidMount() {
    //async await becasue we are waiting the result from createUserProfileDocument (must use or code get broken)
    //these line below is to listen to any change of auth sate, then setState of signned in user acorrdingly
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //Check if there is any user signing in
      if (userAuth) {
        // fire function to save user to database
        const userRef = await createUserProfileDocument(userAuth);
        //using onSnapshot will send us information about data being stored in DB, we get back snapshot object
        onSnapshot(userRef, (snapShot) => {
          //Before, we use this.setState, but after we map dispatch to prop, we use prop as a function to set currentUser with this id and data
          this.props.setCurrentUser({ id: snapShot.id, ...snapShot.data() });
        });
      } else {
        this.props.setCurrentUser(userAuth);
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
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() => {
              return this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              );
            }}
          />
          {/* <Route exact path="/registration" component={SignInAndSignUpPage} /> */}
        </Switch>
      </div>
    );
  }
}
//Set a function to props to replace setState
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
