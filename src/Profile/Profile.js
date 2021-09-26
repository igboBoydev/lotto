import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../store/context';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

const initialState = {
    firstName: '',
    lastName: '',
    dob: new Date(),
    gender: '',
    bvn: '',
    password: '',
    password2: '',
    sender_pin: '',
    customer_id: '',
    id_number: '',
    id_url: '',
    id_type: '',
    amount: '',
    pin: '',
    pin2: ''
}


const Profile = () => {
    let history = useHistory()
    const { logedIn, giveAccess, game, isLoggedIn, days, week } = useGlobalContext();
    const [user, setUser] = useState([])
    const [users, setUsers] = useState(initialState)
    const { profile, games } = useGlobalContext();
    const [getProfile, setGetProfile] = useState(true)
    const [kyc, setKyc] = useState(false)
    const [bank, setBank] = useState(false)
    const [password, setPasword] = useState(false)
    const [withdrawalPin, setWithdrawalPin] = useState(false)
    const [fundTransfer, setFundTransfer] = useState(false)
    const [isClicked, setIsClicked] = useState(false);
    const [menuItems, setMenuItems] = useState(game)

    const handleClick = (e) => {
        e.preventDefault()
        if (e.target.name === 'profile') {
            setGetProfile(true)
            setKyc(false)
            setBank(false)
            setPasword(false)
            setWithdrawalPin(false)
            setFundTransfer(false)
        } else if (e.target.name === 'kyc') {
            setGetProfile(false)
            setKyc(true)
            setBank(false)
            setPasword(false)
            setWithdrawalPin(false)
            setFundTransfer(false)
        } else if (e.target.name === 'transfer') {
            setGetProfile(false)
            setKyc(false)
            setBank(false)
            setPasword(false)
            setWithdrawalPin(false)
            setFundTransfer(true)
        } else if (e.target.name === 'password') {
            setGetProfile(false)
            setKyc(false)
            setBank(false)
            setPasword(true)
            setWithdrawalPin(false)
            setFundTransfer(false)
        } else if (e.target.name === 'pin') {
            setGetProfile(false)
            setKyc(false)
            setBank(false)
            setPasword(false)
            setWithdrawalPin(true)
            setFundTransfer(false)
        } else if (e.target.name === 'bank') {
            setGetProfile(false)
            setKyc(false)
            setBank(true)
            setPasword(false)
            setWithdrawalPin(false)
            setFundTransfer(false)
        } else {
            setGetProfile(true)
            setKyc(false)
            setBank(false)
            setPasword(false)
            setWithdrawalPin(false)
            setFundTransfer(false)
        }
    }

    

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user')
        if (loggedInUser ) {
            const foundUser = JSON.parse(loggedInUser)
            setUser(foundUser)
            giveAccess(isLoggedIn)
        }
    }, [])


    const categories = [...new Set(game.map((item) => item.name))]
    

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

    const handleLink = (e) => {
        e.preventDefault()
        history.push('/games')
    }

    //  const nums  = Array.from({ length: 100 }).map((_, idx) => idx)
    // console.log(nums)

    return (
        <main>
            <Container fluid>
                <Row>
                    <Col className='pl-4 days_column scrollbar d-none color d-lg-inline' md={2}>
                          <h6 className='draw'>Play Game</h6>
                        <section className='days scrollContent'>
                         
                            {categories.map((category) => {
                                return <p onClick={handleLink} className='category_p'>{category}</p>
                            })}
                        </section>
                    </Col>
                        <Col lg={10}>
                            <section>
                            <section>
                                <div className='d-flex paragraph_header justify-content-between'>
                                    <p className='profile_paragraph'>Wallet: {user.wallet}</p>
                                    <p className='profile_paragraph'>Mobile Number: {user.mobile}</p>
                                    <p className='profile_paragraph'> Withdrawable Balance: {user.withdrawable}</p>
                                    <p className='profile_paragraph'>ID: {user.customer_id}</p>
                                </div>
                        </section>
                        
                        <section className='d-flex pt-3 justify-content-between'>
                            <div>
                                <button className='profile_btn profile' name='profile' onClick={handleClick}>MY PROFILE</button>
                            </div>
                            <div>
                               <button className='profile_btn kyc' name='kyc' onClick={handleClick}>KYC DOCUMENTATION</button>
                            </div>
                              <div>
                               <button className='profile_btn transfer' name='transfer' onClick={handleClick}>FUND TRANSFER</button>
                            </div>
                            <div>
                               <button className='profile_btn password' name='password' onClick={handleClick}>CHANGE PASSWORD</button>
                            </div>
                            <div>
                               <button className='profile_btn pin' name='pin' onClick={handleClick}>WITHDRAWAL PIN</button>
                            </div>
                            <div>
                              <button className='profile_btn bank' name='bank' onClick={handleClick}> BANK</button>
                            </div>
                        </section>
                        <section className='d-flex justify-content-center mt-4'>
                            {getProfile &&
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
                            {kyc && 
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
                            {fundTransfer && 
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
                                    value={users.sender_pin}
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
                            {password &&  
                               <article>
                                    <h5>Update Password</h5>
                                    <p>Uploading your KYC documents is very essential so as to remove the limitations in withdrawing funds to your accounts.</p>
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
                             {withdrawalPin && 
                               <article>
                                    <h5>WithDrawal Pin</h5>
                                    <p>Uploading your KYC documents is very essential so as to remove the limitations in withdrawing funds to your accounts.</p>
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
                    </Col>
            </Row>
          </Container>

        </main>
    )
}

export default Profile
