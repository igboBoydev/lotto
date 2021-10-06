import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import noBet from '../svg/notBet.svg'

const Bets = () => {
    const [arr, setArr] = useState([])
    const url = "http://localhost:5016/api/v2/auth/betting-list"
    let history = useHistory()
    
    useEffect(() => {

        let isCancelled = false
        const get = localStorage.getItem('token')

        const fetchData = async () => {
            var myHeaders = new Headers();
            myHeaders.append("signatures", "a0451a967f04a3ac7dc526086749599249a53b3d9e81b71afeb4f3efab8214d5");
            myHeaders.append("Authorization", `Bearer ${get}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    const data = result.success.result.user.filter((bets) => {
                            return [ bets.id, bets.bet_id, bets.amount, bets.odd, bets.min_possibleWinning, bets.max_possibleWinning, bets.possibleWinning, bets.staked, bets.stakes, bets.stakes1, bets.stakes2, ]       
                    })
                     setArr(data)
                })
                .catch(error => console.log('error', error));
        }

        fetchData()

        return () => {
            isCancelled = true
        }
   
    }, [url])

    const handleClick = (e) => {
        e.preventDefault()
        history.push('/games')
    }

    return (
        <div>
            {arr.length ?
            
            <section className='bets_history_section d-flex flex-wrap'>
                {arr.map((a) => {
                    return (
                          <BetHistory key={a.id} {...a} />
                    )
                })}
                </section>
                :
                <section className='bet_header_section d-flex justify-content-center align-items-center flex-column'>
                    <img className='svg_img' src={noBet} alt="" />
                    <h1 className='bet_header'>Please Place a bet and try again... </h1>
                     <Button size='sm' onClick={handleClick} className='ml-5 mt-2 mb-2' variant='primary'>Play Game</Button>
                </section>
            }
        </div>
    )
}

const BetHistory = ({ amount, bet_id, type, odd, min_possibleWinning, max_possibleWinning, possibleWinning, staked, stakes, stakes1, stakes2 }) => {
    
    return (
        <main className='mt-2 ml-4 ml-lg-5'>
            <section className='betHistory_section ml-lg-4'>
            <p className='p_bets'>Game Type: <span className='bets_span'>{type}</span></p>
            <p className='p_bets'>Game ID: <span className='bets_span'>{bet_id}</span></p>
            <p className='p_bets'>Odd: <span className='bets_span'>{odd}</span></p>
            {possibleWinning > 0 && <p className='p_bets'>Possible Winning: <span className='bets_span'>&#x20A6;{possibleWinning}</span></p>}
            <p className='p_bets'>Stake Amount: <span className='bets_span'>&#x20A6;{staked}</span></p>
            {stakes && <p className='p_bets'>Numbers: <span className='bets_span'>{stakes}</span></p>}
            {stakes1 && <p className='p_bets'>Against 1: <span className='bets_span'>{stakes1}</span></p>}
            {stakes2 && <p className='p_bets'>Agaisnt 2: <span className='bets_span'>{stakes2}</span></p>}
                <p className='p_bets'>Amount: <span className='bets_span'>&#x20A6;{amount}</span></p>
                {max_possibleWinning > 0 && <p className='p_bets'>max_possibleWinning: <span className='bets_span'>&#x20A6;{max_possibleWinning}</span></p>}
                {min_possibleWinning > 0 && <p className='p_bets'>min_possibleWinning: <span className='bets_span'>&#x20A6;{min_possibleWinning}</span></p>}
            </section>
        </main>
        
   )
}

export default Bets
