import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import { useGlobalContext } from '../store/context'
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Data from '../Fetch/Data.json'
import play from '../svg/play.svg'
import moment from 'moment'

const Games = () => {
    const { game, logedIn } = useGlobalContext();
    const [showSlip, setShowSlip] = useState(false)
    const [showGames, setShowGames] = useState(false)
    const [activeNums, setActiveNums] = useState(false)
    let [gameType, setGameType] = useState('NAP 1')
    const [games, setGames] = useState('EMBASSEY')
    const [totalStake, setTotalStake] = useState('')
    const [subValue, setSubValue] = useState(null)
    const [value, setValue] = useState('')
    let [arr, setArr] = useState([])
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    let [betSlip, setBetSlip] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [hideButton, setHideButton] = useState(false)
    const [timer, setTimer] = useState(null)


    const categories = [...new Set(game.map((item) => {
        return [item.name, item.startTime, item.endTime]
    }))]
    
    let nums = []

    for (let i = 1; i < 91; i++) {
        nums.push(i)
    }


    const handleClass = (e, i) => {
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
        if (value === 'AGAINST') {
            setHideButton(false)
        }
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
            console.log(n)
        }
      var lines
      if (gameType == 'PERM 2' || gameType == 'NAP 2') {
        lines = perm2(n)
      } else if (gameType == 'PERM 3') {
        lines = perm3(n)
      } else if (gameType == 'PERM 4') {
        lines = perm4(n)
      } else if (gameType == 'PERM 5') {
        lines = perm5(n)
      } else if (gameType === '1 BANKER'){
        lines = 89
      } else if (gameType === 'AGAINST') {
        const first_against = arr.slice(0, arr.indexOf(0))
          const second_against = arr.slice(arr.indexOf(0) + 1, arr[arr.length - 1])
          lines = first_against.length * second_against.length
       }
      else {
          lines = 1
        }

        let data = {
                id: new Date().getTime().toString(),
                lines: lines,
                type: gameType,
                numbers: arr,
                amount: 0 || subValue
            }
            betSlip.push(data)
            calculateTotalStake();
            setArr([]);
            setShowSlip(true);
    }

    const  calculateTotalStake = ()  => {
      var total =0
      for(var i =0; i< betSlip.length; i++){
        total = total + betSlip[i].amount
      }
        setTotalStake(total)
    }


    const get = localStorage.getItem('token')

    const handleGameBet = (lines, data, numbers) => {

        let value = data.amount
        if (value < 50) {
            setError('Please Add an amount above #50')
            return;

        } else {

        var myHeaders = new Headers();
        myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
        myHeaders.append("Authorization", `Bearer ${get}`);
            myHeaders.append("Content-Type", "application/json");
            
            let n;
            
            if (gameType === 'AGAINST') {
                const first_against = numbers.slice(0, numbers.indexOf(0))
                const second_against = numbers.slice(numbers.indexOf(0) + 1, numbers[numbers.length - 1])
                if (first_against.length >= 2 && second_against.length >= 1 || first_against.length >= 1 || second_against.length >= 2) {
                    setError('please select atleast 2 games for first choice and 1 agme for second choice or vice-versa')
                    return
                } else if (first_against.includes(n) && second_against.includes(n)) {
                    setError('you cannot choose a number one both sides of the game')
                    return;
                } else {
                    var raw = JSON.stringify({
                        "type": `${gameType}`,
                        "totalStake": `${numbers.length}`,
                        "stakes": [
                            {
                                "amount": `${value}`,
                                "type": `${gameType}`,
                                "stakeList": `${first_against}`,
                                "stakeList2": `${second_against}`
                            }
                        ]
                    });
                }
            } else {
                var raw = JSON.stringify({
                    "type": `${gameType}`,
                    "totalStake": `${numbers.length}`,
                    "stakes": [
                        {
                            "amount": `${value}`,
                            "type": `${gameType}`,
                            "stakeList": `${numbers}`
                        }
                    ]
                });
            }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5016/api/v1/placeStake", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                let show = result.result.map((res) => res)
                if (show[0].type === 'AGAINST') {
                    const { type, amount, odd, staked, date, max_possibleWinning, min_possibleWinning, possibleWinning, stakes1, stakes2 } = show[0];
                    let response1 = stakes1.toString()
                    let response2 = stakes2.toString()
                    var myHeaders = new Headers();
                    myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
                    myHeaders.append("Authorization", `Bearer ${get}`);
                    myHeaders.append("Content-Type", "application/json");

                    var raw = JSON.stringify({
                        "amount": `${amount}`,
                        "type": `${type}`,
                        "odd": `${odd}`,
                        "max_possibleWinning": `${max_possibleWinning}`,
                        "min_possibleWinning": `${min_possibleWinning}`,
                        "possibleWinning": `${possibleWinning}`,
                        "staked": `${staked}`,
                        "stakes1": `${response1}`,
                        "stakes2": `${response2}`,
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

                    
                } else {
                    const { type, amount, odd, staked, date, max_possibleWinning, min_possibleWinning, possibleWinning, stakes } = show[0];
                    let response = stakes.toString()
                    var myHeaders = new Headers();
                    myHeaders.append("signatures", "lWMVR8oHqcoW4RFuV3GZAD6Wv1X7EQs8y8ntHBsgkug=");
                    myHeaders.append("Authorization", `Bearer ${get}`);
                    myHeaders.append("Content-Type", "application/json");

                    var raw = JSON.stringify({
                        "amount": `${amount}`,
                        "type": `${type}`,
                        "odd": `${odd}`,
                        "max_possibleWinning": `${max_possibleWinning}`,
                        "min_possibleWinning": `${min_possibleWinning}`,
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
                }
            },
                (error) => {
                    console.log(error)
                }
            )
  
        }
    }

    const handleAgainst = (e) => {
        e.preventDefault()
        arr.push(0)
        setActiveNums(false)
        setHideButton(true)
    }

    const handleBets = (e) => {
        e.preventDefault()
        if (gameType === 'NAP 1') {
            if (arr.length < 1) {
                return;
            } else if (arr.length > 1 && arr.length < 3) {
                gameType = 'NAP 2'
                setGameType(gameType)
                setError('Your game type has been automatically changed to NAP 2 because the numbers picked are greater than 1; kindly choose a single number only for NAP 1 and proceed or continue with the NAP 2 game type')
                createSlip()
                setShowGames(true)
            } else if (arr.length > 2) {
                gameType = 'PERM 2'
                setError('Your game type has been automatically changed to PERM 2 because the numbers picked are greater than 2; kindly choose 2 numbers only for NAP 2 and proceed or continue with the PERM 2 game type')
                createSlip()
                setShowGames(true)
            } else if (arr.length > 15) {
                setError('Please Select atmost 15 numbers')
                return;
            }
            else {
                createSlip()
                setShowGames(true)
            }
        }
        else if (gameType === 'NAP 2') {
            if (arr.length < 2) {
                setError('Please select atleast 2 numbers')
                return;
            }else if (arr.length > 2) {
                gameType = 'PERM 2'
                setGameType(gameType)
                setError('Your game type has been automatically changed to PERM 2 because the numbers picked are greater than 2; kindly choose 2 numbers only for NAP 2 and proceed or continue with the PERM 2 game type')
                createSlip()
                 setShowGames(true)
            } else if (arr.length > 15) {
                setError('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
                 setShowGames(true)
            }
        } else if (gameType === 'NAP 3') {
            if(arr.length < 3){
                setError('Please select atleast 3 numbers')
                return;
            }else if (arr.length > 3) {
                 gameType = 'PERM 2'
                setGameType(gameType)
                setError('Your game type has been automatically changed to PERM 2 because the numbers picked are greater than 3; kindly choose 3 numbers only for NAP 2 and proceed or continue with the PERM 2 game type')
                createSlip()
                 setShowGames(true)
            } else if (arr.length > 15) {
                setError('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
                 setShowGames(true)
            }
        } else if (gameType === 'NAP 4') {
            if (arr.length < 4) {
                setError('Please select atleast 4 numbers')
                return;
            }else if (arr.length > 4) {
                 gameType = 'PERM 2'
                setGameType(gameType)
                setError('Your game type has been automatically changed to PERM 2 because the numbers picked are greater than 4; kindly choose 4 numbers only for NAP 2 and proceed or continue with the PERM 2 game type')
                createSlip()
                setShowGames(true)
            } else if (arr.length > 15) {
                setError('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
                 setShowGames(true)
            }
        } else if (gameType === 'NAP 5') {
            if (arr.length < 5) {
                 setError('Please select atleast 5 numbers')
                return;
            }else if (arr.length > 5) {
                gameType = 'PERM 2'
                setGameType(gameType)
                setError('Your game type has been automatically changed to PERM 2 because the numbers picked are greater than 5; kindly choose 5 numbers only for NAP 2 and proceed or continue with the PERM 2 game type')
                createSlip()
                 setShowGames(true)
            } else if (arr.length > 15) {
                setError('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
                setShowGames(true)
            }
        }else if(gameType === 'PERM 2'){
            if (arr.length < 3) {
                setError('Please Select atleast 3 numbers')
                return
            } else if (arr.length > 15) {
                setError('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
                setShowGames(true)
             }
        } else if (gameType === 'PERM 3') {
            if (arr.length < 4) {
                setError('Please Select atleast 4 numbers')
                return;
            } else if (arr.length > 15) {
                setError('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
                setShowGames(true)
            }
        } else if (gameType === 'PERM 4') {
            if (arr.length < 5) {
                setError('Please Select atleast 5 numbers')
                return;
            } else if (arr.length > 15) {
                setError('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
                setShowGames(true)
            }
        } else if (gameType === 'PERM 5') {
            if (arr.length < 6) {
                setError('Please Select atleast 6 numbers')
                return;
            } else if (arr.length > 15) {
                setError('Please Select atmost 15 numbers')
                return;
            } else {
                createSlip()
                setShowGames(true)
            }
        }else if (gameType === '1 BANKER') {
            if (!arr.length) {
                setError('Please Select a single number')
                return
            }
             let y = arr[arr.length - 1]
             arr = y
            setShowGames(true)
            createSlip()
        } else if (gameType === 'AGAINST') {
            let max = 10
            let min = 1
            const first_against = arr.slice(0, arr.indexOf(0))
            const second_against = arr.slice(arr.indexOf(0) + 1, arr[arr.length - 1])
            if ((first_against.length === 0 || second_against.length === 0)) {
                setError('please choose numbers')
                return;
            } else if (first_against.length === min && second_against.length === min) {
                setError('please choose atleast one 1 number for either side of the games and more than one number for the other side')
                return;
            } else if (first_against.length > max || second_against.length > max) {
                setError('please choose atmost 10 numbers for either of the against games')
                return;
            }else {
                createSlip()
                setShowGames(true)
            }
        } else {
            createSlip()
            setShowGames(true)
        }
    }


    useEffect(() => {
        setTimeout(() => {
            setShowAlert(!showAlert)
        }, 3000)
    }, [success, error]);

    const removeItem = (id) => {
        let newItem = betSlip.filter((item) => item.id !== id)
        setBetSlip(newItem)
        calculateTotalStake()
    }

    useEffect(() => {
        const timeInterval = setInterval(() => {
          setTimer(moment().format('LTS'))
        }, 1000)

        return () => clearInterval(timeInterval)
    })


    return (
        <section>
            <div className='news pl-5 pb-2 pt-2 p_white'>
                {timer}
             </div>
            <Container fluid>
                 <Row>
            <Col className='pl-4 days_column scrollbar d-none color d-lg-inline' lg={2}>
                <h6 className='draw'>Play Game</h6>
                <section className='days scrollContent'>
                         
                    {categories.map((category) => {
                        return <p onClick={handleCategory} className='category_p'>{category[0]}
                        </p>
                    })}
                           
            
                </section>
            </Col>
                    <Col className='game_col' lg={7} >
                        <Row>
                            <Col>
                                <section className='game_section'>
                                    <div className='d-md-flex mb-4'>
                                    <Link className='game_links first' to='/lottoexpress'>Lotto Express</Link>
                                    <Link className='game_links ml-3' to='/softlotto'>Soft Lotto</Link>
                                    </div>
                                    
                                    <div className='d-flex justify-content-between'>
                                        <h4 className='game_header'>
                                            {games}
                                        </h4> 
                                        {gameType === 'AGAINST' && <Button variant='danger' onClick={handleAgainst} className={`small_class ${arr.length > 0 ? '' : 'disabled' }`}>Against</Button>}
                                    </div>
                                    
                                    <Form className='mb-3 form_width' onChange={handleChange}>
                                        <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label>NAP 1</Form.Label>
                                            <Form.Control as="select" custom>
                                            <option value='NAP 1'>NAP 1</option>
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
                                    <div className='small'>
                                         {nums.map((i)=> {
                                        return <button key={i} name={!activeNums[i] && 'ready'} onClick={(e) => handleClass(e, i)} className={`${arr.includes(i) && 'game_clicked' } game_btn `}>{i}</button>
                                    })}
                                    </div>
                                   
                                </section>
                            </Col>
                            <Col>
                                <section>
                                    <h6 className='game_type_desc'>
                                        {
                                            gameType === 'NAP 1' ? 'Pick 1 Numbers And If They Are Drawn You Win 40 X Your Ticket Cost.' :
                                            gameType === 'NAP 2' ? 'Pick 2 Numbers And If They Are Drawn You Win 240 X Your Ticket Cost.' :
                                            gameType === 'PERM 2' ||
                                            gameType === 'PERM 3' ||
                                            gameType === 'PERM 4' ||
                                            gameType === 'PERM 5' ? 'Perm Games Are Exciting But More Complex So Please Read Our Guide On This.' :
                                            gameType === 'NAP 3' ? 'Pick 3 Numbers And If They Are Drawn You Win 2,100 X Your Ticket Cost.' :
                                            gameType === 'NAP 4' ? 'Pick 4 Numbers And If They Are Drawn You Win 6,000 X Your Ticket Cost.' :
                                            gameType === 'NAP 5' ? 'Pick 5 Numbers And If They Are Drawn You Win 44,000 X Your Ticket Cost.': 
                                            gameType === '1 BANKER' ? 'Pick A Number And If Its Drawn You Win 960 X Your Single Stake Amount, If you choose more than one number only the last number would be played' : 
                                            gameType === 'AGAINST' ? 'Permutations Of Numbers Against Each Other.(Num Winnings Lines) X (Stake Amount Per Line) X 240 = Winnings': null
                                        }
                                    </h6>
                                    {
                                        hideButton && gameType === "AGAINST" &&
                                            <Button className='mt-5' onClick={handleBets} variant="outline-secondary">Place Bet</Button>
                                        
                                        }
                                    {gameType !== 'AGAINST' && 
                                      <Button className='mt-lg-5 btn_class' onClick={handleBets} variant="outline-secondary">Place Bet</Button>
                                    }
                                    {success && <section className='small_message'>
                                        {showAlert && <span className='error_message'>{success}</span>}
                                    </section>}
                                    {error && <section className='small_message'>
                                        {showAlert && <span className='error_message'>{error}</span>}
                                    </section>
                                    }

                                </section>
                            </Col>
                        </Row>
                    </Col>
                    {!showGames && 
                        <Col lg={3}>
                        <section className='mt-2 ml-2 ml-lg-0 mb-2 mb-lg-0 pt-5 register_game_section'>
                            <h6>Not part of the family yet ? Register and join the feeling of being a part of GrandLOtto</h6>
                            <Button className='ml-2 mb-2' variant='success'>{!logedIn ? 'Register' : 'Play Now'}</Button>
                        </section>
                        <section className='mt-2 ml-2 ml-lg-0 mb-2 mb-lg-0 pt-5 d-none d-lg-inline'>
                            <img src={play} alt="" className='game_section_svg' />
                        </section>
                        </Col>
                    }
                {showGames && 
                   
                        <Col className={`${betSlip.length > 0 ? 'd_none scroll_game' : 'd'} `} lg={3}>
                <section className='scroller bet_section mt-2'>
                    <div className='d-flex justify-content-between game_back'>
                        <h6 className='game_h6'>
                            {games.slice(0, 11)}
                        </h6>
                            <button className="game_slip_btn" onClick={() => setBetSlip([])}>Clear Slip</button>
                            </div>
                            <div>
                                {betSlip.map((data) => {
                                    let { id, lines, type, numbers, amount } = data;
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
                                            <p className='p_type'>Lines: {lines}</p>
                                            <p className='p_type'>Type: {type}</p>
                                                <p className='p_type'>Numbers: {numbers.toString()}</p>
                                                <p className='p_type'>Enter Stake Amount: {amount}</p>
                                                <Form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    handleInputSubmit(data)
                                                }
                                                }>
                                                <Form.Control size='sm' className='form_input' value={value} onChange={handleInputChange} type="text" placeholder="&#x20A6;10000" />
                                            </Form>
                                            <div className='mt-2 d-flex justify-content-lg-between'>
                                                <Button className='mr-2 mr-lg-0 games game' value='50' size='sm' onClick={() => {
                                                        data.amount = 50;
                                                        calculateTotalStake()
                                                }}>50</Button>
                                                <Button className='mr-2 mr-lg-0 'size='sm' value='100' size='sm' onClick={() => {
                                                        data.amount = 100;
                                                        calculateTotalStake()
                                                }}>100</Button>
                                                <Button className='mr-2 mr-lg-0 'size='sm' value='200' size='sm' onClick={() => {
                                                        data.amount = 200;
                                                        calculateTotalStake()
                                                }}>200</Button>
                                                <Button className='mr-2 mr-lg-0 'size='sm' value='300' size='sm' onClick={() => {
                                                        data.amount = 300;
                                                        calculateTotalStake()
                                                }}>300</Button>
                                                <Button className='mr-2 mr-lg-0 'size='sm' value='400' size='sm' onClick={() => {
                                                        data.amount = 400;
                                                        calculateTotalStake()
                                                }}>400</Button>
                                                <Button className='mr-2 mr-lg-0' size='sm' value='500' size='sm' onClick={() => {
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
                                            
                                                <Button size='sm' className={`align-item-center mb-2 game ${!logedIn && 'disabled'}`} variant='success' onClick={() => handleGameBet(lines, data, numbers)}>{ logedIn ? 'Place Bet' : 'Login To Place Bet'}</Button>
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
