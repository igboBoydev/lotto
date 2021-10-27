import React, { useState, useEffect } from 'react';
import { Container, Carousel, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ball from '../static/assets/raffle-5870552_640.jpg'
import roles from '../static/assets/balls-6077901_640.jpg'
import img1 from '../static/assets/1.png'
import img2 from '../static/assets/3.png'
import img3 from '../static/assets/softLotto.jpeg'
import img4 from '../static/assets/Original.jpeg'
import img5 from '../static/assets/6.png'
import img6 from '../static/assets/img3.jpg'
import moment from 'moment'
import GrandLotto from '../svg/GrandLotto.svg'

const Home = () => {
  const [timer, setTimer] = useState(null)
  let history = useHistory()
  const [activeNums, setActiveNums] = useState(false)
  let [array, setArray] = useState([])
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)

  const handleClick = (e) => {
    history.push('/games')
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
        }
        
  }
  
  const handleShow = (e) => {
    e.preventDefault()
    setShow(!show)
  }
  const handleShow1 = (e) => {
    e.preventDefault()
    setShow1(!show1)
  }
  const handleShow2 = (e) => {
    e.preventDefault()
    setShow2(!show2)
  }

   let nums = []

    for (let i = 1; i < 91; i++) {
      nums.push(i)
    }

      useEffect(() => {
        const timeInterval = setInterval(() => {
          setTimer(moment().format('LTS'))
        }, 1000)

        return () => clearInterval(timeInterval)
    })


  return (
    <main className='section_container'>
      <section className='d-flex justify-content-around pt-2 types_header'>
        <p className='pt-2'>{timer}</p>
         <Link className='pt-2 home_link' to='/games'>Regular Lotto</Link>
         <Link className='pt-2 home_link' to='/lottoexpress'>Lotto Express</Link>
         <Link className='pt-2 home_link' to='/softlotto'>Soft Lotto</Link>
         <Link className='pt-2 home_link' to='/profile/results'>Draws</Link>
      </section>
        <article className='homeSection'>
        <div className="h1Div">
          <h1 className='home_h1'>Join Thousands of Winners Everyday</h1>
          <h1 className='home'>GrandLotto is the best and rewarding Lotto Gaming Platform in Africa</h1>
          </div>
             
              <div className='d-flex ml-3 ml-lg-5 pb-lg-5'>
                <Link to='/games'>
                  <img 
                    className='img_widths mr-2' 
                    src={img4} 
                    alt=""
                  />
                </Link>
                <Link to='/lottoexpress'>
                  <img
                    className='img_widths'
                    src={img1}
                    alt=""
                  />
                </Link>
                <Link to='/softlotto'>
                  <img
                    className='img_widths ml-4 mr-4'
                    src={img3} 
                    alt=""
                  />
                </Link>
                <Link to='/games'>
                  <img  
                    className='img_widths'
                    src={img2} 
                    alt=""
                  />
                </Link>
                <Link to='/games'>
                  <img 
                    className='img_widths ml-4 mr-4'
                    src={img5} 
                    alt=""
                  />
                </Link>
            </div>
      </article>
      <article className='game_article'>
        <h1>Lotto Express</h1>
        <div className='smalls'>
            {nums.map((i)=> {
              return <button key={i} name={!activeNums[i] && 'ready'} onClick={() => handleClass(i)} className={`${array.includes(i) && 'lottoExpress' } lotto_btns`}>{i}</button>
            })}
            </div>
      </article>
      <hr />
      <section className='second_article'>
        <div className='home_dives'>
          <h1>At GrandLotto, we make sure you catch the fun and also get always smiling from your winning on our platform; With our list of games you are sure of having good and amazing odds.</h1>
          <img className='home_img' src={img6} alt="" />
        </div>
        <div className="lottoExpress_how">
          <h3> How To play Regular Express</h3>
          {!show && <span className='spans' onClick={handleShow}>+</span>}
          {show && <span className='spans' onClick={handleShow}>-</span>}
        </div>
        <div className="lottoExpress_how">
          <h3> How To play Lotto Express</h3>
          {!show1 && <span className='spans' onClick={handleShow1}>+</span>}
          {show1 && <span className='spans' onClick={handleShow1}>-</span>}
        </div>
        <div className="lottoExpress_how">
          <h3> How To play Soft Lotto</h3>
          {!show2 && <span className='spans' onClick={handleShow2}>+</span>}
          {show2 && <span className='spans' onClick={handleShow2}>-</span>}
        </div>
      </section>
           {/* <Carousel d-none d-md-inline>
  <Carousel.Item>
    <img
        width={600}
        height={400}
        className="d-block w-100"
        src={GrandLotto}
        alt="First slide"
    />
    <Carousel.Caption>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
        width={600}
        height={400}
        alt="900x500"
        className="display_width d-block w-100"
        src={ball}
    />

    <Carousel.Caption>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
        width={600}
        height={400}
        alt="900x500"
        className="display_width d-block w-100"
        src={roles}
    />

    <Carousel.Caption>
    </Carousel.Caption>
  </Carousel.Item>
            </Carousel> */}
            


    </main>
    )
};

export default Home

