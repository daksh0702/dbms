import React, { Component } from "react";
class Header extends Component {
  render() {
    return (
      <header className="bck_b_light">
        <div className="container">
          <div className="left">
            <div className="logo">TU_SHOP</div>
          </div>
          <div className="right">
            {/* <div className="top">{this.showLinks(this.state.user)}</div>
            <div className="bottom">{this.showLinks(this.state.page)}</div> */}
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
