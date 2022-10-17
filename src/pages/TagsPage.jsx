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

const TagsPage = () => {
  const [show, setShow] = useState(false)
  const [tags, setTags] = useState([])
  const [filterTags, setFilterTags] = useState([])
  const [searchTags, setSearchTags] = useState("")
  const [tag, setTag] = useState("")

  useEffect(() => {
    const fetchTags = async () => {
      const tagsRef = collection(db, "tags")

      // const q = query(coursesRef)

      const querySnap = await getDocs(tagsRef)

      const tags = []

      querySnap.forEach((doc) => {
        return tags.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setTags(tags)
    }

    fetchTags()
  })

  useEffect(() => {
    const result = tags.filter((t) => {
      return t.data.tag.toLowerCase().match(searchTags.toLowerCase())
    })
    setFilterTags(result)
  }, [searchTags, tags])

  const onSubmit = async (e) => {
    e.preventDefault()

    if (tag === "") {
      return toast.error("All fields are required")
    }

    const formData = {
      tag,
    }

    try {
      formData.timeStamp = serverTimestamp()

      await addDoc(collection(db, "tags"), formData)

      setShow(false)
      setTag("")

      toast.success("Tag added successfully")
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className='wrapper'>
      <FormModal
        title='Add Tag'
        formId='tag-form'
        show={show}
        onHide={() => setShow(false)}>
        <Form id='tag-form' onSubmit={onSubmit}>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>
              Tag <span className='text-danger'>*</span>
            </Form.Label>
            <Form.Control
              type='text'
              name='tag'
              placeholder='Enter tag'
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </Form.Group>
        </Form>
      </FormModal>
      <Sidebar />
      <Container>
        <DisplayCard>
          <Flex justify='between'>
            <h1>Tags page</h1>
            <Button
              className='d-block ms-auto'
              variant='primary'
              onClick={() => setShow(true)}>
              Add Tag
            </Button>
          </Flex>
          <Table
            title='tags'
            columns={columns}
            data={searchTags === "" ? tags : filterTags}
            value={searchTags}
            onChange={(e) => setSearchTags(e.target.value)}
          />
        </DisplayCard>
      </Container>
    </div>
  )
}

export default TagsPage
