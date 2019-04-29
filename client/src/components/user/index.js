import React, { Component } from "react";
class UserDashboard extends Component {
  handleBuy = () => {
    window.history.pushState(window.history.state, "buy", "/userdashboard/buy");
    window.history.go(0);
  };

  handleBids = () => {
    window.history.pushState(window.history.state, "bids", "/userdashboard/bids");
    window.history.go(0);
  };
  handleSell = () => {
    window.history.pushState(
      window.history.state,
      "sell",
      "/userdashboard/sell"
    );
    window.history.go(0);
  };
  render() {
    console.log(window.history.state);
    window.scrollTo(0, 0);
    return (
      <div style={{ cursor: "pointer" }}>
        <div style={{ float: "left", fontSize: "200%", cursor: "text" }}>
          WELCOME ! {window.history.state}.
        </div>
        <div
          onClick={() => {
            window.history.pushState({}, "Logout", "/");
            window.history.go(0);
          }}
          style={{ float: "right", fontSize: "110%", color: "#ff8080" }}
        >
          LOGOUT
        </div>
        <br />
        <br />
        <ul>
          <li onClick={this.handleBuy}>BUY</li>
          <li onClick={this.handleSell}>SELL</li>
          <li onClick={this.handleBids}>CURRENT BIDS</li>
        </ul>
      </div>
    );
  }
}

export default UserDashboard;
