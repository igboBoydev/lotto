import React, { useState } from 'react';
import { useGlobalContext } from '../store/context';
import { Navbar, NavDropdown, Nav, Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import logo from '../static/assets/logo4.png'

const Navigation = () => {
    let { giveAccess, showBoard, logOut, logedIn } = useGlobalContext();
    let history = useHistory()
    const [error, setError] = useState(null)
    const [userLogin, setUserLogin] = useState({ mobile: '', password: '' });

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
                      console.log(token)
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
                                  localStorage.setItem('user', JSON.stringify(data))
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


    const handleLogOut = (e) => {
        e.preventDefault()
        history.push('/')
        localStorage.clear()
        logOut(true)
    }

    const handleHistory = (e) => {
        e.preventDefault()
        console.log(e.target)
    }

    const handleSettings = (e) => {
        e.preventDefault()
        console.log(e.target)
    }


    return (
        <main>
        <Navbar bg="light" expand="lg" className='d-none d-lg-flex justify-content-between'>
            <Navbar.Brand href="/">
                    <img src={logo} width='200px' alt="" />
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
                        <Button type='submit' className='mr-3' variant="outline-success">Login</Button>
                    </Form>
                    <span className='mt-2'>
                        <Link className='register_btn' to='/register'>Register</Link>
                    </span>
                       
                </div>
                }
                {
                    logedIn &&
                    <section className='d-flex mr-3'>
                        <DropdownButton
                            menuAlign="right"
                            title="View Profile Here"
                            id="dropdown-menu-align-right"
                        >
                            <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogOut}>Log out</Dropdown.Item>
                            <Dropdown.Item onClick={handleHistory}>Transaction History</Dropdown.Item>
                            <Dropdown.Item onClick={handleSettings}>Site Settings</Dropdown.Item>
                        </DropdownButton> 
                    </section>
                }
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
                        {logedIn &&
                            <section className='d-flex'>
                 
                                <Nav className="my-2 mb-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                                    <NavDropdown title="Profile" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
                                        <NavDropdown.Item onClick={handleLogOut}>Log out</NavDropdown.Item>
                                        <NavDropdown.Item onClick={handleHistory}>Transaction History</NavDropdown.Item>
                                        <NavDropdown.Item onClick={handleSettings}>Site Settings</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                   
                            </section>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
        </main>
    )
}


export default Navigation












    //     var myHeaders1 = new Headers();
    //       myHeaders1.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
    //       myHeaders1.append("timestamps", "1614848109");
    //       myHeaders1.append("Content-Type", "application/json");

    //     var raw1 = JSON.stringify({
    //         "mobile": `${userLogin.mobile}`,
    //         "password": `${userLogin.password}`
    //     });

    //     var requestOptions1 = {
    //         method: 'POST',
    //         headers: myHeaders1,
    //         body: raw1,
    //         redirect: 'follow'
    //     };
    
    // const requestSite1 = () => {
    //     fetch("http://localhost:5016/api/v1/login", requestOptions1)
    //         .then(res => {
    //             setSite1(res)
    //             giveAccess(res)
    //         })
    // }


    // if (isLoggedIn) {
    //        var myHeaders2 = new Headers();
    //     myHeaders2.append("signatures", "5a1131f2eb747be50714281ec3e68b759476c6dc9e1faf5fc5d91c552cf8c230");
    //     myHeaders2.append("Authorization", `Bearer ${isLoggedIn}`);
    // }

        



    //     var requestOptions2 = {
    //         method: 'GET',
    //         headers: myHeaders2,
    //         redirect: 'follow'
    //     };

    // const requestSite2 = () => {
    //     fetch("http://localhost:5016/api/v2/auth/profile", requestOptions2)
    //         .then(res => {
    //             console.log(res)
    //         })
    // };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //      await requestSite1();
    //     await requestSite2();
        
        
    // }

    // console.log(site1)
    //     console.log(site2)

    // const handleClick = (e) => {
    //     e.preventDefault()
    //     var myHeaders = new Headers();
    //     myHeaders.append("signatures", "5a1131f2eb747be50714281ec3e68b759476c6dc9e1faf5fc5d91c552cf8c230");
    //     myHeaders.append("Authorization", `Bearer ${isLoggedIn}`);

    // }
// state = {
//     site1: {},
//     site2: {}
//     }

// requestSite1 = data => {
//     fetch('site1Url', {
//         method: 'POST',
//         body: data
//     }).then(res => this.setState({ site1: res }))
// }

// requestSite2 = data => {
//     fetch('site2Url', {
//         method: 'POST',
//         body: data
//     }).then(res => this.setState({ site2: res }))
// }

// const handleSubmit = (event) => {
//     event.preventDefault();
//     this.setState({
//        input: event.target.value
//     })
//     const data = new FormData(event.target);
//     await this.requestSite1(data);
//     await this.requestSite2(data);
// }