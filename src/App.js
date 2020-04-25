import React, { Component } from 'react';
import { Form, Col, Container, Row, Button } from 'react-bootstrap';
import './App.css';
import { backendUrl } from './utils';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        postcode: "XXXXX",
      },
      result: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  handleSubmitClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch(backendUrl)
    // fetch(backendUrl,
    //   {
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     method: 'POST',
    //     body: JSON.stringify(formData)
    //   })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response,
          isLoading: false
        });
      })
      .catch(error => {  
        console.log('Request failure: ', error);  
      });
  }

  handleClearClick = (event) => {
    this.setState({ result: "" });
  }

  render() {
    const isLoading = this.state.isLoading;
    const result = this.state.result;
    return (
      <Container>
        <div>
          <h1 className="title">Find a slot</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Postcode</Form.Label>
              <Form.Control type="postcode" placeholder="N11 M22" />
            </Form.Group>
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handleSubmitClick : null}>
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleClearClick}>
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
          {result === "" ? null :
          <Row>
            {result.map((element, idx) => (
              <Col key={idx} className="result-container">
                <h5 id="result">{element.name} {element.username}</h5>
              </Col>
            ))}
            </Row>
          }
        </div>
      </Container>
    );
  }
}

export default App;