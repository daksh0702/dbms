import React, { Component } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import ShowCard from "../utils/showcard";
class Bids extends Component {
  state = {
    USERNAME: window.history.state,
    data: []
    // dets:[],
  };

  handlSubmit = e => {
    console.log("Submitting");
    let x = this.state;
    axios
      .get(`/getbids?USERNAME=${this.state.USERNAME}`)
      .then(res => {
        res = res.data;
        console.log("BIDS:", res);
        this.setState({ ...this.state, res });
      })
      .catch(err => {
        console.log("ERROR");
      });
  };

  renderCards = () =>
    this.state.data.length > 0 ? (
      <div>
        {this.state.data.map((val, i) => (
          <ShowCard key={i} data={this.state.data[i]} k={i} />
        ))}
      </div>
    ) : null;

  render() {
    console.log(this.state);
    if (this.state.USERNAME === null) {
      window.history.pushState({}, "Logout", "/");
      window.history.go(0);
    }
    window.scrollTo(0, 0);
    return (
      <div>
        <h2>Hello {this.state.USERNAME}</h2>

        {/* <Button onClick={() => this.handlDets() } color="primary" > */}
        <Button
          onClick={() => this.handlSubmit()}
          color="primary"
          style={{ float: "center" }}
        >
          Show Bids
        </Button>
        {/* </Button> */}
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
            No bid placed yet!
          </div>
        )}
      </div>
    );
  }
}

export default Bids;
