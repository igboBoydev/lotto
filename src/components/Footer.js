import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple, faGooglePlay, faFacebook, faYoutube, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import FetchRegister from '../Fetch/FetchRegister'
import FetchVerify from '../Fetch/fetchVerify'
import GetVoice from '../Fetch/GetVoice'
import GetWhatsapp from '../Fetch/GetWhatsapp'
import { useGlobalContext } from '../store/context'


const Footer = () => {
    const { voice, whatsapp } = useGlobalContext();
    // console.log(voice.voices)
    return (
        <footer className='footer py-5'>
            <section>
                <Container>
                    <section>
            </section>
                    <Row class="d-flex justify-content-center set_footer_display">
                        <Col className='text-center' md='7'>

                            <section className='d-flex justify-content-center'>
                                <div class="p-1 px-2 apple_btn d-flex align-items-center">
                                    <Link to='https://www.applestore.com'>
                                        <FontAwesomeIcon className='color1' size='3x' icon={faApple} />
                                    </Link>  
                                        <div class="pl-2">
                                            <small>Download on the </small>
                                            <h5>App Store</h5>
                                       </div>   
                            </div>
                                <div class="p-1 px-2 apple_btn d-flex align-items-center">
                                    <Link to='https://www.googleplay.com'>
                                        <FontAwesomeIcon className='color2' size='3x' icon={faGooglePlay} />
                                    </Link>
                                <div class="pl-2">
                                    <small>Download on the </small>
                                    <h5>Google Store</h5>
                                </div>     
                                </div>
                            </section>
                            <section>
                                <Col>
                                    <div class="mt-5 mb-5 d-flex justify-content-center">
                                        <Link to='https://www.facebook.com'>
                                           <FontAwesomeIcon className=' backg color3' size='2x' icon={faFacebook} />
                                        </Link>
                                        <Link to='https://www.twitter.com'>
                                           <FontAwesomeIcon className='ml-5 mr-5 backg color4' size='2x' icon={faTwitter} />
                                        </Link>
                                        <Link to='https://www.instagram.com'>
                                           <FontAwesomeIcon className='mr-5 backg color5' size='2x' icon={faInstagram} />
                                        </Link>
                                        <Link to='https://www.youtube.com'>
                                           <FontAwesomeIcon className=' backg color6'  size='2x' icon={faYoutube} />
                                        </Link>       
                                </div>
                                </Col>
                            </section>
                        </Col>
                        
                    </Row>
                    <Col className='footer_div'>
                            <p class='text-center text-white'>
                                Lotgrand Limited and its associated brands operate as an independent ticket purchasing service and are neither associated with any company that manages any product for which their services are employed.
                                </p>
                                <p class="text-white text-center">Lotgrand Limited and its associated brands operate as an independent ticket purchasing service and are neither associated with any company that manages any product for which their services are employed.
                            </p>
                            <div class="d-flex justify-content-center mt-4 mb-1">
                                <a href="#" class="text-white mx-2">About Us</a>
                                <a href="#" class="text-white mx-2">Terms of Use</a>
                                <a href="#" class="text-white mx-2">Privacy Policy</a>
                                <a href="#" class="text-white mx-2">RSS</a>
                                <a href="#" class="text-white mx-2">Contact Us</a>
                            </div>
                        </Col>
               </Container>
            </section>
       </footer>
    )
}

export default Footer
