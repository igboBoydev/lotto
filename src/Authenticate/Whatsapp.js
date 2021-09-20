import React, { useState } from 'react';
import { Form, Button, Link, Row, Container, Col } from 'react-bootstrap';
import { useGlobalContext } from '../store/context';

const Whatsapp = () => {
  const { showWhatsapp } = useGlobalContext();
  const [getWhatsappOtp, setGetWhatsappOtp] = useState('');


  const handleSecondChange = (e) => {
    e.preventDefault()
    setGetWhatsappOtp(e.target.value)
  }

  const handleSecondSubmit = (e) => {
    e.preventDefault()
    showWhatsapp(getWhatsappOtp)
  }


  return (
        <section className='register_section d-flex justify-content-center'>
            <Container fluid='md'>
            <Row>
                <Col className='mt-5' md={{ span: 12, offset: 1 }}>

      <Form onSubmit={handleSecondSubmit}>
          <Form.Label htmlFor="inputPassword5">OTP Via Whatsapp</Form.Label>
          <Form.Control
            type="text"
                name='otp'
                className='input_width'
            onChange={handleSecondChange}
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
              />
          <Form.Text id="passwordHelpBlock" muted>
            Please enter the your Whatsapp number.
        </Form.Text>
        <Button className='my-4 ' type='submit' variant="outline-success">Submit</Button>
      </Form>
                       
                </Col>
            </Row>
        </Container>
   </section>
    )
}

export default Whatsapp


















































// import React from 'react'
// import { Form, Button, Link } from 'react-bootstrap';

// const Whatsapp = () => {

//   const handleSecondChange = (e) => {
//     e.preventDefault()
//     console.log('hello world')
//   }

//   const handleSecondSubmit = (e) => {
//     e.preventDefault()
//     console.log('hello world')
//   }
//   return (
//             <section className="verify">
//                       <Form onSubmit={handleSecondSubmit}>
//           <Form.Label htmlFor="inputPassword5">OTP Resend</Form.Label>
//           <Form.Control
//             type="text"
//             name='otp'
//             onChange={handleSecondChange}
//             id="inputPassword5"
//             aria-describedby="passwordHelpBlock"
//               />
//           <Form.Text id="passwordHelpBlock" muted>
//             Please enter the your whatsapp number.
//         </Form.Text>
//         <Button type='submit' variant="outline-success">Submit</Button>
//       </Form>
//         </section>
//   )
// }

// export default Whatsapp


        