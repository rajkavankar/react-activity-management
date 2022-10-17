import React, { useState } from "react"
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import { FiMenu } from "react-icons/fi"
import { GrLogout } from "react-icons/gr"
import { getAuth } from "firebase/auth"
import {
  FaServer,
  FaUsers,
  FaBook,
  FaUserGraduate,
  FaTags,
  FaUserCircle,
} from "react-icons/fa"
import { MdClass } from "react-icons/md"

function Sidebar() {
  const auth = getAuth()

  const [name] = useState(auth.currentUser.displayName)
  const navigate = useNavigate()
  const onLogOut = () => {
    auth.signOut()
    navigate("/sign-in")
  }
  return (
    <>
      <Navbar bg='dark' variant='dark' expand='xxl' className='mb-3'>
        <Container>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand`}
            style={{ color: "white" }}>
            <FiMenu />
          </Navbar.Toggle>

          <Navbar.Brand className='me-auto'>Activity-management</Navbar.Brand>

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement='start'
            style={{ width: "15rem" }}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                {name}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='justify-content-end flex-grow-1 pe-3'>
                <LinkContainer to='/dashboard'>
                  <Nav.Link>
                    <FaServer size={"1.2rem"} /> &nbsp; Dashboard
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/activites'>
                  <Nav.Link>
                    <MdClass size={"1.2rem"} /> &nbsp; Activites
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/faculties'>
                  <Nav.Link>
                    <FaUsers size={"1.2rem"} /> &nbsp; Faculties
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/comitees'>
                  <Nav.Link>
                    <FaBook size={"1.2rem"} /> &nbsp; Comitees
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/resource-persons'>
                  <Nav.Link>
                    <FaUserGraduate size={"1.2rem"} /> &nbsp; Resourse person
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/tags'>
                  <Nav.Link>
                    <FaTags size={"1.2rem"} /> &nbsp; Tags
                  </Nav.Link>
                </LinkContainer>
                <hr />
                <LinkContainer to='/profile'>
                  <Nav.Link>
                    <FaUserCircle size={"1.2rem"} /> &nbsp; Profile
                  </Nav.Link>
                </LinkContainer>

                <Nav.Link onClick={onLogOut}>
                  <GrLogout size={"1.2rem"} /> &nbsp; Logout
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  )
}

export default Sidebar
