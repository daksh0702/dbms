import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Row,
  Col,
  Popover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
class Card extends Component {
  state = {
    popoverOpen: false,
    NAME: "",
    ADDRESS: "",
    PHONE: "",
    PRODUCTNO: this.props.data.PRODUCTNO,
    value: ""
  };
  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };
  handleBuy = () => {
    let value = { USERNAME: this.props.data.USERNAME };
    console.log("obj username:", value);
    axios.get(`/user?USERNAME=${this.props.data.USERNAME}`).then(res => {
      res = res.data;
      this.setState({
        NAME: res.NAME,
        ADDRESS: res.ADDRESS,
        PHONE: res.PHONE
      });
      console.log("HandleBuy res:", res);
    });
  };

  render() {
    let x = this.props.data.PRODUCTNO.toString();
    x = x
      .replace("1", "a")
      .replace("2", "b")
      .replace("3", "c")
      .replace("4", "d")
      .replace("5", "e")
      .replace("6", "f")
      .replace("7", "g")
      .replace("8", "h")
      .replace("9", "i")
      .replace("0", "j");
    console.log("Card props", this.props.data);
    const {
      PRODUCTNO,
      PRODUCTNAME,
      TYPE,
      DESCRIPTION,
      PRICE,
      IMAGEURL
    } = this.props.data;

    return (
      <Container>
        <Row>
          <Col xs="5">
            <div className="card_item_wrapper">
              <div
                className="image"
                style={{
                  background: `url(${
                    process.env.PUBLIC_URL
                  }/images/${IMAGEURL}) no-repeat`
                }}
              />
              <Row>
                <Col className=".tags .productno">Id:#{PRODUCTNO}</Col>
                <Col>{PRODUCTNAME}</Col>
                <Col>Rs {PRICE}</Col>
                <Col>
                  <Button
                    id={x}
                    size="m"
                    color="primary"
                    onClick={() => this.handleBuy()}
                  >
                    Buy
                  </Button>
                  <Popover
                    placement="bottom"
                    isOpen={this.state.popoverOpen}
                    target={x}
                    toggle={this.toggle}
                  >
                    <PopoverHeader>Contact No-{this.state.PHONE}</PopoverHeader>
                    <PopoverBody>
                      Name-{this.state.NAME}
                      <br />
                      Address-{this.state.ADDRESS}
                    </PopoverBody>
                  </Popover>
                </Col>
              </Row>
            </div>
          </Col>
          <Col>{DESCRIPTION}</Col>
        </Row>
        <hr />
      </Container>
    );
  }
}

export default Card;
