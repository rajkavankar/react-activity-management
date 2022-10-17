import React, { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import { Container, Button, Form, Col } from "react-bootstrap"
import { db } from "../firebase.config"
import {
  addDoc,
  serverTimestamp,
  getDocs,
  collection,
} from "firebase/firestore"
import DisplayCard from "../components/DisplayCard"
import { toast } from "react-toastify"
import Table from "../components/Table"
import FormModal from "../components/FormModal"
import Flex from "../components/Flex"
import { columns } from "../schemas/ResourscePerson"

const ResourcePersonsPage = () => {
  const [show, setShow] = useState(false)
  const [resourcePersons, setResourcePersons] = useState([])
  const [filterResourcePersons, setFilterResourcePersons] = useState([])
  const [searchResourcePerson, setSearchResourcePerson] = useState("")
  const [name, setName] = useState("")
  const [designation, setDesignation] = useState("")

  useEffect(() => {
    const fetchResourcePersons = async () => {
      const resourcePersonRef = collection(db, "resourcePersons")

      // const q = query(coursesRef)

      const querySnap = await getDocs(resourcePersonRef)

      const resourcePersons = []

      querySnap.forEach((doc) => {
        return resourcePersons.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setResourcePersons(resourcePersons)
    }

    fetchResourcePersons()
  })

  useEffect(() => {
    const result = resourcePersons.filter((resPerson) => {
      return resPerson.data.name
        .toLowerCase()
        .match(searchResourcePerson.toLowerCase())
    })
    setFilterResourcePersons(result)
  }, [searchResourcePerson, resourcePersons])

  const onSubmit = async (e) => {
    e.preventDefault()

    if (name === "" || designation === "") {
      return toast.error("All fields are required")
    }

    const formData = {
      name,
      designation,
    }

    try {
      formData.timeStamp = serverTimestamp()

      await addDoc(collection(db, "resourcePersons"), formData)

      setShow(false)
      setName("")
      setDesignation("")

      toast.success("Resource Person added successfully")
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className='wrapper'>
      <FormModal
        title='Add Resource person'
        formId='resPerson-form'
        show={show}
        onHide={() => setShow(false)}>
        <Form id='resPerson-form' onSubmit={onSubmit}>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>
              Name <span className='text-danger'>*</span>
            </Form.Label>
            <Form.Control
              type='text'
              name='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>
              Designation <span className='text-danger'>*</span>
            </Form.Label>
            <Form.Control
              type='text'
              name='designation'
              placeholder='Enter designation'
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </Form.Group>
        </Form>
      </FormModal>
      <Sidebar />
      <Container>
        <DisplayCard>
          <Flex justify='between'>
            <h1>Resource person page</h1>
            <Button
              className='d-block ms-auto'
              variant='primary'
              onClick={() => setShow(true)}>
              Add Resouce Person
            </Button>
          </Flex>
          <Table
            title='Resource Persons'
            columns={columns}
            data={
              searchResourcePerson === ""
                ? resourcePersons
                : filterResourcePersons
            }
            value={searchResourcePerson}
            onChange={(e) => setSearchResourcePerson(e.target.value)}
          />
        </DisplayCard>
      </Container>
    </div>
  )
}

export default ResourcePersonsPage
