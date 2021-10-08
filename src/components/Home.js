import React from 'react'
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
import GrandLotto from '../svg/GrandLotto.svg'

const Home = () => {
  let history = useHistory()

  const handleClick = (e) => [
     history.push('/games')
  ]


  return (
    <main>
        <section className='section_container'>
        <Container className='mt-3'>
           <Carousel d-none d-md-inline>
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
            </Carousel>
            
        </Container>

        <Container fluid>
              <section className='d-flex mt-5 ml-3 ml-lg-5'>
                <Link to='/games'>
                  <img 
                    className='img_width mr-2' 
                    src={img4} 
                    alt=""
                  />
                </Link>
                <Link to='/lottoexpress'>
                  <img
                    className='img_width'
                    src={img1}
                    alt=""
                  />
                </Link>
                <Link to='/softlotto'>
                  <img
                    className='img_width ml-4 mr-4'
                    src={img3} 
                    alt=""
                  />
                </Link>
                <Link to='/games'>
                  <img  
                    className='img_width'
                    src={img2} 
                    alt=""
                  />
                </Link>
                <Link to='/games'>
                  <img 
                    className='img_width ml-4 mr-4'
                    src={img5} 
                    alt=""
                  />
                </Link>
            </section>
         </Container>
    </section>
    </main>
    )
};

export default Home

