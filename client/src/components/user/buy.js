import React, { Component } from "react";
import axios from "axios";
import Card from "../utils/card";
class Buy extends Component {
  state = {
    TYPE: "",
    USERNAME: window.history.state,
    data: []
    // type -ALL,HOSTEL,ARTS,ELECTRONICS,BOOK
  };
  handleOnClick = itype => {
    console.log("inside handleOnClick this.state:", this.state);
    let x = this.state;
    this.setState({ TYPE: itype });
    if (itype === this.state.TYPE) {
      return;
    } else if (itype === "ALL") {
      axios.get(`/user/all?USERNAME=${this.state.USERNAME}`).then(res => {
        console.log("res:", res.data);
        this.setState({ data: res.data });
      });
    } else if (itype === "HOSTEL") {
      axios.get(`/user/hostel?USERNAME=${this.state.USERNAME}`).then(res => {
        console.log("res:", res.data);
        this.setState({ data: res.data });
      });
    } else if (itype === "ARTS") {
      axios.get(`/user/arts?USERNAME=${this.state.USERNAME}`).then(res => {
        console.log("res:", res.data);
        this.setState({ data: res.data });
      });
    } else if (itype === "ELECTRONICS") {
      axios
        .get(`/user/electronics?USERNAME=${this.state.USERNAME}`)
        .then(res => {
          console.log("res:", res.data);
          this.setState({ data: res.data });
        });
    } else if (itype === "BOOK") {
      axios.get(`/user/book?USERNAME=${this.state.USERNAME}`).then(res => {
        console.log("res:", res.data);
        this.setState({ data: res.data });
      });
    }
  };

  renderCards = () =>
    this.state.data.length > 0 ? (
      <div>
        {this.state.data.map((val, i) => (
          <Card key={i} data={this.state.data[i]} uname={this.state.USERNAME} />
        ))}
      </div>
    ) : null;

  render() {
    console.log(this.state);
    if (window.history.state === null) {
      window.history.pushState({}, "Logout", "/");
      window.history.go(0);
    }
    window.scrollTo(0, 0);
    return (
      <div>
        <h2>Hello {this.state.USERNAME}</h2>
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
        <div style={{ marginBottom: "10px" }}>
          <div
            style={{ color: "#bfff00", cursor: "pointer" }}
            onClick={() => window.history.go(-1)}
          >
            GO BACK
          </div>
        </div>
        {this.state.data.length > 0 ? (
          this.renderCards()
        ) : (
          <div
            style={{ fontSize: "17px", fontWeight: "700", color: "#f32133" }}
          >
            No items of the following category currently available!
          </div>
        )}
      </div>
    );
  }
}

export default Buy;
