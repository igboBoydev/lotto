import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useGlobalContext } from './store/context';

const LottoApi = () => {
    const { game } = useGlobalContext();
    let games = game.slice(0, 5)
    

    return (
    
        <div className='games-container mt-3 d-flex justify-content-between'>
            {games.map((lotto) => {
                const { name, startTime, id} = lotto;
                return (
                    <Container className='mb-3' key={id}>
                       <section className='games-card p-3 text-center'>
                       <h3  className='name'>{name}</h3>
                         <p>{startTime}</p>
                        <Link className='lottoApi_Link' to='/games'>Play Game</Link>
                    </section>
                    </Container>
                    
                )
            })}
        </div>
    )
}

export default LottoApi

