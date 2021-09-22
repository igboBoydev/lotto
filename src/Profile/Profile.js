import React from 'react'
import { useGlobalContext } from '../store/context';
import { Container, Col, Row } from 'react-bootstrap';
const Profile = () => {
    const { profile, games } = useGlobalContext();
    










    return (
        <main>
            <Container>
                <Row>
                    <Col md={2}>
                    </Col>
                    <Col md={8}>
                        <section>
                                <div>
                                    <h5>{profile.customer_id}</h5>
                                    <p>{profile.wallet}</p>
                                    <p>{profile.mobile}</p>
                                    <p>{profile.withdrawable}</p>
                                </div>
                       </section>
                    </Col>
            </Row>
          </Container>
        </main>
    )
}

export default Profile
