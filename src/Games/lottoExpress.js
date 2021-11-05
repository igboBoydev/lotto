import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Countdown from "react-countdown";
import { useGlobalContext } from '../store/context';
import { useHistory } from 'react-router';
import { FaTimes } from 'react-icons/fa';
import moment from 'moment'
import axios from 'axios';
import GetWhatsapp from '../Fetch/GetWhatsapp'
import { RiBankLine, RiHome2Line, RiSdCardMiniLine, RiUserAddLine } from 'react-icons/ri';

let date = new Date().getHours(0, 0, 0, 0);

const LottoExpress = () => {
    const [activeNums, setActiveNums] = useState(false)
    const history = useHistory()
    const { logedIn } = useGlobalContext();
    let [array, setArray] = useState([])
    let [day, setDay] = useState(date)
    const [numbers, setNumbers] = useState([])
    const [error, setError] = useState('')
    const [amount, setAmount] = useState('')
    const [show, setShow] = useState(false)
    const [getBet, setGetBet] = useState(false)
    const [arr, setArr] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [success, setSuccess] = useState('')
    const [geteNums, setGetNums] = useState(false)
    const [timer, setTimer] = useState(moment().format('LTS'))
    const [showModal, setShowModal] = useState(false)
    const [expressMax, setExpressMax] = useState(null)
    const [showGameModal, setShowGameModal] = useState(false)
    var [count, setCount] = useState(0)

    let nums = []

    for (let i = 1; i < 91; i++) {
        nums.push(i)
    }

    const get = localStorage.getItem('token')

    const handleSubmit = (e) => {
        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("signatures", "95631547ca07a9ca16e1116e577199003e96bf55fb110b3ccbc9ed1c1b2092e8");
        myHeaders.append("Authorization", `Bearer ${get}`);
        myHeaders.append("Content-Type", "application/json");

        arr.filter((a) => {
            const { value, numbers } = a;

            var raw = JSON.stringify({
                "stakes": [
                    {
                        "value": `${value}`,
                        "numbers": `${numbers}`
                    }
                ]
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:5016/api/v1/placeLottoExpressStake", requestOptions)
                .then(response => response.json())
                .then(result => {
                    let show = result.result.map((res) => res)
                    const { type, odd, staked, date, possibleWinning, stakes, amount } = show[0]
                    let response = stakes.toString()
                    var myHeaders = new Headers();
                    myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
                    myHeaders.append("Authorization", `Bearer ${get}`);
                    myHeaders.append("Content-Type", "application/json");

                    var raw = JSON.stringify({
                        "amount": `${amount * stakes.length}`,
                        "type": `${type}`,
                        "odd": `${odd}`,
                        "possibleWinning": `${possibleWinning}`,
                        "staked": `${staked}`,
                        "stakes": `${response}`,
                        "date": `${date}`
                    });

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch("http://localhost:5016/api/v2/auth/betHistory", requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            const { message } = result.success;
                            setSuccess(message)
                        })
                        .catch(error => console.log('error', error));
                })
                .catch(error => console.log('error', error));
        });
        setActiveNums(false)
    }

    
    const handleBetSubmit = (e) => {
        e.preventDefault()
        if (array.length < 5) {
            setError('Please Choose numbers to play')
            return;
        } else if (amount < 50) {
            setError('Please add an amount from 50 naira')
            return;
        } else {
            setShow(true)
            const newItem = { id: new Date().getTime().toString(), value: amount, numbers: numbers }
            setCount(count += 1)
            setArr([...arr, newItem])
        }

    }

    const handleClick = (e) => {
        e.preventDefault()
        const value = e.target.value
        if (value > expressMax) {
            setSuccess(`Cannot place bet with more than ${expressMax} naira`)
            return
        } else {
           setAmount(e.target.value)
        }
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        if (value > parseInt(expressMax)) {
            setSuccess(`Cannot place bet with more than ${expressMax} naira`)
            return
        } else {
            setAmount(e.target.value)
        }
    }
    
    const handlePlaceBets = (e) => {
        e.preventDefault()
        if (array.length >= 5) {
            setNumbers(array.toString())
            setActiveNums(false)
            setGetBet(true)
        } else {
            setError('Please Select up to five Numbers')
            return;
        }
        
    }

    useEffect(() => {
        setTimeout(() => {
        setError('')
    }, 3000)
    }, [error])

    const removeItem = (id) => {
        let newItem = arr.filter((item) => item.id !== id)
        setArr(newItem)
        setCount(count -= 1)
    }

    const Completionist = ({setDay}) => {
        // setDay(Date.now())
        return <p>Games Drawn</p>
    }

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(!showAlert)
        }, 3000)
    }, [success]);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('time')
        if (loggedInUser ) {
            const foundTime = JSON.parse(loggedInUser)
            setDay(foundTime)
        }
    }, [])

    useEffect(() => {
        const timeInterval = setInterval(() => {
          setTimer(moment().format('LTS'))
        }, 500)

        return () => clearInterval(timeInterval)
    })

    const handleClass = (i) => {
        setActiveNums((state) => {
            return {
                ...state,
                [i]: !state[i],
            };
        });

        if (array.includes(i)) {
            const index = array.indexOf(i)
            if (index > -1) {
                array.splice(index, 1)
            }
        } else {
            if (array.length < 10) {
                array.push(i)
            } else {
                setGetNums((state) => {
                    return {
                        ...state,
                        [i]: !state[i],
                    };
                });
            }
        }
        
    }

        useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:5016/api/v1/gamemaxamount", requestOptions)
            .then(response => response.json())
            .then(result => {
                result.showMax.map((value) => {
                    if (value.type === 'Lotto Express') {
                        setExpressMax(value.value)
                    } else {
                        return;
                    }
                })
            })
            .catch(error => console.log('error', error));
        
    }, [])

    return (

        <Container fluid>
            <div className='news pl-1 pl-lg-5 pb-2 pt-2 p_white'>
                {timer}
            </div>
            <Row>
                <Col className='express_border'>
                    <main className='express_section'>
                        <section>
                        <div className='d-md-flex mb-4 p-2 p-lg-0'>
                            <Link className='game_links first' to='/games'>Regular Lotto</Link>
                            <Link className='game_links ml-3' to='/softlotto'>Soft Lotto</Link>
                        </div>
                            <div>
                                <div className='d-flex'>
                                    <p className='express_p'>Please Pick Five(5) numbers</p>
                                </div>
                            <p className='p_red ml-3 ml-lg-0'>Games will will be Drawn after every thirty (30) minutes Intervals</p>
                                {/* <Countdown key={day} className='ml-2' date={date + new Date().getHours(0,30,0)}>
                                  <Completionist setDay={setDay}/>
                                </Countdown> */}
                                <Countdown key={day} className='ml-2 mb-3' date={day + new Date().setHours(
                                    0,0,0)}>
                                  <Completionist setDay={setDay}/>
                                </Countdown>
                            </div>
                            <div className='smalls'>
                                {nums.map((i)=> {
                                    return <button key={i} name={!activeNums[i] && 'ready'} onClick={() => handleClass(i)} className={`${array.includes(i) ? 'lottoExpress' : geteNums && 'grey' } lotto_btns`}>{i}</button>
                                })}
                            </div>
                        </section>
                        
                        <div>
                        <Button className='mt-2 ml-2 ml-lg-0' onClick={handlePlaceBets} variant="outline-secondary">Place Bet</Button>
                        {success && <Button className='mb-1 btn_class' onClick={() => {history.push('/profile/betHistory')}} variant="outline-secondary">View Bets</Button>}
                        </div>

                        <p className='p_red mt-2 ml-2 ml-lg-0'>{error && error}</p>
                    </main>
                </Col>
                <Col>
                    <section className='mt-3 submit_section'>
                        <p className='pl-2 pl-lg-0'>Numbers: <span className='green'>{numbers}</span></p>
                        <p className='pl-2 pl-lg-0'>Amount per Line: <span className='green'>&#x20A6;{amount}</span></p>
                        <Form>
                            <Form.Control size='sm' value={amount} className='form_input' onChange={handleInputChange} type="text" placeholder="Amount" />
                        </Form>
                        <div className='mt-2 d-flex justify-content-between pl-2 pl-lg-0'>
                            <Button className='mr-1 mr-lg-0 games game' value='50' size='sm' onClick={handleClick}>&#x20A6;50</Button>
                            <Button className='mr-1 mr-lg-0 'size='sm' value='100' size='sm' onClick={handleClick}>&#x20A6;100</Button>
                            <Button className='mr-1 mr-lg-0 'size='sm' value='200' size='sm' onClick={handleClick}>&#x20A6;200</Button>
                            <Button className='mr-1 mr-lg-0 'size='sm' value='300' size='sm' onClick={handleClick}>&#x20A6;300</Button>
                        </div>
                        {!logedIn && <Button size='sm' className='mt-3 mb-2 game ml-2 ml-lg-0' variant='success' onClick={() => setShowModal(!showModal)}  variant="outline-success">Login To Place Bet</Button> }
                        {logedIn &&
                            <Button size='sm' className='mt-3 mb-2 game ml-2 ml-lg-0' variant='success' onClick={handleBetSubmit} variant="outline-success">Place Bet</Button>
                        }
                        {success && <section className='small_message ml-3 mt-3'>
                            {showAlert && <span className='green'>{success}</span>}
                        </section>}
                    </section>

                    {
                        arr.length > 0 &&
                        <section className={`${!showGameModal ? 'display' : 'c-sidebar --bet-slip is-open pt-5 background2'} ${arr.length > 2 && 'sub_section'}`}>
                            {
                                arr.length >= 1 &&
                                arr.map((a) => {
                                    const { id, value, numbers } = a;
                                    return (
                                        <div key={id} className={`${showGameModal ? 'sub_divs' : 'sub_div'}`}>
                                            <div className='d-flex justify-content-end'>
                                                <FaTimes onClick={() => {
                                                    removeItem(id)
                                                }}
                                                    className='cancel_game'
                                                />
                                            </div>
                                             <p>Numbers: <span className='p_red'>{numbers}</span></p>
                                             <p>Stake Amount: <span className='p_red'>&#x20A6;{parseInt(value) * array.length}</span></p>
                                        </div>
                                    )
                                })
                            }

                            <Button onClick={handleSubmit} className='margin ml-2 mb-5' variant='outline-danger'>Place Bet</Button>
                            <section className='mb-5'></section>
                            {success && <section className='small_message ml-3 mt-3 mb-5'>
                                        {showAlert && <span className='green'>{success}</span>}
                                    </section>}
                                </section>
                             }
                    
                </Col>
            </Row>
            {showModal && <GetWhatsapp />}
                        <section className='bottom'>
                <div className='game_item' onClick={() => { showGameModal && setShowGameModal(false); history.push('/') }}>
                    <RiHome2Line className='select_icon' />
                    <span className='select_item'>Home</span>
                </div>
                <div className='game_item' onClick={() => setShowGameModal(!showGameModal)}>
                    <span className='bet_count'>{count}</span>
                    <RiSdCardMiniLine className='select_icon' />
                    <span className='select_item'>BetSlip</span>
                </div>
                <div className={`game_item ${!logedIn && 'disabled getLogged'}`} onClick={() => { showGameModal && setShowGameModal(false); history.push('/profile') }}>
                    <RiBankLine className='select_icon' />
                    <span className='select_item'>Deposit</span>
                </div>
                <div className='game_item' onClick={() => { showGameModal && setShowGameModal(false); history.push('/register') }}>
                    <RiUserAddLine className='select_icon' />
                    <span className='select_item'>Register</span>
                </div>
            
        </section>
        </Container>
    )
}

export default LottoExpress
















































// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap'
// import { Link } from 'react-router-dom';
// import { useGlobalContext } from './store/context';

// const LottoApi = () => {
//     const { game } = useGlobalContext();
//     let games = game.slice(0, 5)
    

//     return (
    
//         <div className='games-container mt-3 d-flex justify-content-between'>
//             {games.map((lotto) => {
//                 const { name, startTime, id} = lotto;
//                 return (
//                     <Container className='mb-3' key={id}>
//                        <section className='games-card p-3 text-center'>
//                        <h3  className='name'>{name}</h3>
//                          <p>{startTime}</p>
//                         <Link size='sm' className='lottoApi_Link' to='/games'>Play Game</Link>
//                     </section>
//                     </Container>
                    
//                 )
//             })}
//         </div>
//     )
// }

// export default LottoApi

