import React, { Component } from "react";
class Login extends Component {
  state = {};
  render() {
    return (
      <div className="ipenninner-container">
        <div className="ipennheader">Login</div>
        <div className="ipennbox">
          <div className="ipenninput-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="ipennlogin-input"
              placeholder="Username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="ipennlogin-input"
              placeholder="Password"
            />
          </div>

          <button
            type="button"
            className="ipennlogin-btn"
            onClick={() => console.log("Button Clicked")}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
