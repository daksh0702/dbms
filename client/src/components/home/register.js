import React, { Component } from "react";
import axios from "axios";
class Register extends Component {
  state = {
    NAME: "",
    USERNAME: "",
    PASSWORD: "",
    ADDRESS: "",
    PHONE: "",
    registerSuccess: "",
    formSuccess: [false, ""]
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let x = this.state;
    if (
      (x.PHONE.length !== 10 || !/^\d+$/.test(x.PHONE)) &&
      x.PHONE.length > 0
    ) {
      this.setState({ formSuccess: [false, "phone"] });
    } else if (
      x.NAME === "" ||
      x.USERNANAME === "" ||
      x.PASSWORD === "" ||
      x.ADDRESS === "" ||
      x.PHONE === "" ||
      x.PHONE.length !== 10
    ) {
      this.setState({ formSuccess: [false, "formfields"] });
    } else {
      axios
        .post("/register", { ...this.state })
        .then(res => {
          console.log(res);
          let data = res.data.registerSuccess;

          if (data === "true")
            this.setState({ registerSuccess: "true", formSuccess: [true, ""] });
          else
            this.setState({
              registerSuccess: "false",
              formSuccess: [true, ""]
            });
          if (res.data.redirect === "/") {
            setTimeout(() => {
              window.location = "/";
            }, 2000);
          }
        })
        .catch(err => {
          console.log("Error in axios post", err);
        });
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className="ipenninner-container">
        <form onSubmit={this.handleSubmit}>
          <div className="ipennheader">Register</div>
          <div className="ipennbox">
            <div className="ipenninput-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="USERNAME"
                className="ipennlogin-input"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>

            <div className="ipenninput-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="NAME"
                className="ipennlogin-input"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>

            <div className="ipenninput-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="PASSWORD"
                className="ipennlogin-input"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>

            <div className="ipenninput-group">
              <label htmlFor="Address">Address</label>
              <input
                type="text"
                name="ADDRESS"
                className="ipennlogin-input"
                placeholder="Address"
                value={this.state.address}
                onChange={this.handleChange}
              />
            </div>
            <div className="ipenninput-group">
              <label htmlFor="Phone">Phone</label>
              <input
                type="text"
                name="PHONE"
                className="ipennlogin-input"
                placeholder="Enter 10 digit Mobile no."
                value={this.state.phone}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="ipennlogin-btn">
              Register
            </button>
          </div>
        </form>
        {this.state.formSuccess[0] === true &&
        this.state.registerSuccess === "true" ? (
          <div style={{ color: "#ADFF2F" }}>Registration Successful!</div>
        ) : null}
        {this.state.formSuccess[0] === true &&
        this.state.registerSuccess === "false" ? (
          <div style={{ color: "#FF0000" }}>
            Registration failed. Username already exists.
          </div>
        ) : null}
        {this.state.formSuccess[0] === false &&
        this.state.formSuccess[1] === "phone" ? (
          <div style={{ color: "#FF0000" }}>
            Please enter valid 10 digit phone no
          </div>
        ) : null}
        {this.state.formSuccess[0] === false &&
        this.state.formSuccess[1] === "formfields" ? (
          <div style={{ color: "#FF0000" }}>
            Please fill all the details in the form correctly
          </div>
        ) : null}
      </div>
    );
  }
}
export default Register;
