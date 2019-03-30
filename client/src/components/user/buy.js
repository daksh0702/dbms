import React, { Component } from "react";
import axios from "axios";
class Buy extends Component {
  state = {
    type: "ALL"
    // type -ALL,HOSTEL,ARTS,ELECTRONICS,BOOK
  };

  handleOnClick = itype => {
    console.log("inside handleOnClick", this.state);
    let x = this.state;
    this.setState({ type: itype });
    if (x.type === "ALL") {
      axios.get("/user/all").then(res => {
        console.log("res:", res);
      });
    } else if (x.type === "HOSTEL") {
    } else if (x.type === "ARTS") {
    } else if (x.type === "ELECTRONICS") {
    } else if (x.type === "BOOK") {
    }
  };

  bringProducts() {}
  render() {
    console.log(this.state);
    window.scrollTo(0, 0);
    return (
      <div>
        <h2>Select Category</h2>
        <ul style={{ cursor: "pointer" }}>
          <li onClick={() => this.handleOnClick("ALL")}>All Categories</li>
          <li onClick={() => this.handleOnClick("HOSTEL")}>Hostel Stuff</li>
          <li onClick={() => this.handleOnClick("ARTS")}>
            Collection(artwork)
          </li>
          <li onClick={() => this.handleOnClick("ELECTRONICS")}>
            Electronic gadgets
          </li>
          <li onClick={() => this.handleOnClick("BOOK")}>Books/Notes</li>
        </ul>
        <hr />
        <div
          style={{ float: "left", color: "#bfff00", cursor: "pointer" }}
          onClick={() => window.history.go(-1)}
        >
          GO BACK
        </div>
        <div
          style={{ float: "right", color: "#ff8080", cursor: "pointer" }}
          onClick={() => {
            window.history.pushState({}, "Logout", "/");
            window.history.go(0);
          }}
        >
          LOGOUT
        </div>
      </div>
    );
  }
}

export default Buy;
