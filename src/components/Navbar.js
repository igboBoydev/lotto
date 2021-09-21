import React, { useState } from 'react';
import { useGlobalContext } from '../store/context';
import { Navbar, NavDropdown, Nav, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../static/assets/logo4.png'

const Navigation = () => {
    let { loggingIn, isLoggedIn, giveAccess } = useGlobalContext();
    const [userLogin, setUserLogin] = useState({ mobile: '', password: '' });
    const [showLogin, setShowLogin] = useState(false)
    const [isAuthenticated, setIsAuthenticted] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const name = e.target.name;
        const value = e.target.value;
        setUserLogin({ ...userLogin, [name]: value })
    }
      const handleSubmit = (e) => {
          e.preventDefault();
          e.stopPropagation()
        if (userLogin.mobile && userLogin.password) {
            const grantAccess = { id: new Date().getTime().toString(), ...userLogin }
                console.log(grantAccess.mobile)
                loggingIn(grantAccess)
            setShowLogin(!showLogin)
            giveAccess(true)
        } else {
            setShowLogin(false)
            return;
          }
          userLogin.mobile = ''
          userLogin.password = ''
    }


    return (
        <main>
        <Navbar bg="light" expand="lg" className='d-none d-lg-flex justify-content-between'>
            <Navbar.Brand href="/">
                <img src={logo} width='200px' alt="" />
                </Navbar.Brand>
                {!isLoggedIn && 
                   <div className='d-flex'>
                    <Form onSubmit={handleSubmit} inline justify-content-center className="d-flex form_btn">
                        <Form.Control name="mobile" onChange={handleLogin} type="text" placeholder="090xxxxxxxx" className="mr-2" aria-label="Mobile" value={userLogin.mobile} />
                        <Form.Control onChange={handleLogin} type="password" name="password" placeholder="Password" className="mr-2" aria-label="Password" value={userLogin.password} />
                        <Button type='submit' className='mr-3' variant="outline-success">{!showLogin ? "LogIn" : "LogOut"}</Button>
                    </Form>
                    <span className='mt-2'>
                        {!showLogin &&
                            <Link className='register_btn' to='/register'>Register</Link>
                        }
                      
                    </span>
                       
                </div>
               }
                <section className='d-flex'>
                    {isLoggedIn &&
                     <div className='profile_link mr-2'>
                           <Link className='link' to=''>Profile</Link>
                    </div>
                    }
                    
                    <Nav className="my-2 mb-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                    <NavDropdown title="Language" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action3">English</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">French</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Greek</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Latin</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </section>
        </Navbar>
        

        <Navbar className='nav_height' bg="light" expand="lg" className='d-flex d-lg-none'>
                <Navbar.Brand href="#home">
                    <img src={logo} width='200px' alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!isLoggedIn && 
                               <Form justify-content-center>
                                   <Form.Control name='mobile'  className='me-4 "mr-2' onChange={handleLogin} type="text" placeholder="090xxxxx" aria-label="Mobile" value={userLogin.mobile} />
                                   <Form.Control name='password' className='mt-2 "mr-2' onChange={handleLogin} type="password" placeholder="Password" aria-label="Password" value={userLogin.password}  />
                            <Button className='m-2' onClick={handleSubmit} variant="outline-success">{!showLogin ? "LogIn" : "LogOut"}</Button>
                            <span className='mt-4'>
                        {!showLogin &&
                            <Link id='btn' className='register_btn' to='/register'>Register</Link>
                        }
                      
                    </span>
                                  
                        </Form>
                      }
                                        <section className=''>
                    {isLoggedIn &&
                     <div className='profile_link mr-2'>
                           <Link className='link' to=''>Profile</Link>
                    </div>
                    }
                    
                    <Nav className="my-2 mb-2 my-lg-0" navbarScroll>
                    <NavDropdown title="Language" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action3">English</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">French</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Greek</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Latin</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </section>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
        </main>
    )
}


export default Navigation