
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/context';
import { Navbar, NavDropdown, Nav, Form, Button, Container } from 'react-bootstrap';
import Register from './Register'
import logo from '../static/assets/logo4.png'

const Navigation = () => {
    let { loggingIn } = useGlobalContext();
    const [userLogin, setUserLogin] = useState({ email: '', password: '' });
    const [showLogin, setShowLogin] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;
        setUserLogin({ ...userLogin, [name]: value })
    }



      const handleSubmit = (e) => {
          e.preventDefault();
        if (userLogin.email && userLogin.password) {
            const grantAccess = { id: new Date().getTime().toString(), ...userLogin }
            loggingIn(grantAccess)
            setShowLogin(!showLogin)
        } else {
            setShowLogin(false)
            return;
          }
          userLogin.email = ''
          userLogin.password = ''
    }

    const handleRegister = (e) => {
        e.preventDefault()
        setIsRegistered(!isRegistered)
    }

    return (
        <main>
        <Navbar bg="light" expand="lg" className='d-none d-lg-flex justify-content-between'>
            <Navbar.Brand href="#">
                <img src={logo} width='200px' alt="" />
                </Navbar.Brand>
                 <div className='d-flex'>
                    <Form onSubmit={handleSubmit} inline justify-content-center className="d-flex">
                        <Form.Control name="email" onChange={handleLogin} type="email" placeholder="Email" className="mr-2" aria-label="Email" value={userLogin.email} />
                        <Form.Control onChange={handleLogin} type="password" name="password" placeholder="Password" className="mr-2" aria-label="Password" value={userLogin.password} />
                        <Button type='submit' className='mr-3' variant="outline-success">{!showLogin ? "LogIn" : "LogOut"}</Button>
                    </Form>
                    <span>
                        {!showLogin &&
                        <Button onClick={handleRegister} variant="outline-success">Register</Button>
                        }
                      
                    </span>
                       
                </div>
                <Nav className="my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                    <NavDropdown title="Language" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action3">English</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">French</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Greek</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Latin</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
        </Navbar>
        

        <Navbar bg="light" expand="lg" className='d-flex d-lg-none'>
                <Navbar.Brand href="#home">
                    <img src={logo} width='200px' alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                               <Form justify-content-center>
                                   <Form.Control name='email'  className='me-4' onChange={handleLogin} type="email" placeholder="Email" className="mr-2" aria-label="Email" value={userLogin.email} />
                                   <Form.Control name='password' className='ml-4' onChange={handleLogin} type="password" placeholder="Password" className="mr-2" aria-label="Password" value={userLogin.password}  />
                                   <Button className='m-2' onClick={handleSubmit} variant="outline-success">{!showLogin ? "LogIn" : "LogOut"}</Button>
                                   {!showLogin && <Button onClick={handleRegister}  variant="outline-success">Register</Button> }
                               </Form>
                       <NavDropdown className='ml-2' title="Language" id="basic-nav-dropdown">
                         <NavDropdown.Item href="#action/3.1">English</NavDropdown.Item>
                         <NavDropdown.Item href="#action/3.2">French</NavDropdown.Item>
                         <NavDropdown.Item href="#action/3.3">Greek</NavDropdown.Item>
                         <NavDropdown.Item href="#action/3.4">Latin</NavDropdown.Item>
                       </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <section>
                {isRegistered &&
                    <Register />
                }
            </section>
        </main>
    )
}
















export default Navigation





 {/* <main className="main_nav">
               <section>
                <div className="nav-logo">
                    <img src={logo} width='200px' alt="" />
                </div>
              </section>
              <section className="form_section">
                <div className='sec_nav_div'>
                        <div className="nav-form">
                       <form onSubmit={handleSubmit} >
                                <label htmlFor="">
                                   <input className='input first_input' type="email" id='email' onChange={handleLogin} placeholder='Email' name='email' value={userLogin.email} />
                                   <input className='input second_input' type="text" id='password' onChange={handleLogin} placeholder='Password' name='password' value={userLogin.password} />
                                </label>
                            <button className='login_btn' onClick={() => setShowLogin(!showLogin)}>{!showLogin ? "LogIn" : "LogOut"}</button>
                             {!showLogin ? <button className='register' onClick={() => setShowRegister(!showRegister) && !showLogin}>Register</button> : ''}
                        </form>
                    </div> 
                </div>
                </section>
                <section>
                    <div>
                    <select name="" id="">
                        <option value="">English</option>
                        <option value="">French</option>
                        <option value="">Russian</option>
                        <option value="">Latin</option>
                    </select>
                </div>
                </section>
            </main> */}


















// import React, { useState, useEffect } from 'react';
// import { useGlobalContext } from '../context/context';
// import logo from '../static/assets/logo4.png'

// const Navbar = () => {
//     let { addUser, isSubmitted, isLoggedIn, isRgistered, loggingIn } = useGlobalContext();
//     const [user, setUser] = useState({ email: '', password: '', mobile: '' })
//     const [userLogin, setUserLogin] = useState({ email: '', password: '' });
//     const [showLogin, setShowLogin] = useState(false)
//     const [showRegister, setShowRegister] = useState(false)
    
//     const handleRegisterChange = (e) => {
//         e.preventDefault();
//         const name = e.target.name;
//         const value = e.target.value;
//         setUser({ ...user, [name]: value })
//     }

//     const handleLogin = (e) => {
//         const name = e.target.name;
//         const value = e.target.value;
//         setUserLogin({ ...userLogin, [name]: value })
//     }

//     const handleFirstSubmit = (e) => {
//         e.preventDefault();
//         if (user.email && user.password && user.mobile) {
//             const newUser = { id: new Date().getTime().toString(), ...user}
//             addUser(newUser)
//         } else {
//             return;
//         }
//         setUserLogin('')
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         if (userLogin.email && userLogin.password) {
//             const grantAccess = { id: new Date().getTime().toString(), ...userLogin }
//             loggingIn(grantAccess)
//         } else {
//             return;
//         }
//         setUser('')
//     }



//     return (
//         <nav>
//             <section className='first_nav_section'>
//                 <div className="nav-logo">
//                     <img src={logo} width='200px' alt="" />
//                 </div>
//                 <div>
//                     <button onClick={() => setShowLogin(!showLogin)}>{!showLogin ? "LogIn" : "LogOut"}</button>


//                     {!showLogin ? <button onClick={() => setShowRegister(!showRegister) && !showLogin}>Register</button> : ''}
//                 </div>
//             </section>
//             <section className="form_section">
//                 <div>
//                     {showRegister && !showLogin &&
//                         <div className="nav-form">
//                             <form onSubmit={handleFirstSubmit}>
//                                 <section className="email">
//                                     <label htmlFor="email">Email</label>
//                                     <input type="email" id='email' name='email' onChange={handleRegisterChange} placeholder='Email' value={user.email} />
//                                 </section>
//                                 <section className="password">
//                                     <label htmlFor="password">Password</label>
//                                     <input type="text" id='password' name='password' onChange={handleRegisterChange} placeholder='Password' value={user.password} />
//                                 </section>
//                                 <section className="">
//                                     <label htmlFor="mobile">Mobile</label>
//                                     <input type="text" id='mobile' name='mobile' onChange={handleRegisterChange} placeholder='Mobile' value={user.mobile} />
//                                 </section>
//                                 <button>Register</button>
//                             </form>
//                         </div>
//                     }
//                 </div>
//                 <div>
//                     {
//                     showLogin && !showRegister && !isRgistered &&
//                         <div className="nav-form">
//                        <form onSubmit={handleSubmit} >
//                            <section className="email">
//                               <label htmlFor="email">Email</label>
//                               <input type="email" id='email' onChange={handleLogin} placeholder='Email' name='email' value={userLogin.email} />
//                            </section>
//                           <section className="password">
//                               <label htmlFor="password">Password</label>
//                             <input type="text" id='password' onChange={handleLogin} placeholder='Password' name='password' value={userLogin.password} />
//                            </section>
//                            <button>Login</button>
//                         </form>
//                     </div> 
//                     }
//                 </div>

//             </section>
//         </nav>
//     )
// }

// export default Navbar
