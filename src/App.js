import React, {Component} from 'react';
import Moment from 'moment';
import {Form, Col, Container, Row, Button, Card, Pagination, Tabs, Tab} from 'react-bootstrap';
import './App.css';
import {backendUrl} from './utils';
import providers from './providers.json'

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
        this.setState({result: ""});
        const formData = this.state.formData;
        this.setState({isLoading: true});
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
        this.setState({result: ""});
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
                            <Form.Control name="postal_code" placeholder="N11 M22"/>
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
                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                            <Tab eventKey="0" title="Today">
                            </Tab>
                            <Tab eventKey="1" title="Tomorrow">
                            </Tab>
                            <Tab eventKey="2" title="Other days" disabled>
                            </Tab>
                        </Tabs>
                    }
                    {result === "" ? null :
                        <Row>
                            {providers.filter((x) => {
                                if (Math.random() > 0.2) return x;
                            }).sort(function (a, b) {
                                return 0.5 - Math.random()
                            })
                                .map((element, idx) => (
                                    <Col key={idx} className="result-container">
                                        <Card className="result">
                                            <Card.Img variant="top" src={element.image_url}/>
                                            <Card.Body>
                                                <Card.Title>{element.name}</Card.Title>
                                                {element.slots.map((slot, idy) => (
                                                    <Card.Text key={idy}>
                                                        {Moment(slot.datetime_start).format('DD MMM HH:mm')} - {Moment(slot.datetime_end).format('HH:mm')}
                                                    </Card.Text>
                                                ))}
                                                <Button href={element.site_url} variant="primary"
                                                        target="_blank">Visit</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            <Pagination>
                                <Pagination.First/>
                                <Pagination.Prev/>
                                <Pagination.Item>{1}</Pagination.Item>
                                <Pagination.Ellipsis/>

                                <Pagination.Item>{10}</Pagination.Item>
                                <Pagination.Item>{11}</Pagination.Item>
                                <Pagination.Item active>{12}</Pagination.Item>
                                <Pagination.Item>{13}</Pagination.Item>
                                <Pagination.Item disabled>{14}</Pagination.Item>

                                <Pagination.Ellipsis/>
                                <Pagination.Item>{20}</Pagination.Item>
                                <Pagination.Next/>
                                <Pagination.Last/>
                            </Pagination>
                        </Row>
                    }
                </div>
            </Container>
        );
    }
}

export default App;