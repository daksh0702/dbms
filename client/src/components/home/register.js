import React, { Component } from "react";
class Register extends Component {
  state = {};
  render() {
    return (
      <div className="ipenninner-container">
        <div className="ipennheader">Register</div>
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

          <div className="ipenninput-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="ipennlogin-input"
              placeholder="Email"
            />
          </div>

          <div className="ipenninput-group">
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
            onClick={() => console.log("button Clicked")}
          >
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
