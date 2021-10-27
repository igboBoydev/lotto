import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button, Form } from 'react-bootstrap'
import { useGlobalContext } from '../store/context';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useHistory } from 'react-router';
import moment from 'moment'
import GetWhatsapp from '../Fetch/GetWhatsapp'

const LottoExpress = () => {
    const [activeNums, setActiveNums] = useState(false)
    const { logedIn } = useGlobalContext();
    let [array, setArray] = useState([])
    let [day, setDay] = useState(1633291628230)
    const [numbers, setNumbers] = useState('')
    const [error, setError] = useState('')
    const [amount, setAmount] = useState('')
    const [getNums, setGetNums] = useState(false)
    const [show, setShow] = useState(false)
    const [getBet, setGetBet] = useState(false)
    const [arr, setArr] = useState([])
    const [gameType, setGameType] = useState('Regular')
    const [success, setSuccess] = useState('')
    const [timer, setTimer] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const history = useHistory()
      const [showModal, setShowModal] = useState(false)
 
    let nums = []

    for (let i = 1; i < 11; i++) {
        nums.push(i)
    }

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
            if (array.length < 3) {
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

    const handleClick = (e) => {
        e.preventDefault()
        setAmount(e.target.value)
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        setAmount(e.target.value)
    }
    
    const Completionist = ({setDay}) => {
        setDay(Date.now())
        return <p>Games Drawn</p>
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(arr)
        arr.filter((a) => {
        const { value, numbers, type } = a;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "stakes": [
                {
                    "value": `${value}`,
                    "numbers": `${numbers}`,
                    "type": `${type}`
                }
            ]
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
            const get = localStorage.getItem('token')

        fetch("http://localhost:5016/api/v1/placeSoftLotto", requestOptions)
            .then(response => response.json())
            .then(result => {
                    let show = result.result.map((res) => res)
                const { type, kind, odd, staked, date, possibleWinning, stakes, amount } = show[0]
                    let response = stakes.toString()
                    var myHeaders = new Headers();
                    myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
                    myHeaders.append("Authorization", `Bearer ${get}`);
                    myHeaders.append("Content-Type", "application/json");

                    var raw = JSON.stringify({
                        "amount": `${amount * stakes.length}`,
                        "type": `${type}`,
                        "kind": `${kind}`,
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
        })
        
    };

    const handleGameSubmit = (e) => {
        e.preventDefault()
        if(numbers.length < 3){
            setError('Please Choose numbers to play')
            return;
        } else if (amount < 50) {
            setError('Please add an amount from 50 naira')
            return;
        }else{
            setShow(true)
            const newItem = { id: new Date().getTime().toString(), value: amount, numbers: numbers, type: gameType}
            setArr([...arr, newItem])
        }

    }

    const handleSelect = (e) => {
        e.preventDefault()
        setGameType(e.target.value)
    }

    const handleBets = (e) => {
        e.preventDefault()
        if (array.length > 2) {
            setNumbers(array.toString())
            setArray([])
            setActiveNums(false)
            setGetBet(true)
        } else {
            setError('Please Select up to three(3) Numbers')
            return;
        }
        
    }

    useEffect(() => {
        setTimeout(() => {
        setError('')
    }, 3000)
    }, [error])


    useEffect(() => {
        setTimeout(() => {
            setShowAlert(!showAlert)
        }, 3000)
    }, [success]);

    useEffect(() => {
        const timeInterval = setInterval(() => {
          setTimer(moment().format('LTS'))
        }, 1000)

        return () => clearInterval(timeInterval)
    })

    const removeItem = (id) => {
        let newItem = arr.filter((item) => item.id !== id)
        setArr(newItem)
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem('date')
        if (loggedInUser ) {
            const foundDate = JSON.parse(loggedInUser)
            setDay(foundDate)
        }
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
                            <Link className='game_links ml-3' to='/lottoexpress'>Lotto Express</Link>
                        </div>
                            <div>
                                <div className='d-flex'>
                                    <p className='express_p ml-3 ml-lg-0'>Please atleast Pick Five(3) numbers</p>
                                    {success && <section className='small_message ml-3 mt-3'>
                                        {showAlert && <span className='green'>{success}</span>}
                                    </section>}
                                </div>
                                {gameType === 'Ordered' && <p className='green ml-3 ml-lg-0'>Extra Odds are added to your stake odds when you choose type as Ordered; if your picked numbers tallies exactly with the numbers drawn your odds would be higher</p>}
                                {gameType === 'Regular' && <p className='green ml-3 ml-lg-0'>No extra odds</p>}
                            <p className='p_red ml-3 ml-lg-0'>Games will will be Drawn after every five (5) minutes intervals</p>
                            </div>
                    <Form.Control as="select" required onChange={handleSelect} className='mb-3' custom>
                    <option name='NAP 1' value='Regular'>Regular</option>
                    <option name='NAP 2' value='Ordered'>Ordered</option>
                </Form.Control>
                    <div className='smalls'>
                        {nums.map((i)=> {
                         return <button key={i} name={!activeNums[i] && 'ready'} onClick={() => handleClass(i)} className={`${array.includes(i) ? 'lottoExpress' : getNums && 'grey' } lotto_btns`}>{i}</button>
                       })}
                    </div>
                        </section>
                        
                        
                        <Button className='mt-2 ml-2 ml-lg-0' onClick={handleBets} variant="outline-secondary">Place Bet</Button>
                        {success && <Button className='mb-1 btn_class' onClick={() => {history.push('/profile/betHistory')}} variant="outline-secondary">View Bets</Button>}
                        <p className='p_red mt-2 ml-2 ml-lg-0'>{error && error}</p>
                    </main>
                </Col>
                <Col>
                    <section className='mt-3 submit_section'>
                        <p>Numbers: <span className='green'>{numbers}</span></p>
                        <p>Amount per Line: <span className='green'>&#x20A6;{amount}</span></p>
                        <Form>
                            <Form.Control size='sm' className='form_input' onChange={handleInputChange} type="text" placeholder={`${amount}`} />
                        </Form>
                        <div className='mt-2 d-flex justify-content-lg-between'>
                            <Button className='mr-1 mr-lg-0 games game' value='50' size='sm' onClick={handleClick}>&#x20A6;50</Button>
                            <Button className='mr-1 mr-lg-0 'size='sm' value='100' size='sm' onClick={handleClick}>&#x20A6;100</Button>
                            <Button className='mr-1 mr-lg-0 'size='sm' value='200' size='sm' onClick={handleClick}>&#x20A6;200</Button>
                            <Button className='mr-1 mr-lg-0 'size='sm' value='300' size='sm' onClick={handleClick}>&#x20A6;300</Button>
                            <Button className='mr-1 mr-lg-0 'size='sm' value='400' size='sm' onClick={handleClick}>&#x20A6;400</Button>
                            <Button className='mr-1 mr-lg-0' size='sm' value='500' size='sm' onClick={handleClick}>&#x20A6;500</Button>
                        </div>
                        {!logedIn && <Button size='sm' className={`mt-3 align-item-center mb-2 game`} variant='success' onClick={() => setShowModal(!showModal)} variant="outline-success">Login To Place Bet</Button>}
                        {logedIn &&
                            <Button size='sm' className={`mt-3 align-item-center mb-2 game`} variant='success' onClick={handleGameSubmit} variant="outline-success">Place Bet</Button>
                        }
                    </section>
                    {
                        arr.length > 0 &&
                        <section className={`${arr.length > 2 && 'sub_section'}`}>
                            {
                                arr.length >= 1 &&
                                arr.map((a) => {
                                    const { id, value, numbers, odd } = a;
                                    return (
                                        <div key={id} className='sub_div'>
                                            <div className='d-flex justify-content-end'>
                                                <FaTimes onClick={() => {
                                                    removeItem(id)
                                                }}
                                                    className='cancel_game'
                                                />
                                            </div>
                                             <p>Numbers: <span className='p_red'>{numbers}</span></p>
                                             <p>Stake Amount: <span className='p_red'>&#x20A6;{parseInt(value) * 3}</span></p>
                                        </div>
                                    )
                                })
                            }
                            <Button className='margin mb-2' onClick={handleSubmit} variant='outline-success'>Submit</Button>
                            {success && <section className='small_message ml-3 mt-3'>
                                        {showAlert && <span className='green'>{success}</span>}
                                    </section>}
                        </section>
                    
                    }
                    
                </Col>
            </Row>
            {showModal && <GetWhatsapp />}
        </Container>
    )
}

export default LottoExpress