import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Whatsapp = () => {
  const [value, setValue] = useState([])
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [showAlert, setShowAlert] = useState(false)


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
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          const { message } = result.success;
          setSuccess(message)
        } else if (result.error) {
          const { message } = result.error;
          setError(message)
        } else {
          return;
        }
      },
        (error) => {
          console.log(error)
        }
      );


  }

  useEffect(() => {
        setTimeout(() => {
            setShowAlert(!showAlert)
        }, 3000)
    }, [success, error])
  


  return (
        <section className='register_section d-flex justify-content-center'>
            <Container fluid='md'>
            <Row>
                <Col className='mt-5' md={{ span: 12, offset: 1 }}>
            {success ? <section>
                            {showAlert && <span>{success}</span>}
             </section> : <section>
                            {showAlert && <span>{error}</span>}
             </section>
                        }
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
            {success && <Link className='register_btn toggle mt-3' variant='success' to='/validate'>
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
















