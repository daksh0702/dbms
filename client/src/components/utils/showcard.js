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
class ShowCard extends Component {
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
    // dets:[],
    formSucess: "",
    uploadSuccess: "true"
  };

  handlChange = event => {
    this.setState({ BID: event.target.value });
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

//   handlDets = (e) => {
//     console.log("Submitting");
//     let x = this.state;
//       axios.post("/showdet", { ...this.state }).then(re => {
//       this.setState({ dets: re.data });
//         console.log(" Show Dets- "+re);
//         // this.setState({ uploadSuccess: res.uploadSuccess});
//       });
//   };

handleBuy = () => {
    let value = { USERNAME: this.props.data.BIDDER };
    console.log("obj username:", value);
    axios.get(`/user?USERNAME=${this.props.data.BIDDER}`).then(res => {
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


//   handleBuy = () => {
//     let value = { USERNAME: this.props.data.USERNAME };
//     console.log("obj username:", value);
//     axios.get(`/user?USERNAME=${this.props.data.USERNAME}`).then(res => {
//       res = res.data;
//       this.setState({
//         NAME: res.NAME,
//         ADDRESS: res.ADDRESS,
//         PHONE: res.PHONE,
//         //PRICE:res.PRICE,
//         // BIDDER: res.USERNAME,
//       });
//       console.log("HandleBuy res:", res);
//     });
//   };
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
    let y = this.props.k.toString() ;
    y = y
    .replace("1", "a")
    .replace("2", "b")
    .replace("3", "c")
    .replace("4", "d")
    .replace("5", "e")
    .replace("6", "f")
    .replace("7", "g")
    .replace("8", "h")
    .replace("9", "i")
    .replace("10", "aa")
    .replace("11", "bb")
    .replace("12", "cc")
    .replace("13", "dd")
    .replace("14", "ee")
    .replace("15", "ff")
    .replace("16", "gg")
    .replace("17", "hh")
    .replace("0", "ii")
    //   .replace("0", "j");
    console.log("Card props", this.props.data);
    const {
      PRODUCTNO,
      BIDDER,
      BID,
    } = this.props.data;
    // const uname=this.props.uname;

    return (
      <Container>
        <Row>
          <Col xs="10">
          <Row>
          <Col><b>PRODUCT NO-</b> {PRODUCTNO}</Col>
          <Col><b>BIDDER USERNAME-</b> {BIDDER}</Col>
          <Col><b>BID -</b> {BID}</Col>
          <Col>
          <Button
                    id={y}//y+"1"}
                    size="m"
                    color="primary"
                    onClick={() => this.handleBuy()}
                  >
                    Contact
                  </Button>
                  <Popover
                    placement="bottom"
                    isOpen={this.state.popoverOpen}
                    target={y}//y+"1"}
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
          </Row>
          </Col>
        </Row>
        <hr></hr>
      </Container>
    );
  }
}

export default ShowCard;
