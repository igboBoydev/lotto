import React, { useState } from 'react';
import { useGlobalContext } from '../context/context';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

const Register = () => {
    const [validated, setValidated] = useState(false);
    let { addUser } = useGlobalContext();
    const [user, setUser] = useState({ email: '', password: '', mobile: '' })

    const handleRegisterChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = (event) => {
      event.preventDefault()
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
        setValidated(true);
               
    if (user.email && user.password && user.mobile) {
        const newUser = { id: new Date().getTime().toString(), ...user}
        addUser(newUser)
        user.email = ''
        user.password = ''
        user.mobile = ''
    } else {
        return;
    }
    setUser('')
  };

    return (
        <section className='register_section'>
            <Container>
            <Row>
                <Col className='mt-5' md={{ span: 12, offset: 2 }}>
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
                        <Form.Group as={Col} md="8" controlId="validationCustom03">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={handleRegisterChange}
                                type="password" placeholder="Password"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a password you can easily remember and don't disclose to anyone.
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
                        <Button type="submit">Submit form</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </section>
    );
}

 
    


export default Register
















// const Register = () => {
//     let { addUser, isSubmitted, isLoggedIn, isRgistered, loggingIn } = useGlobalContext();
//     const [user, setUser] = useState({ email: '', password: '', mobile: '' })

//     const handleRegisterChange = (e) => {
//         e.preventDefault();
//         const name = e.target.name;
//         const value = e.target.value;
//         setUser({ ...user, [name]: value })
//     }

//         const handleFirstSubmit = (e) => {
//         e.preventDefault();
//         if (user.email && user.password && user.mobile) {
//             const newUser = { id: new Date().getTime().toString(), ...user}
//             addUser(newUser)
//             user.email = ''
//             user.password = ''
//             user.mobile = ''
//         } else {
//             return;
//         }
//         setUser('')
//     }
//     return (
            
//         <div>
//             <div className="nav-form">
//                 <form onSubmit={handleFirstSubmit}>
//                     <section className="email">
//                         <label htmlFor="email">Email</label>
//                         <input type="email" id='email' name='email' onChange={handleRegisterChange} placeholder='Email' value={user.email} />
//                     </section>
//                     <section className="password">
//                         <label htmlFor="password">Password</label>
//                         <input type="text" id='password' name='password' onChange={handleRegisterChange} placeholder='Password' value={user.password} />
//                     </section>
//                     <section className="">
//                         <label htmlFor="mobile">Mobile</label>
//                         <input type="text" id='mobile' name='mobile' onChange={handleRegisterChange} placeholder='Mobile' value={user.mobile} />
//                     </section>
//                     <button>Register</button>
//                 </form>
//             </div>
//         </div>
 
//     )
// }

// export default Register


