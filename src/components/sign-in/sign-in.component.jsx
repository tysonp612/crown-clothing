import React, { useState } from "react";
import { connect } from "react-redux";
import "./sign-in.styles.scss";
import FormInput from "./../form-input/form-input.component";
import CustomButton from "./../custom-button/custom-button.component";
import {
  googleSignInStart,
  emailSignInStart,
} from "./../../redux/user/user.actions";
// import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userCredentials;
  const handleSubmit = async (e) => {
    e.preventDefault();
    //To Sign In with Email And password
    //1, Import signInWithEmailAndPassword, then detruct email and password from state

    emailSignInStart(email, password);
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...userCredentials, [name]: value });
    //     Because name is a string that represents "email" or "password".To compute to property we use this.setState({[name]: value})
    // ES5 syntax that is equivalent to this.setState({["email"]: value})
    // and also equivalent to this.setState({email: value}) (normal syntax).
  };

  return (
    <div className="sign-in">
      <h2>I already have account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput //to use reusable form, pass everything as prop
          name="email"
          type="email"
          value={email} //value in form in React will get data from state
          required
          handleChange={handleChange} //handle onChange when data is inputted, set state with changes
          label="email"
        />

        <FormInput
          name="password"
          type="password"
          value={password}
          required
          handleChange={handleChange}
          label="password"
        />
        <div className="buttons">
          <CustomButton type="submit" value="Submit Form">
            Sign In
          </CustomButton>
          <CustomButton
            type="button"
            // onClick={signInWithGoogle}
            onClick={googleSignInStart}
            isGoogleSignIn
            value="Submit Form"
          >
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};
// Ollie, this is ES6 object property shorthand.
// In sign-in.component.jsx:
// mapDispatchToProps emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
// is equivalent to
// mapDispatchToProps emailSignInStart: (email, password) => dispatch(emailSignInStart({ email: email, password: password }))
const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});
export default connect(null, mapDispatchToProps)(SignIn);
