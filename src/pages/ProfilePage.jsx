import React, { useState } from "react"
import Sidebar from "../components/Sidebar"
import { getAuth, updateProfile, updatePassword } from "firebase/auth"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import DisplayCard from "../components/DisplayCard"
import avatar from "../assets/avatar.png"
import { FaPen } from "react-icons/fa"

const ProfilePage = () => {
  const auth = getAuth()

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const [changeDetails, setChangeDetails] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { name, email } = formData

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }))
  }

  const onReset = () => {
    setChangeDetails(false)
  }

  const onResetPassword = () => {
    setChangePassword(false)
    setPassword("")
    setConfirmPassword("")
  }

  const onSubmit = async () => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid)
      await updateDoc(userRef, {
        name,
      })
      await updateProfile(auth.currentUser, {
        displayName: name,
      })

      setChangeDetails(false)
      toast.success("Details updated successfullly")
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  const onPasswordChange = async () => {
    try {
      if (password === "" || confirmPassword === "") {
        return toast.error("All values are required")
      }

      if (password !== confirmPassword) {
        return toast.error("Confirm password doesn't match")
      }

      await updatePassword(auth.currentUser, password)
      setChangePassword(false)
      toast.success("Password changed successfully")
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className='wrapper bg-light'>
      <Sidebar />
      <Container>
        <DisplayCard>
          <Row>
            <Col lg={4}>
              <img
                src={avatar}
                className='img-fluid rounded-circle img-thumbnail mx-auto'
                alt='avatar'
                height={250}
                width={250}
              />
            </Col>
            <Col lg={8}>
              <Form>
                {changeDetails ? (
                  <div className='d-flex align-items-center justify-content-end mb-5'>
                    <Button
                      variant='danger'
                      onClick={onReset}
                      className='d-block me-2'>
                      Cancel
                    </Button>
                    <Button
                      variant='success'
                      onClick={onSubmit}
                      className='d-block'>
                      Submit
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant='primary'
                    onClick={() => setChangeDetails(true)}
                    className='ms-auto d-block mb-5'>
                    Update
                  </Button>
                )}
                <Form.Group className='mb-3' controlId='NameInput'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    id='name'
                    disabled={!changeDetails}
                    value={name}
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='EmailInput'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    id='email'
                    disabled
                    value={email}
                  />
                </Form.Group>
                <hr />
                <div className='d-flex justify-content-between '>
                  <h5>Upadate password</h5>
                  {changePassword ? (
                    <div className='d-flex align-items-center justify-content-end mb-5'>
                      <Button
                        variant='danger'
                        onClick={onResetPassword}
                        className='d-block me-2'>
                        Cancel
                      </Button>
                      <Button
                        variant='success'
                        onClick={onPasswordChange}
                        className='d-block'>
                        update
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant='secondary'
                      onClick={() => setChangePassword(true)}
                      className='ms-auto d-block mb-5'>
                      <FaPen />
                      &nbsp; Update password
                    </Button>
                  )}
                </div>
                {changePassword && (
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId='formPassword'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter Password'
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId='formConfirmPassword'>
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='Confirm Password'
                      />
                    </Form.Group>
                  </Row>
                )}
              </Form>
            </Col>
          </Row>
        </DisplayCard>
      </Container>
    </div>
  )
}

export default ProfilePage
