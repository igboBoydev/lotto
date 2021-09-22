import React, { useState } from 'react';
import { useGlobalContext } from '../store/context';
import { Navbar, NavDropdown, Nav, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import logo from '../static/assets/logo4.png'

const Navigation = () => {
    let { giveAccess, isLoggedIn, showBoard, logOut, logedIn } = useGlobalContext();
    const [error, setError] = useState(null)
    const [userLogin, setUserLogin] = useState({ mobile: '', password: '' });
    const [showProfile, setShowProfile] = useState(false)

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
          var myHeaders = new Headers();
          myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
          myHeaders.append("timestamps", "1614848109");
          myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "mobile": `${userLogin.mobile}`,
            "password": `${userLogin.password}`
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
                    giveAccess(token)
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

          userLogin.mobile = ''
          userLogin.password = ''
    }

    const handleClick = (e) => {
        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("signatures", "5a1131f2eb747be50714281ec3e68b759476c6dc9e1faf5fc5d91c552cf8c230");
        myHeaders.append("Authorization", `Bearer ${isLoggedIn}`);



        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:5016/api/v2/auth/profile", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    const { data } = result.success;
                    showBoard(data)
                    localStorage.setItem('user', JSON.stringify(data))
                    setShowProfile(true)
                } else {
                    return;
                }
            },
                (error) => {
                    console.log(error)
                });
    }

    const handleLogOut = (e) => {
        e.preventDefault()
        localStorage.clear()
        logOut(true)
        setShowProfile(false)
    }



    return (
        <main>
        <Navbar bg="light" expand="lg" className='d-none d-lg-flex justify-content-between'>
            <Navbar.Brand href="/">
                <img src={logo} width='200px' alt="" />
                </Navbar.Brand>
                {!logedIn  &&
                   <div className='d-flex'>
                    <Form onSubmit={handleSubmit} inline justify-content-center className="d-flex form_btn">
                        <Form.Control name="mobile" onChange={handleLogin} type="text" placeholder="090xxxxxxxx" className="mr-2" aria-label="Mobile" value={userLogin.mobile} />
                        <Form.Control onChange={handleLogin} type="password" name="password" placeholder="Password" className="mr-2" aria-label="Password" value={userLogin.password} />
                        <Button type='submit' className='mr-3' variant="outline-success">Login</Button>
                    </Form>
                    <span className='mt-2'>
                        <Link className='register_btn' to='/register'>Register</Link>
                    </span>
                       
                </div>
               }
                <section className='d-flex'>
                    {logedIn &&
                     <div className='profile_link mr-2'>
                        <Link className='mr-5' onClick={handleClick} className='link'>Games</Link>
                    </div>
                    
                    }
                    {
                        showProfile &&
                         <div className='profile_link mr-2'>
                            <Link className='link ml-2' to='/profile'>Profile</Link>
                             <Link className='link ml-3' onClick={handleLogOut} >LogOut</Link>
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
                        {!logedIn &&
                               <Form justify-content-center>
                                   <Form.Control name='mobile'  className='me-4 "mr-2' onChange={handleLogin} type="text" placeholder="090xxxxx" aria-label="Mobile" value={userLogin.mobile} />
                                   <Form.Control name='password' className='mt-2 "mr-2' onChange={handleLogin} type="password" placeholder="Password" aria-label="Password" value={userLogin.password}  />
                            <Button className='m-2' onClick={handleSubmit} variant="outline-success">Login</Button>
                        <span className='mt-4'>
                            <Link id='btn' className='register_btn' to='/register'>Register</Link>
                        </span>
                                  
                        </Form>
                      }
                                        <section className=''>
                    {logedIn &&
                     <div className='profile_link mr-2'>
                           <Link onClick={handleClick} className='link'>Profile</Link>
                    </div>
                            }
                            {
                        showProfile &&
                         <div className='profile_link mr-2 d-flex flex-column'>
                                    <Link className='link' to='/profile'>Play Games</Link>
                                    <Link className='link mt-2' onClick={handleLogOut} >LogOut</Link>
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