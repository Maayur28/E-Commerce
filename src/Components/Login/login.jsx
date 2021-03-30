import React, { useState } from "react";
import "./login.css";
import {Button,Modal } from 'react-bootstrap';

const Login = (props) => {
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false)
        props.handleloginLaunch();
    };
    var count=0;
    console.log(count++);
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default Login;
