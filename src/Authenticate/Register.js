import React, { useState } from 'react';
import { useGlobalContext } from '../store/context';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = () => {
    const [validated, setValidated] = useState(false);
    const { addUser } = useGlobalContext();
    const [user, setUser] = useState({ email: '', password: '', mobile: '' })
    const [showValidate, setShowValidate] = useState(false)

    const handleRegisterChange = (e) => {
        e.preventDefault();
        e.stopPropagation()
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
         event.preventDefault();
        event.stopPropagation();
      }
        setValidated(true);
               
        if (user.email && user.password && user.mobile) {
            const newUser = { id: new Date().getTime().toString(), ...user }
            if (newUser) {
              addUser(newUser)   
            }   
        } else {
            return;
        }

        user.email = ''
        user.password = ''
        user.mobile = ''
        setShowValidate(true)
    
    };
    

    return (
        <section className='register_section d-flex justify-content-center'>
            <Container fluid='md'>
            <Row>
                    <Col className='mt-5' md={{ span: 12, offset: 1 }}>
                          <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group as={Col} md="8" controlId="validationCustom01">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
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
                        <Button variant='success' className='mb-3' type="submit">Submit</Button>
                        </Form>
                        {showValidate && <Link className='register_btn toggle mt-3' variant='success' to='./Validate'>
                           Vaidate
                        </Link>
                        }
                       
                </Col>
            </Row>
        </Container>
        </section>
    );
}

 
    


export default Register

















