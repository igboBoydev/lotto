import React, { useState } from 'react';
import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Whatsapp = () => {
  const [value, setValue] = useState([])
    const [message, setMessage] = useState(null)
    const [alert, setAlert] = useState(false)


  const handleChange = (e) => {
    e.preventDefault()
    setValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    var myHeaders = new Headers();
    myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
    myHeaders.append("timestamps", "1614848109");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "mobile": `${value}`
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:5016/api/v1/resend-whatsapp", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        let alerts = JSON.parse(result)
        console.log(result)
        setMessage(alerts)
        setAlert(true)
      },
        (error) => {
          console.log(error)
        }
      );


  }
  


  return (
        <section className='register_section d-flex justify-content-center'>
            <Container fluid='md'>
            <Row>
                <Col className='mt-5' md={{ span: 12, offset: 1 }}>
            {alert ? <span pb-3>Whatsapp message sent successfully, kindly check to verify</span> : <span>Enter your Mobile Number</span> }
      <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="inputPassword5">OTP Via Whatsapp</Form.Label>
          <Form.Control
            type="text"
            name='otp'
            className='input_width'
            onChange={handleChange}
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
              />
          <Form.Text id="passwordHelpBlock" muted>
            Please enter the your Whatsapp number.
        </Form.Text>
        <Button className='my-4 ' type='submit' variant="outline-success">Submit</Button>
      </Form>
            {alert && <Link className='register_btn toggle mt-3' variant='success' to='./Validate'>
              Vaidate
            </Link>
            }
                </Col>
            </Row>
        </Container>
   </section>
    )
}

export default Whatsapp
















