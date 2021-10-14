import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../store/context';
import { useHistory } from 'react-router';

const initialState = {
    mobile: '',
    password: '',
}


const Login = () => {
    const { giveAccess, showBoard } = useGlobalContext();
    let history = useHistory()
    const [success, setSuccess] = useState(false)
    const [users, setUsers] = useState(initialState)
    const [error, setError] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [password, setPassword] = useState('password')
    const [color, setColor] = useState(false)

    const handleChange = (e) => {
        e.preventDefault();
        e.stopPropagation()
        const name = e.target.name;
        const value = e.target.value;
        setUsers({ ...users, [name]: value })
    }

    const handleShow = (e) => {
        e.preventDefault()
        password === 'password' ? setPassword('text') && setColor(true) : setPassword('password') && setColor(false)
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
                    setShowAlert(true)
                    giveAccess(token)
                    var myHeaders = new Headers();
                    myHeaders.append("signatures", "5a1131f2eb747be50714281ec3e68b759476c6dc9e1faf5fc5d91c552cf8c230");
                    myHeaders.append("Authorization", `Bearer ${token}`);



                    var requestOptions = {
                        method: 'GET',
                        headers: myHeaders,
                        redirect: 'follow'
                    };

                    fetch("http://localhost:5016/api/v2/auth/profile", requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            console.log(result)
                            if (result.success) {
                                const { data } = result.success;
                                setSuccess(true)
                                showBoard(data)
                                // localStorage.setItem('user', JSON.stringify(data))
                            } else {
                                return;
                            }
                        },
                            (error) => {
                                console.log(error)
                            });
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
        
         history.push('/games')
        
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
                 {success && <section>
                            {showAlert && <span>LoggedIn successfully</span>}
             </section> 
                        }
      <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="inputPassword5" className='ml-2 ml-lg-0'>Mobile</Form.Label>
          <Form.Control
            type="text"
                name='mobile'
                className='input_width'
            onChange={handleChange}
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
                          />
                          <Form.Label htmlFor="inputPassword5" className='ml-2 ml-lg-0 mt-3'>Password</Form.Label>
                          <div className='d-flex'>
                      <Form.Control
            type={password}
                name='password'
                className='input_width'
            onChange={handleChange}
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
                              />
                              {
                                  users.password &&
                                <span onClick={handleShow} className={`${color ? 'back show_password' : 'show_password'}`}>
                                    <p className='m-2'>Show</p> 
                                </span>
                              }
                          </div>             
          <Form.Text id="passwordHelpBlock" muted className='ml-2 ml-lg-0 mt-2'>
            Please Kindly Ensure your Login Details are correct.
        </Form.Text>
        <Button variant='success'  className='mb-3 ml-2 ml-lg-0 mt-2'type="submit">Submit</Button>
      </Form>
                       
                </Col>
            </Row>
        </Container>
   </section>
    )
}

export default Login