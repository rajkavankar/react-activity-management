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
import { columns } from "../schemas/Tags"

const ComiteePage = () => {
  const [show, setShow] = useState(false)
  const [comitees, setComitees] = useState([])
  const [filterComitees, setFilterComitees] = useState([])
  const [searchComitees, setSearchComitees] = useState("")
  const [comitee, setComitee] = useState("")

  useEffect(() => {
    const fetchComitees = async () => {
      const comiteeRef = collection(db, "comitees")

      // const q = query(coursesRef)

      const querySnap = await getDocs(comiteeRef)

      const comitees = []

      querySnap.forEach((doc) => {
        return comitees.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setComitees(comitees)
    }

    fetchComitees()
  })

  useEffect(() => {
    const result = comitees.filter((t) => {
      return t.data.name.toLowerCase().match(searchComitees.toLowerCase())
    })
    setFilterComitees(result)
  }, [searchComitees, comitees])

  const onSubmit = async (e) => {
    e.preventDefault()

    if (comitee === "") {
      return toast.error("All fields are required")
    }

    const formData = {
      comitee,
    }

    try {
      formData.timeStamp = serverTimestamp()

      await addDoc(collection(db, "comitees"), formData)

      setShow(false)
      setComitee("")

      toast.success("Tag added successfully")
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className='wrapper'>
      <FormModal
        title='Add Comitee'
        formId='comitee-form'
        show={show}
        onHide={() => setShow(false)}>
        <Form id='comitee-form' onSubmit={onSubmit}>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>
              Comitee Name <span className='text-danger'>*</span>
            </Form.Label>
            <Form.Control
              type='text'
              name='comitee'
              placeholder='Enter comitee name'
              value={comitee}
              onChange={(e) => setComitee(e.target.value)}
            />
          </Form.Group>
        </Form>
      </FormModal>
      <Sidebar />
      <Container>
        <DisplayCard>
          <Flex justify='between'>
            <h1>Comitees page</h1>
            <Button
              className='d-block ms-auto'
              variant='primary'
              onClick={() => setShow(true)}>
              Add Comitee
            </Button>
          </Flex>
          <Table
            title='comitees'
            columns={columns}
            data={searchComitees === "" ? comitees : filterComitees}
            value={searchComitees}
            onChange={(e) => setSearchComitees(e.target.value)}
          />
        </DisplayCard>
      </Container>
    </div>
  )
}

export default ComiteePage
