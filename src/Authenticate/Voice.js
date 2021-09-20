import React, { useState } from 'react';
import { Form, Button, Link, Row, Container, Col } from 'react-bootstrap';
import { useGlobalContext } from '../store/context';

const Voice = () => {
  const { showVoice } = useGlobalContext();
  const [getVoiceOtp, setGetVoiceOtp] = useState('');


  const handleSecondChange = (e) => {
    e.preventDefault()
    setGetVoiceOtp(e.target.value)
  }

  const handleSecondSubmit = (e) => {
    e.preventDefault()
    showVoice(getVoiceOtp)
  }


  return (
        <section className='register_section d-flex justify-content-center'>
            <Container fluid='md'>
            <Row>
                <Col className='mt-5' md={{ span: 12, offset: 1 }}>

      <Form onSubmit={handleSecondSubmit}>
          <Form.Label htmlFor="inputPassword5">OTP Via voice Call</Form.Label>
          <Form.Control
            type="text"
                name='otp'
                className='input_width'
            onChange={handleSecondChange}
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
              />
          <Form.Text id="passwordHelpBlock" muted>
            Please enter the your mobile number.
        </Form.Text>
        <Button className='my-4 ' type='submit' variant="outline-success">Submit</Button>
      </Form>
                       
                </Col>
            </Row>
        </Container>
   </section>
    )
}

export default Voice

        