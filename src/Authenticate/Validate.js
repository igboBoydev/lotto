import React, { useState } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const initialState = {
    otp: '',
    mobile: ''
}

const Validate = () => { 
    const [showValidate, setShowValidate] = useState(false)
    const [users, setUsers] = useState(initialState)
    const [value, setValue] = useState(null)

    const handleChange = (e) => {
        e.preventDefault();
        e.stopPropagation()
        const name = e.target.name;
        const value = e.target.value;
        setUsers({ ...users, [name]: value })
  }
 

    const handleSubmit = (event) => {
        event.preventDefault()

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
      }
       setShowValidate(true)
      


      var myHeaders = new Headers();
      myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "otp": `${users.otp}`,
        "mobile": `${users.mobile}`
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      fetch("http://localhost:5016/api/v1/validate-otp", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result)
          let alerts = JSON.parse(result)
          setValue(alerts)
        },
          (error) => {
            console.log(error)
          });

        
        users.otp = ''
        users.mobile = ''
  };
  
  return (
            <section className='register_section d-flex justify-content-center'>
            <Container fluid='md'>
            <Row>
          <Col className='mt-5' md={{ span: 12, offset: 1 }}>
             {alert ? <span pb-3>Whatsapp message sent successfully, kindly check to verify</span> : <span>Enter your Mobile Number</span> }
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group as={Col} md="8" controlId="validationCustom01">
                            <Form.Label>Otp</Form.Label>
                            <Form.Control
                                    required
                                    value={users.otp}
                                type="text"
                                name="otp"
                                onChange={handleChange}
                                placeholder="OTP"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
          <Form.Group as={Col} md="8" controlId="validationCustom01">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                    required
                                    value={users.mobile}
                                type="text"
                                name="mobile"
                                onChange={handleChange}
                                placeholder="909xxxxxxxx"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
          
          <Form.Text id="passwordHelpBlock" muted>
            Please provide the code sent to your registered mobile number or email.
        </Form.Text>
              <Button className='mt-2 mb-3' type='submit' variant="outline-success">Submit</Button>
               {showValidate && <Link className='btns ml-3 login_btn' id='login_btn' to='/validate/Login'>Login</Link>}
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

export default Validate 








