import React, { Component } from 'react';
import Moment from 'moment';
import { Form, Col, Container, Row, Button, Card } from 'react-bootstrap';
import './App.css';
import { backendUrl } from './utils';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      country_code: 'en',
      isLoading: false,
      formData: {
        "post_code": "28023"
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
    fetch("https://ipapi.co/json")
    .then(ipresponse => ipresponse.json())
    .then(ipresponse => {
      this.setState({
        country_code: ipresponse.languages.split(",")[0],
      });
      formData.country = this.state.country_code
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
      })

    });
  }

  handleClearClick = (event) => {
    this.setState({ result: "" });
  }

  render() {
    const isLoading = this.state.isLoading;
    const result = this.state.result;
    Moment.locale(this.state.country_code);
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
            {[
              {
                  "id":1234,
                  "name":"Drusifour",
                  "image_url":"https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrefour_logo.svg",
                  "slots":[
                    {
                        "datetime_start":"2015-08-05T08:40:51.620Z",
                        "datetime_end":"2016-08-05T08:40:51.620Z"
                    },
                    {
                        "datetime_start":"2020-08-05T08:40:51.620Z",
                        "datetime_end":"2021-08-05T08:40:51.620Z"
                    }
                  ]
              },{
                "id":1234,
                "name":"Drusifour",
                "image_url":"https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrefour_logo.svg",
                "slots":[
                  {
                      "datetime_start":"2015-08-05T08:40:51.620Z",
                      "datetime_end":"2016-08-05T08:40:51.620Z"
                  },
                  {
                      "datetime_start":"2020-08-05T08:40:51.620Z",
                      "datetime_end":"2021-08-05T08:40:51.620Z"
                  }
                ]
            },
            {
              "id":1234,
              "name":"Drusifour",
              "image_url":"https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrefour_logo.svg",
              "slots":[
                {
                    "datetime_start":"2015-08-05T08:40:51.620Z",
                    "datetime_end":"2016-08-05T08:40:51.620Z"
                },
                {
                    "datetime_start":"2020-08-05T08:40:51.620Z",
                    "datetime_end":"2021-08-05T08:40:51.620Z"
                }
              ]
          }
            ].map((element, idx) => (
              <Col key={idx} className="result-container">
                <Card className="result">
                  <Card.Img variant="top" src={element.image_url} />
                  <Card.Body>
                    <Card.Title>Drusifour</Card.Title>
                    {element.slots.map((slot, idy) => (
                      <Card.Text key={idy}>
                        {Moment(slot.datetime_start).format('d MMM hh:mm')} - {Moment(slot.datetime_end).format('hh:mm')}
                      </Card.Text>
                     ))}
                    <Button href={element.url} variant="primary">Visit</Button>
                  </Card.Body>
                </Card>
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