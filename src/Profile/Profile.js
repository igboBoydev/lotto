import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../store/context';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';

const initialState = {
    firstName: '',
    lastName: '',
    dob: new Date(),
    gender: '',
    bvn: '',
    password: '',
    password2: '',
    sender_id: '',
    customer_id: '',
    id_number: '',
    id_url: '',
    id_type: '',
    amount: '',
    pin: '',
    pin2: ''
}


const Profile = () => {
    const {logedIn} = useGlobalContext()
    const [users, setUsers] = useState(initialState)
    const { profile, games } = useGlobalContext();
    const [getProfile, setGetProfile] = useState(false)
    const [kyc, setKyc] = useState(false)
    const [bank, setBank] = useState(false)
    const [password, setPasword] = useState(false)
    const [withdrawalPin, setWithdrawalPin] = useState(false)
    const [fundTransfer, setFundTransfer] = useState(false)
    const [user, setUser] = useState(null)

    const handleRegisterChange = (e) => {
        e.preventDefault()
        let name = e.target.name;
        let value = e.target.value;
        setUsers({...users, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(users)
    }


    useEffect(() => {
        const loggedInUser = localStorage.getItem('user')
        if (loggedInUser ) {
            const foundUser = JSON.parse(loggedInUser)
            setUser(foundUser)
        }
    }, [])



    return (
        <main>
            {logedIn && 
            <Container fluid>
                <Row>
                    <Col md={2}>
                    </Col>
                    <Col md={10}>
                        {user &&
                            <section>
                            <section>
                                <div className='d-flex justify-content-between'>
                                    <p>Wallet: {user.wallet}</p>
                                    <p>Mobile Number: {user.mobile}</p>
                                    <p> Withdrawable Balance: {user.withdrawable}</p>
                                    <h5>ID: {user.customer_id}</h5>
                                </div>
                        </section>
                        
                        <section className='d-flex justify-content-between'>
                            <div>
                                <button onClick={() => setGetProfile(!getProfile)}>MY PROFILE</button>
                            </div>
                            <div>
                               <button onClick={() => setKyc(!kyc)}>KYC DOCUMENTATION</button>
                            </div>
                              <div>
                               <button onClick={() => setFundTransfer(!fundTransfer)}>FUND TRANSFER</button>
                            </div>
                            <div>
                               <button onClick={() => setPasword(!password)}>CHANGE PASSWORD</button>
                            </div>
                            <div>
                               <button onClick={() => setWithdrawalPin(!withdrawalPin)}>WITHDRAWAL PIN</button>
                            </div>
                            <div>
                              <button onClick={() => setBank(!bank)}> BANK</button>
                            </div>
                        </section>
                        <section className='d-flex justify-content-center mt-4'>
                            {getProfile && !kyc && !fundTransfer && !bank && !password && !withdrawalPin &&
                              <article>
                                <h5>Update Profile</h5>
                            <p>Please fill the form below to setup your profile information. Kindly note that your name must match your bank account name.</p>
                             <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group as={Col} md="8" controlId="validationCustom01">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="firstName"
                                value={users.firstName}
                                onChange={handleRegisterChange}
                                placeholder="First Name"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="8" controlId="validationCustom02">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="lastName"
                                value={users.lastName}
                                onChange={handleRegisterChange}
                                placeholder="Last Name"
                                />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="8" controlId="validationCustomUsername">
                            <Form.Label>Date Of Birth</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                name="dob"
                                value={users.dob}
                                onChange={handleRegisterChange}
                                placeholder="11/22/1896"
                                />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please Enter A valid Date Of Birth.
                            </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="8" controlId="validationCustomUsername">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="MALE/FEMALE"
                                name="gender"
                                value={users.gender}
                                onChange={handleRegisterChange}
                                aria-describedby="inputGroupPrepend"
                                required
                                />
                            <Form.Control.Feedback type="invalid">
                                Gender.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant='success' className='mb-3 mt-3' type="submit">Submit</Button>
                        </Form>
                            </article>
                            }
                            {!profile && kyc && !fundTransfer && !bank && !password && !withdrawalPin && 
                               <article>
                                <h5>KYC Update</h5>
                            <p>Uploading your KYC documents is very essential so as to remove the limitations in withdrawing funds to your accounts.</p>
                             <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group as={Col} md="8" controlId="validationCustom01">
                            <Form.Label>BVN</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="bvn"
                                onChange={handleRegisterChange}
                                placeholder="1234xxxxxxxxxxxxx"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="8" className='mt-4' controlId="validationCustom02">
                            <Form.Label className='mr-3'>ID Type</Form.Label>
                            <Form.Select aria-label="Default select example">
                              <option>Select Your Idebtity Type</option>
                              <option value={users.id_type}>National ID (NIN)</option>
                              <option value={users.id_type}>International Passport</option>
                              <option value={users.id_type}>Driver's License</option>
                              <option value={users.id_type}>Voter's Card</option>
                            </Form.Select>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                                <Form.Group as={Col} md="8" controlId="validationCustomUsername">
                            <Form.Label>ID Document</Form.Label>
                            <Form.Control
                                required
                                type="file"
                                name="id_url"
                                onChange={handleRegisterChange}
                                placeholder="1234xxxxxxxxxxxxx"
                                required
                            />
                        </Form.Group>
                        <Button variant='success' className='mb-3 mt-3' type="submit">Submit</Button>
                        </Form>
                            </article>
                            }
                            {!profile && !kyc && fundTransfer && !password && !withdrawalPin && !bank && 
                               <article>
                                <h5>Fund Transfer</h5>
                            <p>Uploading your KYC documents is very essential so as to remove the limitations in withdrawing funds to your accounts.</p>
                             <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group as={Col} md="8" controlId="validationCustom01">
                            <Form.Label>Receiver ID</Form.Label>
                            <Form.Control
                                    required
                                    value={users.customer_id}
                                type="text"
                                name="customer_id"
                                onChange={handleRegisterChange}
                                placeholder="Friend's ID"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="8" controlId="validationCustom02">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                    required
                                            value={users.amount}
                                type="text"
                                name="amount"
                                onChange={handleRegisterChange}
                                placeholder="1000000000"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="8" controlId="validationCustomUsername">
                            <Form.Label>Sender ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="YOUR ID"
                                    name="sender_id"
                                    value={users.sender_id}
                                onChange={handleRegisterChange}
                                aria-describedby="inputGroupPrepend"
                                required
                                />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                                </Form.Group>
                        <Button variant='success' className='m-3' type="submit">Submit</Button>
                        </Form>
                            </article>
                            }
                            {!profile && !kyc && !fundTransfer && password && !withdrawalPin && !bank && 
                               <article>
                                <h5>Update Password</h5>
                            <p></p>
                             <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group as={Col} md="8" controlId="validationCustom01">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                    required
                                    value={users.password}
                                type="text"
                                name="password"
                                onChange={handleRegisterChange}
                                placeholder="xxxxxxxxxx"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="8" controlId="validationCustom01">
                            <Form.Label>Verify Password</Form.Label>
                            <Form.Control
                                    required
                                    value={users.password2}
                                type="text"
                                name="password"
                                onChange={handleRegisterChange}
                                placeholder="xxxxxxxxxx"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant='success' className='m-3' type="submit">Submit</Button>
                        </Form>
                            </article>
                            }
                             {!profile && !kyc && !fundTransfer && !password && withdrawalPin && !bank && 
                               <article>
                                <h5>WithDrawal Pin</h5>
                            <p>Set your withdrawal pin</p>
                             <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group as={Col} md="8" controlId="validationCustom01">
                            <Form.Label>Withdrawal Pin</Form.Label>
                            <Form.Control
                                    required
                                    value={users.pin}
                                type="text"
                                name="pin"
                                onChange={handleRegisterChange}
                                placeholder="xxxxxxxxxx"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="8" controlId="validationCustom01">
                            <Form.Label>Verify Withdrawal Pin Pin</Form.Label>
                            <Form.Control
                                    required
                                    value={users.pin2}
                                type="text"
                                name="pin2"
                                onChange={handleRegisterChange}
                                placeholder="xxxxxxxxxx"
                                required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant='success' className='m-3' type="submit">Submit</Button>
                        </Form>
                            </article>
                            }
                            
                        </section>
                        </section>
                        }
                    </Col>
            </Row>
          </Container>
            }
        </main>
    )
}

export default Profile
