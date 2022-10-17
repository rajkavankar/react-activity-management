import React, { useState } from "react"
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-toastify"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { LinkContainer } from "react-router-bootstrap"
import Appbar from "../components/Appbar"
import DisplayCard from "../components/DisplayCard"

const LoginPage = () => {
  const [visible, setVisible] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (email === "" || password === "") {
      return toast.error("Please enter all details", {
        theme: "colored",
        position: "top-center",
      })
    }

    try {
      const auth = getAuth()

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredentials.user) {
        navigate("/dashboard")
      }
    } catch (error) {
      toast.error("Invalid credentials")
    }
  }

  return (
    <div>
      <Appbar />
      <Container>
        <Row>
          <Col xs={6} lg={6} sm={6} className='mt-5 offset-3'>
            <DisplayCard>
              <h3 className='text-center mb-3'>Login</h3>

              <Form onSubmit={onSubmit}>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>
                    Email <span className='text-danger'>*</span>
                  </Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    value={email}
                    onChange={onChange}
                    placeholder='Enter email'
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>
                    Password <span className='text-danger'>*</span>
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={visible ? "text" : "password"}
                      name='password'
                      value={password}
                      onChange={onChange}
                      placeholder='Enter password'
                    />
                    <Button
                      variant='light'
                      type='button'
                      onClick={() => setVisible(!visible)}>
                      {visible ? <FaEye /> : <FaEyeSlash />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <div className='d-flex justify-content-between align-items-center'>
                  <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                    <Form.Check type='checkbox' label='Remember me' />
                  </Form.Group>
                  <div>
                    <LinkContainer to='/forgot-password'>
                      <Button variant='link'>forgot password?</Button>
                    </LinkContainer>
                  </div>
                </div>

                <div className='d-grid gap-2'>
                  <Button variant='dark' type='submit'>
                    Submit
                  </Button>
                </div>
              </Form>
            </DisplayCard>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default LoginPage
