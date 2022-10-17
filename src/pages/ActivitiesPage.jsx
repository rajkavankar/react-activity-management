import React, { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import { Container, Button, Form, Col, Row } from "react-bootstrap"
import { db } from "../firebase.config"
import {
  addDoc,
  serverTimestamp,
  getDocs,
  collection,
} from "firebase/firestore"
import DisplayCard from "../components/DisplayCard"
import { toast } from "react-toastify"
import { Formik } from "formik"
import Table from "../components/Table"
import FormModal from "../components/FormModal"
import Flex from "../components/Flex"
import { columns } from "../schemas/Activites"
import { getAuth } from "firebase/auth"

const ActivitesPage = () => {
  const [show, setShow] = useState(false)
  const [activites, setActivites] = useState([])
  const [filterActivites, setFilterActivites] = useState([])
  const [searchActvites, setSearchActivites] = useState("")
  const auth = getAuth()
  const [name] = useState(auth.currentUser.displayName)

  useEffect(() => {
    const fetchActivites = async () => {
      const activityRef = collection(db, "activites")

      // const q = query(coursesRef)

      const querySnap = await getDocs(activityRef)

      const activites = []

      await querySnap.forEach((doc) => {
        return activites.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setActivites(activites)
    }

    fetchActivites()
  })

  useEffect(() => {
    const result = activites.filter((activity) => {
      return activity.data.activity_title
        .toLowerCase()
        .match(searchActvites.toLowerCase())
    })
    setFilterActivites(result)
  }, [searchActvites, activites])

  return (
    <div className='wrapper'>
      <FormModal
        title='Add activiy'
        formId='activity-form'
        show={show}
        onHide={() => setShow(false)}>
        <Formik
          initialValues={{
            activity_title: "",
            activity_type: "VAC",
            activity_for: "Students",
            activity_target: "BMS",
            start_date: "",
            end_date: "",
            start_time: "",
            end_time: "",
            status: "upcoming",
            activity_owner: name,
            tag: "",
            resource_person: "",
            descripsion: "",
          }}
          onSubmit={(values) => alert(JSON.stringify(values))}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form id='activity-form' onSubmit={handleSubmit}>
              <Row>
                <Form.Group
                  as={Col}
                  lg={8}
                  className='my-2'
                  controlId='activity_title-field'>
                  <Form.Label>Activity title</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='title'
                    name='activity_title'
                    value={values.activity_title}
                    onChange={handleChange}
                    isInvalid={touched.activity_title && errors.activity_title}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.activity_title}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  as={Col}
                  lg={4}
                  className='my-2'
                  controlId='activity_type-field'>
                  <Form.Label>Activity type</Form.Label>
                  <Form.Select
                    as='select'
                    name='activity_type'
                    value={values.activity_type}
                    onChange={handleChange}
                    isInvalid={touched.activity_type && errors.activity_type}>
                    <option value='VAC'>VAC</option>
                    <option value='Workshop'>Workshop</option>
                    <option value='FDP'>FDP</option>
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>
                    {errors.activity_type}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group
                  as={Col}
                  lg={6}
                  className='my-2'
                  controlId='activity_for-field'>
                  <Form.Label>Activity for</Form.Label>
                  <Form.Select
                    as='select'
                    name='activity_for'
                    value={values.activity_for}
                    onChange={handleChange}
                    isInvalid={touched.activity_for && errors.activity_for}>
                    <option value='Students'>Students</option>
                    <option value='Faculties'>Faculties</option>
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>
                    {errors.activity_for}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  lg={6}
                  className='my-2'
                  controlId='activity_target-field'>
                  <Form.Label>Activity Target</Form.Label>
                  <Form.Select
                    as='select'
                    name='activity_target'
                    value={values.activity_target}
                    onChange={handleChange}
                    isInvalid={
                      touched.activity_target && errors.activity_target
                    }>
                    <option value='BMS'>BMS</option>
                    <option value='BSc IT'>BSc IT</option>
                    <option value='BSc DS'>BSc DS</option>
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>
                    {errors.activity_target}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group
                  as={Col}
                  lg={3}
                  className='my-2'
                  controlId='start_date-field'>
                  <Form.Label>Start date</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='start date'
                    name='start_date'
                    value={values.start_date}
                    onChange={handleChange}
                    isInvalid={touched.start_date && errors.start_date}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.start_date}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  lg={3}
                  className='my-2'
                  controlId='end_date-field'>
                  <Form.Label>End date</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='end date'
                    name='end_date'
                    value={values.end_date}
                    onChange={handleChange}
                    isInvalid={touched.end_date && errors.end_date}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.end_date}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            </Form>
          )}
        </Formik>
      </FormModal>
      <Sidebar />
      <Container>
        <DisplayCard>
          <Flex justify='between'>
            <h1>Activites page</h1>
            <Button
              className='d-block ms-auto'
              variant='primary'
              onClick={() => setShow(true)}>
              Add Activity
            </Button>
          </Flex>
          <Table
            title='Activites'
            columns={columns}
            data={searchActvites === "" ? activites : filterActivites}
            value={searchActvites}
            onChange={(e) => setSearchActivites(e.target.value)}
          />
        </DisplayCard>
      </Container>
    </div>
  )
}

export default ActivitesPage
