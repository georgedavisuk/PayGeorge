import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class PayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0.0,
      reference: "",
      paymentId: null,
      paymentMade: false,
      paymentObject: null
    };

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleReferenceChange = this.handleReferenceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAmountChange(event) {
    this.setState({ amount: event.target.value });
  }

  handleReferenceChange(event) {
    this.setState({ reference: event.target.value });
  }

  handleSubmit(event) {
    fetch(
      "api/Payments/CreatePayment?amount=" +
        this.state.amount * 100 +
        "&reference=" +
        this.state.reference,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ paymentObject: JSON.parse(data), paymentMade: true });
        window.location.href = this.state.paymentObject.results[0].auth_uri;
      });

    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Amount
          <input
            type="number"
            value={this.state.amount}
            onChange={this.handleAmountChange}
          />
        </label>
        <label>
          Reference
          <input
            type="text"
            value={this.state.reference}
            onChange={this.handleReferenceChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default withRouter(PayForm);
