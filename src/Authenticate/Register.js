import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
const initialState = {
    email: '',
    password: '',
    mobile: ''
}
const Register = () => {
    const [users, setUsers] = useState(initialState)
    let history = useHistory()
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [showAlert, setShowAlert] = useState(false)

    const handleRegisterChange = (e) => {
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
            "email": `${users.email}`,
            "password": `${users.password}`,
            "mobile": `${users.mobile}`
        });


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


        fetch("http://localhost:5016/api/v1/register", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    const { message } = result.success;
                    setSuccess(message)
                } else {
                    const { message } = result.error;
                    setError(message)
                }
            },
                (error) => {
                    console.log(error)
                }
        )
        
        users.email = ''
        users.mobile = ''
        users.password = ''
    };

    const handleLogin = (e) => {
        e.preventDefault()
        history.push('/validate/login')
    }

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(!showAlert)
        }, 3000)
    }, [success, error])

    return (
        <section className='register_section d-flex justify-content-center'>
            <Container fluid='md' className='ml-3'>

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
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                    required
                                    value={users.email}
                                type="email"
                                name="email"
                                onChange={handleRegisterChange}
                                placeholder="Example@gmail.com"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="8" controlId="validationCustom02">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                required
                                    type="text"
                                    value={users.mobile}
                                name="mobile"
                                onChange={handleRegisterChange}
                                placeholder="090xxxxxxxxxxx"
                                required
                                />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="8" controlId="validationCustomUsername">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="xxxxxxxxxxxxxxxx"
                                    name="password"
                                    value={users.password}
                                onChange={handleRegisterChange}
                                aria-describedby="inputGroupPrepend"
                                required
                                />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check
                                required
                                label="Agree to terms and conditions"
                                feedback="You must agree before submitting."
                                feedbackType="invalid"
                            />
                        </Form.Group>
                            <Button variant='success' className='mb-2' type="submit">Submit</Button>
                             {success && <Link className='register_btn toggle ml-4 mb-5' variant='success' to='./Validate'>
                           Vaidate
                        </Link>
                        }
                        </Form>
                        {!success &&
                        <div>
                            <h6>Already have an account ?</h6>
                            <Button variant='success' onClick={handleLogin} className='mb-3' >Login</Button>
                            </div>
                        }
                </Col>
            </Row>
        </Container>
        </section>
    );
}

 
    


export default Register



























