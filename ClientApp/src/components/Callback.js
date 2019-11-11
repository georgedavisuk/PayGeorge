import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentState: null
    };

    this.GetStatus = this.GetStatus.bind(this);
  }
  componentDidMount() {
    var id = window.location.search.slice(12);
    this.GetStatus(id);
  }

  GetStatus(id) {
    // do {
    //   fetch("api/Payments/GetPaymentState?id=" + id, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json"
    //     }
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       var responseObject = JSON.parse(data);
    //       this.setState({ paymentState: responseObject.results[0].status });
    //     });
    // } while (this.state.paymentState != "executed");
    fetch("api/Payments/GetPaymentState?id=" + id, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        var responseObject = JSON.parse(data);
        this.setState({ paymentState: responseObject.results[0].status });
      });
  }
  render() {
    return <h1>Payment Status: {this.state.paymentState}</h1>;
  }
}

export default Callback;
