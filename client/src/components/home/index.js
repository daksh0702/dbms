import React, { Component } from "react";
import Register from "./register";
import Login from "./login";
class Home extends Component {
  state = {
    register: true
  };
  render() {
    return (
      <div className="ipennbox-container">
        <div
          style={{
            textAlign: "center",
            cursor: "pointer"
          }}
        >
          <div
            style={{ display: "inline" }}
            onClick={() => this.setState({ register: false })}
          >
            Login
          </div>

          <div
            style={{ display: "inline", marginLeft: "50%" }}
            onClick={() => this.setState({ register: true })}
          >
            Register
          </div>
        </div>

        {this.state.register ? <Register /> : <Login />}
      </div>
    );
  }
}

export default Home;
