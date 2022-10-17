import React from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const Appbar = () => {
  return (
    <nav>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <Navbar.Brand>Activity management</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/sign-in'>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  )
}

export default Appbar
