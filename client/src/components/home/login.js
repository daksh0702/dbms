import React, { Component } from "react";
import axios from "axios";
class Login extends Component {
  state = {
    USERNAME: "",
    PASSWORD: "",
    loginSuccess: "",
    formSuccess: ""
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { USERNAME, PASSWORD } = this.state;
    if (USERNAME === "" || PASSWORD === "") {
      this.setState({ formSuccess: "false" });
    } else {
      axios
        .post("/login", { ...this.state })
        .then(res => {
          console.log(res);
          window.history.pushState(
            this.state.USERNAME,
            "login",
            "/userdashboard"
          );
          window.history.go(0);
        })
        .catch(err => {});
    }
  };
  render() {
    console.log(this.state);
    return (
      <div className="ipenninner-container">
        <form onSubmit={this.handleSubmit}>
          <div className="ipennheader">Login</div>
          <div className="ipennbox">
            <div className="ipenninput-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="USERNAME"
                className="ipennlogin-input"
                placeholder="Username"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="PASSWORD"
                className="ipennlogin-input"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </div>

            <button type="sumbit" className="ipennlogin-btn">
              Login
            </button>
          </div>
        </form>
        {this.state.formSuccess === "false" ? (
          <div>Enter Username and password to login</div>
        ) : null}
      </div>
    );
  }
}

export default Login;
