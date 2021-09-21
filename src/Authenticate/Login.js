import React, { useState } from 'react';
import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../store/context';

const initialState = {
    mobile: '',
    password: '',
}

const Login = () => {
    const { isLoggedIn, giveAccess } = useGlobalContext();
    const [showValidate, setShowValidate] = useState(false)
    const [users, setUsers] = useState(initialState)
    const [value, setValue] = useState([])

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

        console.log('hello world')


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
            .then(response => response.text())
            .then(result => {
                setValue(result)
                console.log(result)
                setShowValidate(true)
                giveAccess(true)
            },
                (error) => {
                    console.log(error)
                }
            );
  
        
        users.mobile = ''
        users.password = ''
    };

  return (
        <section className='register_section d-flex justify-content-center'>
            <Container fluid='md'>
            <Row>
                <Col className='mt-5' md={{ span: 12, offset: 1 }}>

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