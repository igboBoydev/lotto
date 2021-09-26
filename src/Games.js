import React, { useState } from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import { useGlobalContext } from './store/context'
import { FaTimes } from 'react-icons/fa';

const Games = () => {
    const { game, logedIn } = useGlobalContext();
    const [showSlip, setShowSlip] = useState(false)
    const [showGames, setShowGames] = useState(false)
    const [activeNums, setActiveNums] = useState(false)
    const [gameType, setGameType] = useState('NAP 2')
    const [games, setGames] = useState('EMBASSEY')
    const [totalStake, setTotalStake] = useState('')
    const [subValue, setSubValue] = useState(null)
    const [value, setValue] = useState('')
    const [getAmount, setGetAmount] = useState('')
    let [arr, setArr] = useState([])
    let [betSlip, setBetSlip] = useState([])


    const categories = [...new Set(game.map((item) => {
        return [item.name, item.startTime, item.endTime]
    }))]

    
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

        if (arr.includes(i)) {
            const index = arr.indexOf(i)
            if (index > -1) {
                arr.splice(index, 1)
            }
        } else {
            arr.push(i)
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        let value = e.target.value;
        setGameType(value)
    }
  

    const handleCategory = (e) => {
        e.preventDefault()
       setGames(e.target.textContent)
    }

    const factorial = (num)  => {
      if (num === 0 || num === 1) return 1
      for (var i = num - 1; i >= 1; i--) {
        num *= i
      }
      return num
    }

    const perm2 = (n)  => {
      return (n * n - n) / 2
    }

    const perm3 = (n)  => {
      return factorial(n) / factorial(n - 3) / 6
    }

    const perm4 = (n)  => {
      return factorial(n) / factorial(n - 4) / 24
    }

    const perm5 = (n)  => {
      return factorial(n) / factorial(n - 5) / 120
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        setValue(e.target.value)
    }

    const handleInputSubmit = (data) => {
        setSubValue(value)
        data.amount = value
    }


    const createSlip = () => {
        if (arr.length > 0) {
            var n = arr.length
        }
      var lines
      if (gameType == 'PERM 2') {
        lines = perm2(n)
      } else if (gameType == 'PERM 3') {
        lines = perm3(n)
      } else if (gameType == 'PERM 4') {
        lines = perm4(n)
      } else if (gameType == 'PERM 5') {
        lines = perm5(n)
      } else {
        lines = 1
        }
        
      let data = {
        lines: lines,
        type: gameType,
        numbers: arr,
        amount: 0 || subValue
      }
      betSlip.push(data)
      calculateTotalStake()
      setArr([])
     setShowSlip(true)
    }

    const  calculateTotalStake = ()  => {
      var total =0
      for(var i =0; i< betSlip.length; i++){
        total = total + betSlip[i].amount
      }
        setTotalStake(total)
    }

    const handleGameBet = (e) => {
        e.preventDefault()
    }

    const handleBets = (e) => {
        e.preventDefault()
        createSlip()
        setShowGames(true)
    }

 

    return (
        <section>
            <div className='news'>
                hello
             </div>
            <Container fluid>
                 <Row>
            <Col className='pl-4 days_column scrollbar d-none color d-lg-inline' lg={2}>
                <h6 className='draw'>Play Game</h6>
                <section className='days scrollContent'>
                         
                    {categories.map((category) => {
                        return <p onClick={handleCategory} className='category_p'>{category[0]} <br />
                            {category[1]}</p>
                    })}
                </section>
            </Col>
                    <Col className='game_col' lg={7} >
                        <Row>
                            <Col>
                                <section className='game_section'>
                                    <h4 className='game_header'>
                                        {games}
                                    </h4> 
                                    <Form className='mb-3 form_width' onChange={handleChange}>
                                        <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label>NAP 2</Form.Label>
                                        <Form.Control as="select" custom>
                                            <option value='NAP 2'>NAP 2</option>
                                            <option value='NAP 3'>NAP 3</option>
                                            <option value='NAP 4'>NAP 4</option>
                                            <option value='NAP 5'>NAP 5</option>
                                            <option value='PERM 2'>PERM 2</option>
                                            <option value='PERM 3'>PERM 3</option>
                                            <option value='PERM 4'>PERM 4</option>
                                            <option value='PERM 5'>PERM 5</option>
                                            <option value='1 BANKER'>1 BANKER</option>
                                            <option value='AGAINST'>AGAINST</option>
                                        </Form.Control>
                                        </Form.Group>
                                    </Form>
                                    {nums.map((i, index)=> {
                                        return <button key={index} name={!activeNums[i] && 'ready'} onClick={() => handleClass(i)} className={`${arr.includes(i) ? 'game_clicked' : ''} game_btn `}>{i}</button>
                                    })}

                                </section>
                            </Col>
                            <Col>
                                <section>
                                    <h6 className='game_type_desc'>
                                        {
                                            gameType === 'NAP 2' ? 'Pick 2 Numbers And If They Are Drawn You Win 240 X Your Ticket Cost.' :
                                            gameType === 'PERM 2' ||
                                            gameType === 'PERM 3' ||
                                            gameType === 'PERM 4' ||
                                            gameType === 'PERM 5' ? 'Perm Games Are Exciting But More Complex So Please Read Our Guide On This.' :
                                            gameType === 'NAP 3' ? 'Pick 3 Numbers And If They Are Drawn You Win 2,100 X Your Ticket Cost.' :
                                            gameType === 'NAP 4' ? 'Pick 4 Numbers And If They Are Drawn You Win 6,000 X Your Ticket Cost.' :
                                            gameType === 'NAP 5' ? 'Pick 5 Numbers And If They Are Drawn You Win 44,000 X Your Ticket Cost.': 
                                            gameType === '1 BANKER' ? 'Pick A Number And If Its Drawn You Win 960 X Your Single Stake Amount.' : 
                                            gameType === 'AGAINT' ? 'Permutations Of Numbers Against Each Other.(Num Winnings Lines) X (Stake Amount Per Line) X 240 = Winnings': null
                                        }
                                    </h6>
                                    
                                     <Button className='mt-5' onClick={handleBets} variant="outline-secondary">Place Bet</Button>{' '}

                                </section>
                            </Col>
                        </Row>
                

                        
                    </Col>
                    {!showGames && 
                        <Col lg={3}>
                        <section className='mt-lg-5 pt-lg-5 register_game_section'>
                            <h6>Not part of the family yet ? Register and join the feeling of being a part of GrandLOtto</h6>
                            <Button className='ml-2 mb-2' variant='success'>Register</Button>
                        </section>
                        </Col>
                    }
                {showGames && 
                   
                        <Col className='d_none scroll_game' lg={3}>
                <section className='scroller bet_section mt-2'>
                    <div className='d-flex justify-content-between game_back'>
                        <h6 className='game_h6'>
                            {games}
                        </h6>
                            <button className="game_slip_btn" onClick={() => setBetSlip([])}>Clear Slip</button>
                            </div>
                            <div>
                                {betSlip.map((data, index) => {
                                    let { lines, type, numbers } = data;
                                    return (
                                        <main className='get_line'>
                                            <div className='d-flex justify-content-end'>
                                                <FaTimes onClick={() => {
                                                    betSlip.splice(index, 1)
                                                }}
                                                    className='cancel_game'
                                                />
                                            </div>
                                            <div>
                                            <p className='p_type'>Lines: {lines}</p>
                                            <p className='p_type'>Type: {type}</p>
                                                <p className='p_type'>Numbers: {numbers.toString()}</p>
                                                <p className='p_type'>Enter Stake Amount: {data.amount}</p>
                                                <Form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    handleInputSubmit(data)
                                                }
                                                }>
                                                <Form.Control className='form_input' value={value} onChange={handleInputChange} type="text" placeholder="&#x20A6;10000" />
                                            </Form>
                                            <div className='mt-2 d-flex justify-content-lg-between'>
                                                <Button className='mr-2 mr-lg-0' value='50' size='sm' onClick={() => {
                                                        data.amount = 50;
                                                        calculateTotalStake()
                                                }}>50</Button>
                                                <Button className='mr-2 mr-lg-0' value='100' size='sm' onClick={() => {
                                                        data.amount = 100;
                                                        calculateTotalStake()
                                                }}>100</Button>
                                                <Button className='mr-2 mr-lg-0' value='200' size='sm' onClick={() => {
                                                        data.amount = 200;
                                                        calculateTotalStake()
                                                }}>200</Button>
                                                <Button className='mr-2 mr-lg-0' value='300' size='sm' onClick={() => {
                                                        data.amount = 300;
                                                        calculateTotalStake()
                                                }}>300</Button>
                                                <Button className='mr-2 mr-lg-0' value='400' size='sm' onClick={() => {
                                                        data.amount = 400;
                                                        calculateTotalStake()
                                                }}>400</Button>
                                                <Button className='mr-2 mr-lg-0' value='500' size='sm' onClick={() => {
                                                        data.amount = 500;
                                                        calculateTotalStake()
                                                }}>500</Button>
                                            </div>
                                            </div>
                                            <section className='mt-2'>
                                                <div className='d-flex justify-content-between'>
                                                   <p className='p_type'>Number of Bets: </p>
                                                   <p className='p_type'>{betSlip.length}</p>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                   <p className='p_type'>Total Stake: </p>
                                                   <p className='p_type'>&#x20A6;{ lines * data.amount}</p>
                                                </div>
                                                </section>
                                            
                                             
                                        <div className='d-flex justify-content-center'>
                                            
                                            <Button className='align-item-center mt-2 mb-2' variant='secondary' onClick={handleGameBet}>{ logedIn ? 'Place Bet' : 'Login To Place Bet'}</Button>
                                        </div>
                                        </main>
                                        
                                    )
                                })}
                            </div>
                </section>
            </Col>
                }
        </Row>
           </Container>
       </section>
    )
}

export default Games
