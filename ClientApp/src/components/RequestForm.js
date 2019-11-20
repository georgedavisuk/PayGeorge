import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {Row, Col, Container} from "react-bootstrap";

class RequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: null,
            reference: "",
            name: "",
            sortCode: null,
            accountNumber: null,
            paymentId: null,
            paymentMade: false,
            requestResult: ""
        };

        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleReferenceChange = this.handleReferenceChange.bind(this);
        this.handleAccountNumberChange = this.handleAccountNumberChange.bind(this);
        this.handleSortCodeChange = this.handleSortCodeChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAmountChange(event) {
        this.setState({ amount: event.target.value });
    }

    handleReferenceChange(event) {
        this.setState({ reference: event.target.value });
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleSortCodeChange(event) {
        this.setState({ sortCode: event.target.value });
    }

    handleAccountNumberChange(event) {
        this.setState({ accountNumber: event.target.value });
    }

    handleSubmit(event) {
        console.log(this.state.accountNumber);
        fetch(
            "api/Requests/CreateRequest?amount=" +
            this.state.amount * 100 +
            "&reference=" +
            this.state.reference + 
            "&accountNumber=" + 
            this.state.accountNumber +
            "&sortCode=" + 
            this.state.sortCode +
            "&name=" +
            this.state.name,
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }
        )
            .then(response => response.text())
            .then(data => {
                this.setState({ requestResult: data, paymentMade: true });
                alert("Result: " + this.state.requestResult);
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
                                    <p>Name</p>
                                </Col>
                                <Col>
                                    <label>
                                        <input
                                            type="text"
                                            value={this.state.name}
                                            onChange={this.handleNameChange}
                                            placeholder="name"
                                            required
                                        />
                                    </label>
                                </Col>
                            </Row>
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
                                    <p>Sort Code</p>
                                </Col>
                                <Col>
                                    <label>
                                        <input
                                            type="number"
                                            value={this.state.sortCode}
                                            onChange={this.handleSortCodeChange}
                                            placeholder="000000"
                                            required
                                        />
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>Account Number</p>
                                </Col>
                                <Col>
                                    <label>
                                        <input
                                            type="number"
                                            value={this.state.accountNumber}
                                            onChange={this.handleAccountNumberChange}
                                            placeholder="00000000"
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
                                    <input type="submit" value="Request" />
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

export default withRouter(RequestForm);
