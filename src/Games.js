import React, { useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { useGlobalContext } from './store/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretRight, faArrowsAltV } from '@fortawesome/free-solid-svg-icons'

const Games = () => {
    const { loading, game, week, days } = useGlobalContext();
    const [isClicked, setIsClicked] = useState(false);
    const obj = [
        {
            id: 1,
            date:  days[0]
        },
        {
            id: 2,
            date: days[1]
        },
        {
            id: 3,
            date: days[2]
        },
        {
            id: 4,
            date: days[3]
        },
        {
            id: 5,
            date: days[4]
        },
        {
            id: 6,
            date: days[5]
        }
    ]

    if (loading) {
        return (
            <div className="loading">
                <h1>Loading...</h1>
            </div>
        )
    }
    const handleClick = (e) => {
        e.preventDefault()
        console.log(e.target)
        setIsClicked(!isClicked)
    }
    return (
        <section>
             <div>hello world</div>
            <Container fluid>
                 <Row>
            <Col className='days_column d-none d-sm-inline' sm={4} lg={2}>
                <h6 className='draw'>Choose A Draw</h6>
                        <section className='days pl-md-2'>
                            {game.map((getGame) => {
                                const {day, name} = getGame
                                console.log(day)
                            })}
                    {obj.map((day) => {
                        const { id, date } = day
                        console.log(date)
                        return (
                            <h6 onClick={handleClick} key={id} className='d-flex justify-content-between'>
                                {date}
                                {!isClicked ? <FontAwesomeIcon icon={faCaretRight} /> : <FontAwesomeIcon icon={faCaretDown} />}
                                
                            </h6>
                        )
                    })}
               </section>
                
            </Col>
            <Col sm={8} >
                   
            </Col>
            <Col className='d_none' lg={2}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, in. Impedit repellat nisi ullam eius, doloribus dolores aperiam consequuntur saepe laborum culpa voluptates sequi, porro enim nemo beatae assumenda vitae?
            </Col>
        </Row>
           </Container>
       </section>
    )
}

export default Games
