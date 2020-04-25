import React from 'react';
import ReactDOM from 'react-dom';

// import ThemeSwitcher from './ThemeSwitcher';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, Nav} from "react-bootstrap";

import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
      <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
              <img
                  alt=""
                  src="/logo.svg"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
              />{' '}
              Find a Slot
          </Navbar.Brand>
          <Nav className="mr-auto">
              <Nav.Link href="#home">Search</Nav.Link>
              <Nav.Link href="#features">About us</Nav.Link>
              <Nav.Link href="#pricing">FAQs</Nav.Link>
          </Nav>
      </Navbar>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
