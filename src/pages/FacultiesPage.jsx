import React, { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import { Container, Button, Form, Row, Col } from "react-bootstrap"
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import { db } from "../firebase.config"
import {
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
  query,
  collection,
  orderBy,
} from "firebase/firestore"
import DisplayCard from "../components/DisplayCard"
import { toast } from "react-toastify"
import Table from "../components/Table"
import FormModal from "../components/FormModal"

import { columns } from "../schemas/Faculties"

const FacultiesPage = () => {
  const [faculties, setFaculties] = useState([])
  const [filterFaculties, setFilterFaculties] = useState([])
  const [searchFaculty, setSearchFaculty] = useState("")
  const [show, setShow] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    const fetchFaculties = async () => {
      const facultiesRef = collection(db, "users")

      const q = query(facultiesRef, orderBy("name", "asc"))

      const querySnap = await getDocs(q)

      const faculties = []

      querySnap.forEach((doc) => {
        return faculties.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setFaculties(faculties)
    }

    fetchFaculties()
  }, [])

  useEffect(() => {
    const result = faculties.filter((faculty) => {
      return faculty.data.name.toLowerCase().match(searchFaculty.toLowerCase())
    })
    setFilterFaculties(result)
  }, [searchFaculty, faculties])

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!name || !email || !password || !confirmPassword) {
      return toast.error("All fields are required")
    }

    if (password !== confirmPassword) {
      return toast.error("Confirm password doesn't match")
    }

    const formData = {
      name,
      email,
      password,
    }

    try {
      const auth = getAuth()
      const useCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = useCredentials.user
      await updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timeStamp = serverTimestamp()

      await setDoc(doc(db, "users", user.uid), formDataCopy)

      setShow(false)
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      toast.success("Faculty addded successfully")
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className='wrapper '>
      <FormModal
        title='Add faculty'
        formId='faculty-form'
        show={show}
        onHide={() => setShow(false)}>
        <Form id='faculty-form' onSubmit={onSubmit}>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridEmail'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridPassword'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridEmail'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridPassword'>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type='password'
                name='confirmPassword'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          </Row>
        </Form>
      </FormModal>
      <Sidebar />
      <Container>
        <DisplayCard>
          <div className='d-flex justify-content-between-align-items-center'>
            <h1>Faculties page</h1>
            <Button
              className='d-block ms-auto'
              variant='primary'
              onClick={() => setShow(true)}>
              Add Faculty
            </Button>
          </div>
          <Table
            title='faculties'
            columns={columns}
            data={searchFaculty === "" ? faculties : filterFaculties}
            value={searchFaculty}
            onChange={(e) => setSearchFaculty(e.target.value)}
          />
        </DisplayCard>
      </Container>
    </div>
  )
}

export default FacultiesPage
