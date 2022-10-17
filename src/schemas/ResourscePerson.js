import React, { useState, useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import { FaTrashAlt, FaEdit } from "react-icons/fa"
import { db } from "../firebase.config"
import { doc, deleteDoc, getDoc } from "firebase/firestore"
import FormModal from "../components/FormModal"
import Flex from "../components/Flex"

const onRemove = async (id) => {
  try {
    const docRef = doc(db, "resourcePersons", id)
    if (window.confirm("Are you sure")) {
      await deleteDoc(docRef)
    }
  } catch (error) {
    console.log(error)
  }
}

const onSubmit = (e) => {
  e.preventDefault()
}
// const OnUpdate = async (id) => {
//   const [updateName, setUpdateName] = useState("")
//   const [updateDesignation, setUpdateDesignation] = useState("")

//   try {
//     const docRef = doc(db, "resPersons", id)
//     const resperson = await getDoc(docRef)
//     setUpdateName(resperson.name)
//     setUpdateDesignation(resperson.designation)
//     HandleShow(true)
//   } catch (error) {
//     console.log(error)
//   }
//   return (
//     <FormModal
//       title='update Resource person'
//       formId='update-resPerson-form'
//       show={HandleShow}
//       onHide={() => HandleShow(false)}>
//       <Form id='update-resPerson-form' onSubmit={onSubmit}>
//         <Form.Group controlId='formGridEmail'>
//           <Form.Label>
//             Name <span className='text-danger'>*</span>
//           </Form.Label>
//           <Form.Control
//             type='text'
//             name='name'
//             placeholder='Enter name'
//             value={updateName}
//             onChange={(e) => setUpdateName(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId='formGridEmail'>
//           <Form.Label>
//             Designation <span className='text-danger'>*</span>
//           </Form.Label>
//           <Form.Control
//             type='text'
//             name='designation'
//             placeholder='Enter designation'
//             value={updateDesignation}
//             onChange={(e) => setUpdateDesignation(e.target.value)}
//           />
//         </Form.Group>
//       </Form>
//     </FormModal>
//   )
// }

export const columns = [
  {
    name: "Name",
    selector: (row) => row.data.name,
    sortable: true,
  },
  {
    name: "Designation",
    selector: (row) => row.data.designation,
  },
  {
    name: "Actions",
    cell: (row) => (
      <Flex justify='between'>
        {/* <Button
          variant='primary'
          onClick={() => OnUpdate(row.id) && HandleShow(true)}>
          <FaEdit />
        </Button> */}
        <Button
          className='ms-2'
          variant='danger'
          onClick={() => onRemove(row.id)}>
          <FaTrashAlt />
        </Button>
      </Flex>
    ),
  },
]
