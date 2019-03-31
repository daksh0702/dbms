import React, { Component } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
class Sell extends Component {
  state = {
    TYPE: "HOSTEL",
    USERNAME: window.history.state,
    PRODUCTNAME: "",
    DESCRIPTION: "",
    PRICE: "",
    IMAGEURL: "",
    formSucess: "",
    uploadSuccess: "false"
  };
  handleSubmit = () => {
    console.log("Submitting");
    let x = this.state;
    if (
      x.PRODUCTNAME === "" ||
      x.DESCRIPTION === "" ||
      x.PRICE === "" ||
      x.IMAGEURL === ""
    ) {
      this.setState({ formSucess: "false" });
    } else {
      axios.post("/sell", { ...this.state }).then(res => {
        res = res.data;
        this.setState({ uploadSuccess: res.uploadSuccess });
        setTimeout(() => {
          window.history.pushState(
            this.state.USERNAME,
            "product upload",
            res.redirect
          );
          window.history.go(0);
        }, 2000);
      });
    }
  };
  handleradioChange = event => {
    this.setState({ TYPE: event.target.value });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleImage = event => {
    let path = event.target.value;
    path = path.slice(12, path.length);
    this.setState({ IMAGEURL: path });
  };
  render() {
    console.log(this.state);
    return (
      <div style={{ marginLeft: "10px" }}>
        <h2>Please Enter the product details.</h2>
        <Form>
          Item Type:
          <div className="radio" style={{ marginBottom: "10px" }}>
            <label style={{ marginRight: "20px" }}>
              <input
                type="radio"
                value="HOSTEL"
                checked={this.state.TYPE === "HOSTEL"}
                onChange={this.handleradioChange}
              />
              Hostel Stuff
            </label>
            <label style={{ marginRight: "20px" }}>
              <input
                type="radio"
                value="ARTS"
                checked={this.state.TYPE === "ARTS"}
                onChange={this.handleradioChange}
              />
              Collection(artwork)
            </label>
            <label style={{ marginRight: "20px" }}>
              <input
                type="radio"
                value="ELECTRONICS"
                checked={this.state.TYPE === "ELECTRONICS"}
                onChange={this.handleradioChange}
              />
              Electronic gadgets
            </label>
            <label>
              <input
                type="radio"
                value="BOOK"
                checked={this.state.TYPE === "BOOK"}
                onChange={this.handleradioChange}
              />
              Books/Notes
            </label>
          </div>
          <FormGroup>
            <Label for="pname">Product Name</Label>
            <Input
              type="text"
              name="PRODUCTNAME"
              id="pname"
              placeholder="Product Description"
              onChange={this.handleChange}
              value={this.state.PRODUCTNAME}
            />
          </FormGroup>
          <FormGroup>
            <Label for="desc">Description</Label>
            <Input
              type="textarea"
              name="DESCRIPTION"
              id="desc"
              placeholder="Product Description"
              onChange={this.handleChange}
              value={this.state.DESCRIPTION}
            />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="text"
              id="price"
              name="PRICE"
              placeholder="Expected"
              onChange={this.handleChange}
              value={this.state.PRICE}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">Product Image</Label>
            <Input
              type="file"
              name="file"
              id="exampleFile"
              onChange={this.handleImage}
            />
            <FormText color="muted">
              Please ensure that file is of image types such as jpeg, png, gif
              and size of the image is less than 1mb.
            </FormText>
          </FormGroup>
          {this.state.formSucess === "false" ? (
            <div style={{ color: "#ff0000" }}>
              Please fill in all the details and upload the Product image before
              submission
            </div>
          ) : null}
          {this.state.uploadSucess === "true" ? (
            <div style={{ color: "#00ff00" }}>
              Product successfully registered for sale.
            </div>
          ) : null}
          <div style={{ marginBottom: "100px", position: "relative" }}>
            <Button
              onClick={() => this.handleSubmit()}
              color="primary"
              style={{ float: "left" }}
            >
              Submit
            </Button>
            <Button
              color="danger"
              style={{ float: "right" }}
              onClick={() => window.history.go(-1)}
            >
              Go Back
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Sell;
