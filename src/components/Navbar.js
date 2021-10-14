import React, { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from '../store/context';
import { Navbar, NavDropdown, Nav, Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import logo from '../static/assets/logo4.png'
import GrandLotto from '../svg/GrandLotto.svg'

const Navigation = () => {
    let { giveAccess, giveAdminAccess, showBoard, logOut, logedIn, isLoggedIn } = useGlobalContext();
    const isMounted = useRef(true)
    let history = useHistory()
    const [error, setError] = useState(null)
    const [userLogin, setUserLogin] = useState({ mobile: '', password: '' });
    const [user, setUser] = useState(null)
     let get = localStorage.getItem('token')

    const handleLogin = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const name = e.target.name;
        const value = e.target.value;
        setUserLogin({ ...userLogin, [name]: value })
    }

    // useEffect(() => {
    //     if (get) {
    //         let inter = setInterval(() => {
    //             var myHeaders = new Headers();
    //             myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
    //             myHeaders.append("timestamps", "1614848109");
    //             myHeaders.append("Authorization", `Bearer ${get}`);

    //             var requestOptions = {
    //                 method: 'GET',
    //                 headers: myHeaders,
    //                 redirect: 'follow'
    //             };

    //             fetch("http://localhost:5016/api/v2/auth/games/results", requestOptions)
    //                 .then(response => response.json())
    //                 .then(result => console.log(result))
    //                 .catch(error => console.log('error', error));
            
    //         }, 180000)
            
    //         return () => clearInterval(inter)
    //     }
    // })


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
                              if (result.success) {
                                  const { data } = result.success;
                                  showBoard(data)
                                //   localStorage.setItem('user', JSON.stringify(data))
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
                  } else {
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

    if (isLoggedIn) {
        localStorage.setItem('token', isLoggedIn)
    }

    const handleLogOut = (e) => {
        e.preventDefault()
        history.push('/')
        localStorage.clear()
        logOut(true)
    }

    const handleBetHistory = (e) => {
        e.preventDefault()
        history.push('/profile/betHistory')
    }

    const handleSettings = (e) => {
        e.preventDefault()
        console.log(e.target)
    }

    const handleTransactionHistory = (e) => {
        e.preventDefault()
        history.push('/profile/transactions')
    }

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("signatures", "3b55227b019105b2f8550792916ee41321b53fb2104fd0149e81c360811ef027");
        myHeaders.append("Authorization", `Bearer ${get}`);


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:5016/api/v2/auth/profile", requestOptions)
            .then(response => response.json())
            .then(result => {
                setUser(result.success.data)
                giveAccess(isLoggedIn)
            })
            .catch(error => console.log('error', error));
    }, []);


    useEffect(() => {
        const loggedInAdmin = localStorage.getItem('adminToken')
        if (loggedInAdmin) {
            giveAdminAccess(loggedInAdmin)
        }
        return () => {
            isMounted.current = false
        }
    }, [])


    return (
        <main>
        <Navbar bg="light" expand="lg" className='d-none d-lg-flex justify-content-between'>
            <Navbar.Brand href="./">
                    <img src={GrandLotto} width='200px' alt="" className='nav_img' />
                    {
                        logedIn &&
                        <Link className='links ml-2' to='/'>Home</Link>
                }
                </Navbar.Brand>
                {!logedIn  &&
                   <div className='d-flex'>
                    <Form onSubmit={handleSubmit} inline justify-content-center className="d-flex form_btn">
                        <Form.Control name="mobile" onChange={handleLogin} type="text" placeholder="090xxxxxxxx" className="mr-2" aria-label="Mobile" value={userLogin.mobile} />
                        <Form.Control onChange={handleLogin} type="password" name="password" placeholder="Password" className="mr-2" aria-label="Password" value={userLogin.password} />
                        <Button size='sm' type='submit' className='mr-3' variant="outline-success">Login</Button>
                    </Form>
                    <span className='mt-2'>
                        <Link size='sm' className='register_btn' to='/register'>Register</Link>
                    </span>
                       
                </div>
                }
                {
                    logedIn &&
                    <section className='d-flex mr-5'>
                            <DropdownButton
                            className='nav_dropdown'
                            variant='secondary'
                            size='sm'
                                menuAlign="left"
                                title="View Profile Here"
                                id="dropdown-menu-align-right"
                            >
                                <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogOut}>Log out</Dropdown.Item>
                                <Dropdown.Item onClick={handleTransactionHistory}>Transaction History</Dropdown.Item>
                                <Dropdown.Item onClick={handleBetHistory}>Bet History</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    history.push('/profile/results')
                                }}>Draw Results</Dropdown.Item>
                                <Dropdown.Item onClick={handleSettings}>Site Settings</Dropdown.Item>
                            </DropdownButton> 
                    </section>
                }
        </Navbar>
        

        <Navbar className='nav_height' bg="light" expand="lg" className='d-flex d-lg-none'>
                <Navbar.Brand href="./">
                    <img src={logo} width='150px' alt="" className='nav_img' />
                    
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!logedIn &&
                               <Form justify-content-center>
                                   <Form.Control name='mobile'  className='me-4 "mr-2' onChange={handleLogin} type="text" placeholder="090xxxxx" aria-label="Mobile" value={userLogin.mobile} />
                                   <Form.Control name='password' className='mt-2 "mr-2' onChange={handleLogin} type="password" placeholder="Password" aria-label="Password" value={userLogin.password}  />
                            <Button size='sm' className='m-2' onClick={handleSubmit} variant="outline-success">Login</Button>
                        <span className='mt-4'>
                            <Link size='sm' id='btn' className='register_btn' to='/register'>Register</Link>
                        </span>
                                  
                        </Form>
                      }
                        {logedIn &&
                            <section className='d-flex ml-4'>
                 
                                <DropdownButton
                                className='nav_dropdown'
                                variant='secondary'
                                size='sm'
                                menuAlign="right"
                                title="Profile"
                                id="dropdown-menu-align-right"
                            >
                                <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogOut}>Log out</Dropdown.Item>
                                <Dropdown.Item onClick={handleTransactionHistory}>Transaction History</Dropdown.Item>
                                <Dropdown.Item onClick={handleBetHistory}>Bet History</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    history.push('/profile/results')
                                }}>Draw Results</Dropdown.Item>
                                <Dropdown.Item onClick={handleSettings}>Site Settings</Dropdown.Item>
                            </DropdownButton>
                   
                            </section>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
        </main>
    )
}


export default Navigation

