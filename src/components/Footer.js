import React from 'react'
import { Container, Row, Col } from 'react-bootstrap' 

function Footer() {
  return (
        <footer>
            <Container>
              <Row>
                <Col className='text-center py-3' style={{color: 'rgba(0,0,0,0.5)'}}>
                  Copyright &copy; MyShop
                </Col>
              </Row>
            </Container>
        </footer>
  )
}

export default Footer