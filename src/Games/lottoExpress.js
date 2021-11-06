import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button, Form, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Countdown from "react-countdown";
import { useGlobalContext } from '../store/context';
import { useHistory } from 'react-router';
import { FaTimes } from 'react-icons/fa';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple, faGooglePlay, faFacebook, faYoutube, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios';
import GetWhatsapp from '../Fetch/GetWhatsapp'
import play from '../svg/play.svg'
import { RiBankLine, RiHome2Line, RiSdCardMiniLine, RiUserAddLine } from 'react-icons/ri';
import IntegrationNotistack from '../Fetch/IntegrationNotistack';

let date = new Date().getHours(0, 0, 0, 0);

const LottoExpress = () => {
    const [activeNums, setActiveNums] = useState(false)
    const [value, setValue] = useState(0);
    const [showAlert, setShowAlert] = useState(false)
    const [number, setNumber] = useState(0)
    const history = useHistory()
    const { logedIn } = useGlobalContext();
    let [array, setArray] = useState([])
    let [day, setDay] = useState(date)
    const [betSlip, setBetSlip] = useState([])
    let [arr, setArr] = useState([])
    const [getBet, setGetBet] = useState(false)
    const [success, setSuccess] = useState('')
    const [geteNums, setGetNums] = useState(false)
    const [timer, setTimer] = useState(moment().format('LTS'))
    const [showModal, setShowModal] = useState(false)
    const [expressMax, setExpressMax] = useState(null)
    const [subValue, setSubValue] = useState(0)
    const [showGameModal, setShowGameModal] = useState(false)
    var [count, setCount] = useState(0)
    const [how, setHow] = useState(true)
    const [slip, setSlip] = useState(false)

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

        const val = betSlip.reduce((total, money) => {
            total += parseInt(money.amount)
            return total;
        }, 0);

        if (val > 100000) {
            setSuccess(`Please kindly Note that you cannot place bet more than 10000 naira`)
            return;
        }else if (val < 1) {
            setSuccess(`Kindly add an amount`)
            return;
        } else {
            betSlip.filter((a, i) => {
            const { amount, amounts, stakeList } = a;
                if (amount < 1) {
                    setSuccess(`cannot place bet for ticket number ${i} please add an amount`)
                    return;
                } else {
                    var raw = JSON.stringify({
                "stakes": [
                    {
                        "value": `${amount}`,
                        "numbers": `${stakeList}`
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
            }
        });
        }

        
        setActiveNums(false)
    }

        useEffect(() => {
        let time = setTimeout(() => {
            setShowAlert(!showAlert)
            setSuccess('')
        }, 3000)

        return () => clearTimeout(time)
    }, [success]);

    const createSlip = () => {
        let data = {
            id: new Date().getTime().toString(),
            stakeList: array,
            amount: 0 || subValue * arr.length,
            amounts: subValue
        }
        betSlip.push(data)
        calculateTotalStake();
        setArr([]);
    }

    const calculateTotalStake = () => {
        setValue(0)
        const val = betSlip.reduce((total, money) => {
            total += parseInt(money.amount)
            return total;
        }, 0);
        setNumber(val)
        setCount(betSlip.length)
    }
    // http://www.v2nmobile.com/api/httpsms.php?u=${email}&p=${pass}&m=${'abelkelly}&r=${09047597017}&s=${senderID}&t=1`

    const calculateTotalStake1 = (newItem) => {
        setValue(0)
        const val = newItem.reduce((total, money) => {
            total += parseInt(money.amount)
            return total;
        }, 0);
        setNumber(val)
    }

    const handleBet = (e) => {
        e.preventDefault()
        if (array.length >= 5) {
            setActiveNums(false)
            setGetBet(true)
            createSlip()
            setArray([])
        } else {
            setSuccess('Please Select up to five Numbers')
            return;
        }
        
    }

    
    // const handleBetSubmit = (e) => {
    //     e.preventDefault()
    //     if (array.length < 5) {
    //         setError('Please Choose numbers to play')
    //         return;
    //     } else if (amount < 50) {
    //         setError('Please add an amount from 50 naira')
    //         return;
    //     } else {
    //         setShow(true)
    //         const newItem = { id: new Date().getTime().toString(), value: amount, numbers: numbers }
    //         setCount(count += 1)
    //         setArr([...arr, newItem])
    //     }

    // }


    const removeItem = (id) => {
        let newItem = betSlip.filter((item) => item.id !== id)
        if (newItem.length < 1) {
            setBetSlip([])
            setHow(true)
            setSlip(false)
            setCount(0)
            setShowGameModal(false)
            setNumber(0)
        } else {
            setBetSlip(newItem)
            setCount(count -= 1)
            // console.log(betSlip)
            calculateTotalStake1(newItem)
        }
        // setBetSlip(newItem)
    }

    const Completionist = ({setDay}) => {
        // setDay(Date.now())
        return <p>Games Drawn</p>
    }

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
    
    const handleInputChange = (e) => {
        e.preventDefault()
        let value = e.target.value
        if (value > parseInt(expressMax)) {
            setSuccess(`Cannot place bet with more than ${expressMax} naira`)
            return
        } else {
            setValue(value)
        }
    }

    useEffect(() => {
        if (window.innerWidth > 770) {
            setShowGameModal(false)
        }
    }, [])

    const handleInputSubmit = (data) => {
        data.amount = parseInt(value) * data.stakeList.length;
        data.amounts = parseInt(value)
        calculateTotalStake()
    }
    
    
    const handleRandom = e => {
        e.preventDefault()
        let ar = []
        const number = Math.floor(Math.random() * 90) + 1
        const number1 = Math.floor(Math.random() * 90) + 1
        const number2 = Math.floor(Math.random() * 90) + 1
        const number3 = Math.floor(Math.random() * 90) + 1
        const number4 = Math.floor(Math.random() * 90) + 1
        const num5 = Math.floor(Math.random() * 90) + 1
        ar = [number, number1, number2, number3, number4]
        let numberSet = new Set(ar)
        let a = [...numberSet]
        if (a.length !== 5) {
            a.push(num5)
            let x = new Set(a)
            let b = [...x]
            setArray(b)
        } else {
            setArray(a)
        }
    }

    return (

        <Container fluid className='black_bg'>
            {success && <IntegrationNotistack success={`${success}`} />}
            <div className='news pl-1 pl-lg-5 pb-2 pt-2 p_white d-flex justify-content-between'>
                {timer}
                <Link className='game_links first' to='/games'>Regular Lotto</Link>
                <Link className='game_links ml-3' to='/softlotto'>Soft Lotto</Link>
                                                        <Link to='#'>
                                          <p className='game_links first'>How to Play</p>
                                        </Link>
                                        <Link to='#'>
                                           <p className='game_links first'>Deposit Fund</p>
                                        </Link>
                                        <Link to='#'>
                                           <p className='game_links first'>First Bet</p>
                                        </Link>
                                                                    <div class="d-flex flex-right mr-2">
                                        <Link to='https://www.facebook.com'>
                                           <FontAwesomeIcon className=' backg color3' size-mode='1x' icon={faFacebook} />
                                        </Link>
                                        <Link to='https://www.twitter.com'>
                                           <FontAwesomeIcon className='ml-1 mr-1 backg color4' size-md='1x' icon={faTwitter} />
                                        </Link>
                                        <Link to='https://www.instagram.com'>
                                           <FontAwesomeIcon className='mr-1 backg color5' size-md='1x' icon={faInstagram} />
                                        </Link>
                                        <Link to='https://www.youtube.com'>
                                           <FontAwesomeIcon className=' backg color6'  size-md='1x' icon={faYoutube} />
                                        </Link>       
                </div>
                </div>
            <Row>
                <Col className='d-none d-lg-inline' lg={3}>
                    <section className='mt-2 ml-2 ml-lg-0 mb-2 mb-lg-0 pt-5'>
                        <img src={play} alt="" className='game_section_svg' />
                    </section>
                    
                </Col>
                <Col lg={5} className={`${showGameModal && 'display2'} boxplay`}>
                        <div className='mt-2 text-center'>
                            {nums.map((i) => {
                                return <Button key={i} name={!activeNums[i] && 'ready'} onClick={() => handleClass(i)} className={`${array.includes(i) ? 'game_clicked' : geteNums && 'red'} balx`} variant='outline-primary'>{i}</Button>
                            })}
                        </div>
                        <Row className="clearfix mt-2">
                            <Col md={4}>
                                <Button variant='outline-primary' className='thew' onClick={handleRandom}>Quick Pick</Button>
                            </Col>
                                <Col md={5}>
                                    <Button variant='outline-success' className='thew mt-2 mb-2 mt-lg-0 mb-lg-0' onClick={handleBet}>Add To BetSlip</Button>
                                </Col>
                            <Col md={3}>
                                <Button variant='outline-danger' className='thew' onClick={() => { setBetSlip([]); setHow(true); setSlip(false); setCount(0); setShowGameModal(false)}}>Clear</Button>
                            </Col>
                      </Row>
                </Col>
                <Col lg={3} className='show1'>
                        <Row className='mt-2'>
                            <div className={`col-md-6 col-sm-6 mbox1 text-center ${betSlip.length < 1 && 'disabled'}`} onClick={() => { setSlip(true); setHow(false); }}>BetSlip <span class="badge bg-secondary">{count}</span></div>
                            <div className="col-md-6 col-sm-6 text-center mgames1" onClick={() => { setSlip(false); setHow(true); }}>How To</div>
                        </Row>
                        <Row>
                        {
                            how ?
                            <div className="mybo col-sm-12" id="howto">
                            <ul>
                                <li>Choose a draw to play in (all the draw are at the same format, just a different times)</li>
                            </ul>
                                    </div> :
                                <section className='scroller bet_section mt-2'>
                    <div className='d-flex justify-content-between game_back'>
                            </div>
                            <div>
                                {betSlip.map((data) => {
                                    const { type, lines, id, gameId, stakeList, stakeList2, amount } = data;
                                    return (
                                        <main key={id} className='get_line'>
                                            <div className='d-flex justify-content-end'>
                                                <FaTimes onClick={() => {
                                                   removeItem(id)
                                                }}
                                                    className='cancel_game'
                                                />
                                            </div>
                                            <div>
                                                <p className='p_type'>Numbers: {stakeList.toString()} </p>
                                                <p className='p_type'>Enter Stake Amount: {amount}</p>
                                                {
                                                    id &&                                                 <Form key={id} onSubmit={(e) => {
                                                    e.preventDefault();
                                                    handleInputSubmit(data)
                                                }
                                                }>
                                                    <InputGroup size='sm' className="mb-3">
                                                        <Form.Control className='form_input' onChange={handleInputChange} value={value} size='sm' placeholder='Amount' />
                                                        <Button className='btn_secondary' type='submit' size='sm' variant='outline-secondary'>Submit</Button>
                                                    </InputGroup>

                                                </Form>
                                             }
                                             </div>
                                        </main>
                                        
                                    )
                                })}
                            </div>
                                                                        <section className='mt-2'>
                                                <div className='d-flex justify-content-between'>
                                                   <p className='p_type'>Number of Bets: </p>
                                                   <p className='p_type'>{betSlip.length}</p>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <p className='p_type'>Total Stake: </p>
                                                   <p className='p_type'>&#x20A6;{number}</p>
                                                </div>
                                                </section>
                                        <div className='d-flex justify-content-center'>
                                {!logedIn && <Button size='sm' className={`align-item-center mb-2 game`} variant='success' onClick={() => { setShowModal(!showModal); showGameModal && setShowGameModal(false)}}>Login To Place Bet</Button> }
                                {logedIn &&
                                    <Button size='sm' className={`align-item-center mb-2 game`} variant='success' onClick={handleSubmit}>Place Bet</Button>
                                }
                            </div>
                            
                </section>    
                            }
                        </Row>
                    </Col>
                   
                        <Col className={`${!showGameModal ? 'display' : 'c-sidebar --bet-slip is-open'} ${betSlip.length > 0 ? 'd_none scroll_game' : 'display'}`} md={3}>
                <section className='scroller bet_section mt-2'>
                    <div className='d-flex justify-content-between game_back'>
                                <button className="game_slip_btn" onClick={() => { setBetSlip([]); setCount(0); setShowGameModal(false)}}>Clear Slip</button>
                            </div>
                            <div>
                                {betSlip.map((data) => {
                                    const { id, stakeList, amount } = data;
                                    return (
                                        <main key={id} className='get_line'>
                                            <div className='d-flex justify-content-end'>
                                                <FaTimes onClick={() => {
                                                   removeItem(id)
                                                }}
                                                    className='cancel_game'
                                                />
                                            </div>
                                            <div>
                                                <p className='p_type'>Numbers: {stakeList.toString()} </p>
                                                <p className='p_type'>Enter Stake Amount: {amount}</p>
                                                <Form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    handleInputSubmit(data)
                                                }
                                                }>
                                                      <InputGroup size='sm' className="mb-3">
                                                        <Form.Control className='form_input' onChange={handleInputChange} value={value} size='sm' placeholder='Amount' />
                                                          <Button className='btn_secondary' type='submit' size='sm' variant='outline-secondary'>Submit</Button>
  </InputGroup>

                                                </Form>
                                             </div>
                                        </main>
                                        
                                    )
                                })}
                            </div>
                                                                        <section className='mt-2'>
                                                <div className='d-flex justify-content-between'>
                                                   <p className='p_type'>Number of Bets: </p>
                                                   <p className='p_type'>{betSlip.length}</p>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <p className='p_type'>Total Stake: </p>
                                                   <p className='p_type'>&#x20A6;{number}</p>
                                                </div>
                                                </section>
                                        <div className='d-flex justify-content-center'>
                                {!logedIn && <Button size='sm' className={`align-item-center mb-2 game`} variant='success' onClick={() => { setShowModal(!showModal); showGameModal && setShowGameModal(false)}}>Login To Place Bet</Button> }
                                {logedIn &&
                                    <Button size='sm' className={`align-item-center mb-2 game`} variant='success' onClick={handleSubmit}>Place Bet</Button>
                                }
                            </div>
                            
                </section>
            </Col>
                
                    <div class="row win">
                        <Col>
                           WIN 30 MILLION
                        </Col>
                  {/* <div class="col-md-12 col-sm-12 col-xs-12">
                      
                  </div> */}
              </div>
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

