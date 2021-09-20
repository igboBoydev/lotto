import React, { useState } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../store/context'


const Validate = () => {
  const { getValues } = useGlobalContext()
  const [values, setValues] = useState({ otp: '', mobile: '' })
  const [status, setStatus] = useState(false)
  
  const handleChange = (e) => {
    e.preventDefault()
    let name = e.target.name;
    let value = e.target.value
    setValues({ ...values, [name]: value })
  } 

  const handleSubmit = (e) => {
    e.preventDefault()
    getValues(values)
    setStatus(true)
  }


  
  return (
            <section className='register_section d-flex justify-content-center'>
            <Container fluid='md'>
            <Row>
                    <Col className='mt-5' md={{ span: 12, offset: 1 }}>
                         <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="inputPassword5">OTP</Form.Label>
          <Form.Control
            type="text"
                name='otp'
                className='input_width'
            onChange={handleChange}
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
              />
          <Form.Label htmlFor="inputPassword5">Mobile</Form.Label>
          <Form.Control
          type="text"
                name='mobile'
                className='input_width'
            onChange={handleChange}
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
          />
          <Form.Text id="passwordHelpBlock" muted>
            Please provide the code sent to your registered mobile number or email.
        </Form.Text>
              <Button className='mt-2 mb-3' type='submit' variant="outline-success">Submit</Button>
               {status && <Link className='btns ml-3 login_btn' id='login_btn' to='/profile/Login'>Login</Link>}
      </Form>
        
            <div className='mt-3'>
              <div className='mb-4'>
                <span className="validate_span">Not Seen ? Get verified via:</span> <br />
              </div>
              <Link className='btns mr-3 mb-3' to='/validate/whatsapp'>Whatsapp</Link>
              <Link className='btns btn_second mb-3' to='/validate/voice'>Voice</Link>
       </div>
     
                       
                </Col>
            </Row>
        </Container>
   </section>
    )
}

export { Validate }
