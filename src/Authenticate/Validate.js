import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const initialState = {
    otp: '',
    mobile: ''
}

const Validate = () => { 
    const [users, setUsers] = useState(initialState)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
    const [showAlert, setShowAlert] = useState(false)

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
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            const { message } = result.success;
            setSuccess(message)
          } else if(result.error) {
            const { message } = result.error;
            setError(message)
          } else {
            return;
          }
        },
          (error) => {
            console.log(error)
          });

        
        users.otp = ''
        users.mobile = ''
  };

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
          <Form.Group as={Col} md="8" controlId="validationCustom01" className='mt-2'>
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
          
          <Form.Text id="passwordHelpBlock" muted className='ml-2 ml-lg-0 mt-2'>
            Please provide the code sent to your registered mobile number or email.
        </Form.Text>
              <Button className='mt-2 mb-3 ml-2 ml-lg-0' type='submit' variant="outline-success">Submit</Button>
               {success && <Link className='btns ml-3 login_btn' id='login_btn' to='/validate/Login'>Login</Link>}
      </Form>
        
            <div className='mb-3 ml-3 ml-lg-0'>
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








