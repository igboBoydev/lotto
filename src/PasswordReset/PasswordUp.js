import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';


const initialState = {
    token: '',
    password: ''
}
const PasswordUp = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null);
    const [users, setUsers] = useState(initialState)
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
            "token": `${users.token}`,
            "password": `${users.password}`
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5016/api/v1/update-password", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    const { message } = result.success;
                    setSuccess(message)
                } else if (result.error) {
                    const { message } = result.error;
                    setError(message)
                } else {
                    return
                }
            },
                (error) => {
                    console.log(error)
                });

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
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group as={Col} md="8" controlId="validationCustom01">
                            <Form.Label>Token</Form.Label>
                            <Form.Control
                                    required
                                    value={users.token}
                                type="text"
                                name="token"
                                onChange={handleChange}
                                placeholder="token"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
          <Form.Group as={Col} md="8" controlId="validationCustom01">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                    required
                                    value={users.password}
                                type="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="xxxxxxxx"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
          
          <Form.Text className='ml-3' id="passwordHelpBlock" muted>
            Please provide the token sent to your registered email.
        </Form.Text>
              <Button className='mt-2 ml-3 my-3' type='submit' variant="outline-success">Submit</Button>
      </Form>
                       
                </Col>
            </Row>
        </Container>
   </section>
    )
}

export default PasswordUp
