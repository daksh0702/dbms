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
    popOpenBid: false,
    NAME: "",
    ADDRESS: "",
    PHONE: "",
    USERNAME:this.props.data.USERNAME,
    PRODUCTNO: this.props.data.PRODUCTNO,
    value: "",
    BID:"",
    BIDDER:this.props.uname,
    //PRICE:this.props.data.PRICE,
   // CURRENTBID:this.props.data.MINBID,
    formSucess: "",
    uploadSuccess: "true"
  };
  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };
  toggleBid = () => {
    this.setState({
      popOpenBid: !this.state.popOpenBid
    });
  };

  handlChange = event => {
    event.preventDefault();
    this.setState({ BID: event.target.value });
  };

  handleBuy = () => {
    let value = { USERNAME: this.props.data.USERNAME };
    console.log("obj username:", value);
    axios.get(`/user?USERNAME=${this.props.data.USERNAME}`).then(res => {
      res = res.data;
      this.setState({
        NAME: res.NAME,
        ADDRESS: res.ADDRESS,
        PHONE: res.PHONE,
        //PRICE:res.PRICE,
        // BIDDER: res.USERNAME,
      });
      console.log("HandleBuy res:", res);
    });
  };
///////////////////////////////////////////////    BID

handlSubmit = (e) => {
  console.log("Submitting");
  let x = this.state;
  if (
    x.BID === "" ||
    x.BID<this.props.data.MINBID||
    x.BID<this.props.data.PRICE
  ) {
    this.setState({ formSucess: "false" });
  } else {
    this.setState({ formSucess: "true" });
    axios.post("/bid", { ...this.state }).then(res => {
      res = res.data;
      this.setState({ uploadSuccess: res.uploadSuccess});//, USERNAME:res.USERNAME});
    //  e.preventDefault();
      // setTimeout(() => {
      //   window.history.pushState(
      //     this.state.USERNAME,
      //     "bid placed",
      //     res.redirect
      //   );
       window.history.go(0);
      // }, 2000);
      // return false;
    });
  }
};






  // handleBid = () => {
  //   let value = { USERNAME: this.props.data.USERNAME };
  //   console.log("obj username:", value);
  //   axios.get(`/user?USERNAME=${this.props.data.USERNAME}`).then(res => {
  //     res = res.data;
  //     this.setState({
  //       NAME: res.NAME,
  //       ADDRESS: res.ADDRESS,
  //       PHONE: res.PHONE
  //     });
  //     console.log("HandleBuy res:", res);
  //   });
  // };
///////////////////////////////////////////////    BID

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
      USERNAME,     ///    check this
      DESCRIPTION,
      PRICE,
      IMAGEURL,
      MINBID,
      BIDDERSNO,
      DATE,
    } = this.props.data;
    const uname=this.props.uname;

    return (
      <Container>
        <Row>
          <Col xs="5">
          <Col><b>{PRODUCTNAME}</b></Col>
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
                
              </Row>
            </div>
          </Col>
          <Col><br />{DESCRIPTION}</Col>
        </Row>
        <Row><Col className=".tags .productno">Id:#{PRODUCTNO}</Col>
                <Col>Initial Bid - Rs {PRICE}</Col>
                <Col>
                  <Button
                    id={x}
                    size="m"
                    color="primary"
                    onClick={() => this.handleBuy()}
                  >
                    Contact
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
                      <br />{this.state.PRICE}
                    </PopoverBody>
                  </Popover>
                </Col>
                <Col>
                  <Button
                    id={x+"01"}
                    size="m"
                    color="primary"
                    onClick={() => this.handleBuy()}
                  >
                    Place Bid
                  </Button>
                  <Popover
                    placement="bottom"
                    isOpen={this.state.popOpenBid}
                    target={x+"01"}
                    toggle={this.toggleBid}
                  >
                    <PopoverHeader>Enter Amount</PopoverHeader>
                    <PopoverBody>
                      <br />
                      <form>
                      <label>
                      Enter Amount-
                        <input type="number" name="bid" 
                        id="b"
                        // placeholder="Expected"
                        onChange={this.handlChange}
                        value={this.state.BID}
                        onKeyPress={()=>this.handlSubmit()}
                        />{console.log(this.state.BID)}
                      </label>
                      {this.state.formSucess === "false" ? (
                        <div style={{ color: "#ff0000" }}>
                          Bid should be more than the current amount 
                        </div>
                      ) : this.state.formSucess === "true" ? (
                        <div style={{ color: "#00ff00" }}>
                        Bid successful.
                        </div>
                      ) : null}
                      {/* {this.state.uploadSucess === "true" ? (
                        <div style={{ color: "#00ff00" }}>
                        Bid successful.
                        </div>
                      ) : null} */}
                      <Button
                      onClick={() => this.handlSubmit()}
                      //  onSubmit={() => this.handlSubmit()}//{(event)=>{event.preventDefault();alert('form submitted'); }}
                      color="primary"
                      style={{ float: "center" }}>
                      Submit
                    </Button>
                    </form>
                    </PopoverBody>
                  </Popover>
                  </Col></Row>
                  <Row> </Row>
                  <Row><Col>      <h6> <t>Current Bid - {MINBID>PRICE?MINBID:PRICE}</t></h6></Col>
                  <Col> <h6>  No of bidders -  {BIDDERSNO}</h6> </Col>
                  <Col> <h6>  BID BEFORE - {DATE}</h6> </Col>  
                  <Col></Col>
                  </Row>
        <hr />
      </Container>
    );
  }
}

export default Card;
