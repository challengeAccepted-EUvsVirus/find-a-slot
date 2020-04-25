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
            <Form.Group as={Col}>
              <Form.Label>Postcode</Form.Label>
              <Form.Control name="postal_code" placeholder="N11 M22" />
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
                  "id":1,
                  "name":"Carrefour",
                  "image_url":"https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrefour_logo.svg",
                  "site_url":"https://www.carrefour.es/",
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
                "id":3,
                "name":"Futeria Paco",
                "image_url":"https://images.vexels.com/media/users/3/147164/isolated/preview/6bf92415c7b2651f512aa0db5a3e1aba-icono-de-manzana-roja-de-fruta-by-vexels.png",
                "slots":[
                  {
                      "datetime_start":"2015-08-07T08:40:51.620Z",
                      "datetime_end":"2016-08-07T11:40:51.620Z"
                  },
                  {
                      "datetime_start":"2020-08-09T13:40:51.620Z",
                      "datetime_end":"2021-08-09T16:40:51.620Z"
                  },
                  {
                    "datetime_start":"2020-08-09T13:40:51.620Z",
                    "datetime_end":"2021-08-09T12:40:51.620Z"
                  }
                ]
            },
            {
              "id":4,
              "name":"El Corte Ingles",
              "image_url":"https://upload.wikimedia.org/wikipedia/commons/0/02/Logo_Corte_Ingl%C3%A9s.svg",
              "slots":[
                {
                    "datetime_start":"2015-08-05T08:40:51.620Z",
                    "datetime_end":"2016-08-05T08:40:51.620Z"
                }
              ]
          }
            ].map((element, idx) => (
              <Col key={idx} className="result-container">
                <Card className="result">
                  <Card.Img variant="top" src={element.image_url} />
                  <Card.Body>
                    <Card.Title>{element.name}</Card.Title>
                    {element.slots.map((slot, idy) => (
                      <Card.Text key={idy}>
                        {Moment(slot.datetime_start).format('DD MMM HH:mm')} - {Moment(slot.datetime_end).format('HH:mm')}
                      </Card.Text>
                     ))}
                    <Button href={element.site_url} variant="primary">Visit</Button>
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