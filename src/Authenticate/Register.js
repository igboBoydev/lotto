import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
 import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email('Email is required').required(),
  password: yup.string().min(8, 'Must be 8 characters or more').required(),
  mobile: yup.string().min(11, 'Must be 11 characters long').required(),
  confPassword: yup.string().oneOf([yup.ref('password'), null], 'Password Must Match').required('Confirm password')
});


const Register = () => {
    let history = useHistory()
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [showAlert, setShowAlert] = useState(false)


    // const handleRegisterChange = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation()
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     setUsers({ ...users, [name]: value })
    // }

    // const handleShow = (e) => {
    //    e.preventDefault()
    //    password === 'password' ? setPassword('text') && setColor(true) : setPassword('password') && setColor(false)
    // }
    

    // const handleSubmit = (event) => {
    //     event.preventDefault()

    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }

    //     var myHeaders = new Headers();
    //  myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
    //  myHeaders.append("Content-Type", "application/json");


    //     var raw = JSON.stringify({
    //         "email": `${users.email}`,
    //         "password": `${users.password}`,
    //         "mobile": `${users.mobile}`
    //     });


    // var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    // };

    // // https://grandlotto.herokuapp.com/api/v2/auth/profile

    //     fetch("http://localhost:5016/api/v1/register", requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             if (result.success) {
    //                 const { message } = result.success;
    //                 setSuccess(message)
    //             } else {
    //                 const { message } = result.error;
    //                 setError(message)
    //             }
    //         },
    //             (error) => {
    //                 console.log(error)
    //             }
    //     )
        
    //     users.email = ''
    //     users.mobile = ''
    //     users.password = ''
    // };

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
            <Container fluid='md'>
            <Row>
          <Col className='mt-5' md={{ span: 12, offset: 1 }}>
                        {success ? <section>
                            {showAlert && <span>{success}</span>}
             </section> : <section>
                            {showAlert && <span>{error}</span>}
             </section>
                        }
    <Formik
      validationSchema={schema}
        onSubmit={values => {
                    var myHeaders = new Headers();
     myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
     myHeaders.append("Content-Type", "application/json");


        var raw = JSON.stringify({
            "email": `${values.email}`,
            "password": `${values.password}`,
            "mobile": `${values.mobile}`
        });


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    // https://grandlotto.herokuapp.com/api/v2/auth/profile

        fetch("http://localhost:5016/api/v1/register", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    const { message } = result.success;
                    setSuccess(message)
                    history.push('/validate')
                } else {
                    const { message } = result.error;
                    setError(message)
                }
            },
                (error) => {
                    console.log(error)
                }
        )

      }}
      initialValues={{
        email: '',
        mobile: '',
        password: '',
        confPassword: '',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group as={Col} md="10" className='mt-2' controlId="validationFormik04">
            <Form.Label>Email</Form.Label>
                <Form.Control
                    value={values.email}
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Email"
                    isInvalid={!!errors.email}
                />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" className='mt-2' controlId="validationFormik04">
            <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                    type="text"
                    name="mobile"
                    onChange={handleChange}
                    placeholder="Mobile"
                    isInvalid={!!errors.mobile}
                    value={values.mobile}
                />
              <Form.Control.Feedback type="invalid">
                {errors.mobile}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" className='mt-2' controlId="validationFormik05">
                                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder="xxxxxxxxxxxxxxxx"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                                    />
                                            
            <Form.Control.Feedback className='d-inline-block' type="invalid">
                {errors.password}
              </Form.Control.Feedback>


            </Form.Group>
            <Form.Group as={Col} md="10" className='mt-2' controlId="validationFormik05">
                                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder="xxxxxxxxxxxxxxxx"
                                name="confPassword"
                                value={values.confPassword}
                                onChange={handleChange}
                                isInvalid={!!errors.confPassword}
                                    />
              <Form.Control.Feedback type="invalid">
                {errors.confPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Button className='mt-2 ml-3 my-3' type='submit' variant="outline-success">Submit</Button>
        </Form>
        
      )}
                        </Formik>
                                                <div>
                            <h6>Already have an account ?</h6>
                            <Button variant='success' onClick={handleLogin} className='mb-3' >Login</Button>
                            </div>





























                        {/* {success ? <section>
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
                        <Form.Group as={Col} md="8" controlId="validationCustom02" className='mt-2'>
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
                        <Form.Group as={Col} md="8" controlId="validationCustomUsername" className='mt-2'>
                                <Form.Label>Password</Form.Label>
                                <div className='d-flex'>
                            <Form.Control
                                type={password}
                                placeholder="xxxxxxxxxxxxxxxx"
                                    name="password"
                                    value={users.password}
                                onChange={handleRegisterChange}
                                aria-describedby="inputGroupPrepend"
                                    required
                                    />
                                    {
                                        users.password &&
                                        <span onClick={handleShow} className={`${color ? 'back show_password' : 'show_password'}`}>
                                            <p className='m-2'>Show</p> 
                                        </span>
                                    }

                                </div>
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" className='mt-2'>
                            <Form.Check
                                required
                                label="Agree to terms and conditions"
                                feedback="You must agree before submitting."
                                feedbackType="invalid"
                            />
                        </Form.Group>
                            <Button variant='success' className='mb-2 mt-2' type="submit">Submit</Button>
                             {success && <Link className='register_btn toggle ml-4 mb-5' variant='success' to='/validate'>
                           Vaidate
                        </Link>
                        }
                        </Form>
                        {!success &&
                        <div>
                            <h6>Already have an account ?</h6>
                            <Button variant='success' onClick={handleLogin} className='mb-3' >Login</Button>
                            </div>
                        } */}
                </Col>
            </Row>
        </Container>
        </section>
    );
}

 
    


export default Register



























