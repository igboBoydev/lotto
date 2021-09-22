import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../store/context';

const initialState = {
    mobile: '',
    password: '',
}

const Login = () => {
    const { giveAccess } = useGlobalContext();
    const [success, setSuccess] = useState(false)
    const [users, setUsers] = useState(initialState)
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
        myHeaders.append("timestamps", "1614848109");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "mobile": `${users.mobile}`,
            "password": `${users.password}`
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5016/api/v1/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    const { token } = result.success;
                    console.log(token)
                    giveAccess(token)
                    if (token) {
                        setSuccess(true)
                    }
                } else if (result.error) {
                    const { message } = result.error;
                    setError(message)
                }else{
                    return;
                }
            },
                (error) => {
                    console.log(error)
                }
            );
  
        
        users.mobile = ''
        users.password = ''
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
                            {showAlert && <span>LoggedIn successfully</span>}
             </section> : <section>
                            {showAlert && <span>{error}</span>}
             </section>
                        }
      <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="inputPassword5">Mobile</Form.Label>
          <Form.Control
            type="text"
                name='mobile'
                className='input_width'
            onChange={handleChange}
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
                          />
                          <Form.Label htmlFor="inputPassword5">Password</Form.Label>
          <Form.Control
            type="Password"
                name='password'
                className='input_width'
            onChange={handleChange}
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
              />
          <Form.Text id="passwordHelpBlock" muted>
            Please Kindly Ensure your Login Details are correct.
        </Form.Text>
        <Button variant='success'  className='mb-3' type="submit">Submit</Button>
      </Form>
                       
                </Col>
            </Row>
        </Container>
   </section>
    )
}

export default Login