import React, { useState } from 'react';
import { Form, Button, Link, Row, Container, Col } from 'react-bootstrap';
import { useGlobalContext } from '../store/context';

const Login = () => {
      let { loggingIn } = useGlobalContext();
    const [userLogin, setUserLogin] = useState({ mobile: '', password: '' });
    const [showLogin, setShowLogin] = useState(false)

    const handleLogin = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserLogin({ ...userLogin, [name]: value })
    }
   
    const handleSubmit = (e) => {
        e.preventDefault()
            const grantAccess = { id: new Date().getTime().toString(), ...userLogin }
        console.log('hello world')
            loggingIn(grantAccess)
        setUserLogin('')
    }



  return (
        <section className='register_section d-flex justify-content-center'>
            <Container fluid='md'>
            <Row>
                <Col className='mt-5' md={{ span: 12, offset: 1 }}>

      <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="inputPassword5">Email</Form.Label>
          <Form.Control
            type="email"
                name='email'
                className='input_width'
            onChange={handleLogin}
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
                          />
                          <Form.Label htmlFor="inputPassword5">Password</Form.Label>
          <Form.Control
            type="Password"
                name='password'
                className='input_width'
            onChange={handleLogin}
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
              />
          <Form.Text id="passwordHelpBlock" muted>
            Please Kindly Ensure your Login Details are correct.
        </Form.Text>
        <Button className='my-4 ' type='submit' variant="outline-success">Submit</Button>
      </Form>
                       
                </Col>
            </Row>
        </Container>
   </section>
    )
}

export default Login