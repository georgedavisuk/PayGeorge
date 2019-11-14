import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {Row, Col, Container} from "react-bootstrap";

class PayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: null,
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
        <Container>
          <Row>
            
          </Row>
          <Row>
            <Col>
              
            </Col>
            <Col>
              <form onSubmit={this.handleSubmit}>
                <Row>
                  <Col>
                    <p>Amount</p>
                  </Col>
                  <Col>
                    <label>
                      <input
                          type="number"
                          value={this.state.amount}
                          onChange={this.handleAmountChange}
                          placeholder="0.01"
                          required
                      />
                    </label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>Reference</p>
                  </Col>
                  <Col>
                    <label>
                      <input
                          type="text"
                          value={this.state.reference}
                          onChange={this.handleReferenceChange}
                          placeholder="reference"
                          required
                      />
                    </label>
                  </Col>
                  
                </Row>
                <Row>
                  <Col>
                    <input type="submit" value="Pay" />
                  </Col>
                </Row>
                
              </form>
            </Col>
            <Col>
              
            </Col>
          </Row>
          <Row>
            
          </Row>
        </Container>
      
    );
  }
}

export default withRouter(PayForm);
