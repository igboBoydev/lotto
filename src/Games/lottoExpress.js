import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button, Form } from 'react-bootstrap'
import Countdown from "react-countdown";
import { useGlobalContext } from '../store/context';
import { FaTimes } from 'react-icons/fa';

const LottoExpress = () => {
    const [activeNums, setActiveNums] = useState(false)
    const { logedIn } = useGlobalContext();
    let [array, setArray] = useState([])
    let [day, setDay] = useState(1633292094629)
    const [numbers, setNumbers] = useState('')
    const [error, setError] = useState('')
    const [amount, setAmount] = useState('')
    const [show, setShow] = useState(false)
    const [getBet, setGetBet] = useState(false)
    const [arr, setArr] = useState([])

    let nums = []

    for (let i = 1; i < 91; i++) {
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
            array.push(i)
            if (array.length > 5) {
                setActiveNums(false)
                array.length = 5
                return;
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
    
    const Completionist = () => {
        return <p>Games Drawn</p>
    }

    const handleGameSubmit = (e) => {
        e.preventDefault()
        if(numbers.length < 5){
            setError('Please Choose numbers to play')
            return;
        } else if (amount < 50) {
            setError('Please add an amount from 50 naira')
            return;
        }else{
             setShow(true)
            const newItem = { id: new Date().getTime().toString(), value: amount, numbers: numbers, odd: ''}
            setArr([...arr, newItem])
            setArray([])
        }

    }

    const handleBets = (e) => {
        e.preventDefault()
        if (array.length === 5) {
            setNumbers(array.toString())
            setActiveNums(false)
            setGetBet(true)
        } else {
            setError('Please Select up to five Numbers')
            return;
        }
        
    }

    if (day !== (new Date().getTime() + 30 * 60000)) {
        // setDay(Date.now())
        console.log('hello world')
    }


    // console.log(day)


    // const timer = new Date().getTime()
    // console.log(timer)

    // const time = Date.now()
    // console.log(time)

    // 1600000

    // 1810000)

    useEffect(() => {
        setTimeout(() => {
        setError('')
    }, 3000)
    }, [error])

    useEffect(() => {
        let y = setInterval(() => {
            if (day !== (new Date().getTime() + 30 * 60000)) {
                setDay(Date.now())
                localStorage.setItem('time', day)
            }
        }, 1810000)
        
        return () => clearInterval(y)
    });

    const removeItem = (id) => {
        let newItem = arr.filter((item) => item.id !== id)
        setArr(newItem)
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem('time')
        if (loggedInUser ) {
            const foundTime = JSON.parse(loggedInUser)
            setDay(foundTime)
        }
    }, [])

    return (

        <Container fluid>
            <Row>
                <Col className='express_border'>
                    <main className='express_section'>
                        <section>
                           <div>
                            <p className='express_p'>Please Pick Five(5) numbers</p>
                            <p className='p_red'>Games will will be Drawn in:
                                <Countdown key={Date.now()} className='ml-2' date={day + 1800000}>
                                    <Completionist />
                                </Countdown>
                            </p>
                        </div>
                       {nums.map((i)=> {
                         return <button key={i} name={!activeNums[i] && 'ready'} onClick={() => handleClass(i)} className={`${array.includes(i) && 'lottoExpress' } lotto_btns`}>{i}</button>
                       })}
                        </section>
                        
                        
                        <Button className='mt-2' onClick={handleBets} variant="outline-secondary">Place Bet</Button>
                        <p className='p_red mt-2'>{error && error}</p>
                    </main>
                </Col>
                <Col>
                    <section className='mt-3 submit_section'>
                        <p>Numbers: <span className='green'>{numbers}</span></p>
                        <p>Odd: <span className='green'></span></p>
                        <p>Amount per Line: <span className='green'>&#x20A6;{amount}</span></p>
                        <Form>
                            <Form.Control size='sm' className='form_input' onChange={handleInputChange} type="text" placeholder="&#x20A6;10000" />
                        </Form>
                        <div className='mt-2 d-flex justify-content-lg-between'>
                            <Button className='mr-2 mr-lg-0 games game' value='50' size='sm' onClick={handleClick}>&#x20A6;50</Button>
                            <Button className='mr-2 mr-lg-0 'size='sm' value='100' size='sm' onClick={handleClick}>&#x20A6;100</Button>
                            <Button className='mr-2 mr-lg-0 'size='sm' value='200' size='sm' onClick={handleClick}>&#x20A6;200</Button>
                            <Button className='mr-2 mr-lg-0 'size='sm' value='300' size='sm' onClick={handleClick}>&#x20A6;300</Button>
                            <Button className='mr-2 mr-lg-0 'size='sm' value='400' size='sm' onClick={handleClick}>&#x20A6;400</Button>
                            <Button className='mr-2 mr-lg-0' size='sm' value='500' size='sm' onClick={handleClick}>&#x20A6;500</Button>
                        </div>
                        <Button className={`mt-3 ${!getBet && !logedIn && 'disabled'} `} onClick={handleGameSubmit} variant="outline-success">{`${!logedIn ? 'Login to Place bet' : 'Submit'}`}</Button>
                    </section>

                    {
                        show &&
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
                                             <p>Stake Amount: <span className='p_red'>&#x20A6;{parseInt(value) * 5}</span></p>
                                             <p>Odd:</p>
                                        </div>
                                    )
                                })
                            }

                    </section>
                    }
                    
                </Col>
            </Row>
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
