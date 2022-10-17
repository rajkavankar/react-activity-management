import React, { useState } from "react"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { toast } from "react-toastify"
import { FaArrowLeft } from "react-icons/fa"
import { LinkContainer } from "react-router-bootstrap"
import Appbar from "../components/Appbar"
import DisplayCard from "../components/DisplayCard"

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()

    if (email === "") {
      return toast.error("Please provide an email")
    }

    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Email was sent")
      setEmail("")
    } catch (error) {
      toast.error("Could not send reset email")
    }
  }
  return (
    <div>
      <Appbar />
      <Container>
        <Row>
          <Col xs={6} lg={6} sm={6} className='mt-5 offset-3'>
            <DisplayCard>
              <LinkContainer to='/sign-in'>
                <Button variant='light' className='text-primary'>
                  <FaArrowLeft /> &nbsp; Back
                </Button>
              </LinkContainer>
              <h3 className='text-center mb-3'>Forgot password</h3>

              <Form onSubmit={onSubmit}>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>
                    Email <span className='text-danger'>*</span>
                  </Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter email'
                  />
                </Form.Group>

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

export default ForgotPasswordPage
