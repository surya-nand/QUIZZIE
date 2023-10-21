import React from "react";
import { useState } from "react";
import axios from 'axios';

// const [loginActive, setLoginActive] = useState(false);

function Homepage() {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleRegisterInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignupActiveButton = () => {
    if (!signupActive) {
      setSignupActive(!signupActive);
    }
  };
  const handleLoginActiveButton = () => {
    if (signupActive) {
      setSignupActive(!signupActive);
    }
  };

  const [signupActive, setSignupActive] = useState(true);

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();

  }

  return (
    <div className="homepage">
      <div className="app-title">
        <h1>QUIZZIE</h1>
      </div>
      <div className="login-signup-buttons">
        <button onClick={handleSignupActiveButton}>Sign Up</button>
        <button onClick={handleLoginActiveButton}>Log In</button>
      </div>
      <div className="user-details">
        {signupActive ? (
          <form method='POST' onSubmit={handleRegisterFormSubmit}>
            <div className="registration-details">
              <div className="username-input">
                <p>Name</p>
                <input
                  className="user-name"
                  type="name"
                  name="username"
                  value={registerData.username}
                  onChange={handleRegisterInputChange}
                ></input>
              </div>
              <div className="email-input">
                <p>Email</p>
                <input
                  className="user-email"
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterInputChange}
                ></input>
              </div>
              <div className="username-password">
                <p>Password</p>
                <input
                  className="user-password"
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterInputChange}
                ></input>
              </div>
              <div className="username-confirm-password">
                <p>Confirm Password</p>
                <input
                  className="user-confirm-password"
                  type="password"
                  name="confirmpassword"
                  value={registerData.confirmpassword}
                  onChange={handleRegisterInputChange}
                ></input>
              </div>
              <button
              type="submit"
              className="signup-button"
              >
                Sign up
              </button>
            </div>
          </form>
        ) : (
          <form method="POST" onSubmit={handleLoginFormSubmit}>
            <div className="login-details">
              <div className="email-input">
                <p>Email</p>
                <input
                  className="user-email"
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginInputChange}
                ></input>
              </div>
              <div className="username-password">
                <p>Password</p>
                <input
                  className="user-password"
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginInputChange}
                ></input>
              </div>
              <button
              type="submit"
              className="login-button"
              >
                Log In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Homepage;
