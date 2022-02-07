import React from "react";
import FormInput from "./../form-input/form-input.component";
import CustomButton from "./../custom-button/custom-button.component";
import {
  auth,
  createUserProfileDocument,
} from "./../../firebase/firebase.utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./sign-up.styles.scss";
import { connect } from "react-redux";
import { signUpStart } from "./../../redux/user/user.actions";
class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    //1 Check if password and confirm password are the same
    const { displayName, email, password, confirmPassword } = this.state;
    const { signUpStart } = this.props;
    if (password !== confirmPassword) {
      alert("Your password and confirm password are not the same");
      return;
      // } else {
      //   //2.if password is good, use createUserWithEmailAndPassword
      //   try {
      //     //create an user wuth auth.createUser of google auth
      //     const { user } = await createUserWithEmailAndPassword(
      //       auth,
      //       email,
      //       password
      //     );

      //     //3.run create user profile to save user to DB
      //     //use {displayName} to appear in user data
      //     await createUserProfileDocument(user, { displayName });
      //     //4. Set state to empty
      //     this.setState({
      //       displayName: "",
      //       email: "",
      //       password: "",
      //       confirmPassword: "",
      //     });
      //   } catch (error) {
      //     alert(error.message);
      //   }
    } else {
      signUpStart(displayName, email, password);
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };
  render() {
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form action="" className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={this.state.displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />
          <FormInput
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit" onSubmit={this.handleSubmit}>
            Sign Up
          </CustomButton>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (displayName, email, password) => {
    return dispatch(signUpStart({ displayName, email, password }));
  },
});
export default connect(null, mapDispatchToProps)(SignUp);
