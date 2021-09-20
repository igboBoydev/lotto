import React from 'react'
import { useGlobalContext } from '../store/context'
import { Container, Carousel, Row, Col } from 'react-bootstrap';
import logo from '../static/assets/logo4.png'
import ball from '../static/assets/raffle-5870552_640.jpg'
import roles from '../static/assets/balls-6077901_640.jpg'
import img1 from '../static/assets/1.png'
import img2 from '../static/assets/3.png'
import img3 from '../static/assets/4.png'
import img4 from '../static/assets/5.png'
import img5 from '../static/assets/6.png'
import LottoApi from '../lottoApi';
import FetchLogin from '../Fetch/fetchLogin';
import FetchRegister from '../Fetch/FetchRegister';

const Home = () => {
    const { grantAccess, newUsers } = useGlobalContext()
    // if (grantAccess.length !== 0) {
    //     const {userLogin} = grantAccess
    // }

    // if (newUsers.user) {
    //     console.log('Added A user')
    //     console.log(newUsers)
    // }

    return (
        <section className='section_container'>
        <Container className='mt-3'>
           <Carousel d-none d-md-inline>
  <Carousel.Item>
    <img
        width={600}
        height={400}
        className="d-block w-100"
        src={logo}
        alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
            </Carousel>
            
        </Container>

        <Container className='games_types'>
                <Row>
                    <Col xl={{offset: 1, width: 200}}>
                       <section className='d-flex mt-5'>
                <img
                className='img_width'
                    src={img1}
                    alt="" />
                <img
                    className='img_width ml-4 mr-4'
                    src={img3} 
                    alt="" />
                <img 
                className='img_width' 
                    src={img4} 
                    alt="" />
                <img 
                className='img_width ml-4 mr-4 d-none d-lg-inline'
                    src={img5} 
                    alt="" />
                 <img  
                 className='img_width d-none d-md-inline'
                    src={img2} 
                    alt="" />
            </section>
                    </Col>
                    <Col  className='d-none d-xl-flex'>
                    <LottoApi />
                    </Col>
                </Row>
            </Container>
            <FetchLogin />
            
        </section>
    )
}

export default Home










//  <Container fluid>    
//             <Row>
//                 <Col md={2}>
//                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt eos optio libero vero est modi, quaerat possimus rem eaque minima! Odit est accusamus temporibus voluptates amet quasi earum aspernatur explicabo!
//                 </Col>
//                 <Col xs={12} md={8}>
//                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste voluptate quisquam beatae culpa obcaecati sunt a, aspernatur architecto, ea non quod nulla nam modi dolor dicta! Aliquam esse accusamus incidunt.
//                 </Col>
//                 <Col md={2}>
//                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quos sequi nam eius maxime aperiam, quo suscipit, corporis consectetur pariatur facilis rerum dolore porro culpa esse, deleniti totam perferendis fugiat.
//                 </Col>
//             </Row>
           
//         </Container>