import React from "react"
import { Modal, Button } from "react-bootstrap"

const FormModal = ({ show, title, onHide, children, formId }) => {
  return (
    <>
      <Modal show={show} onHide={onHide} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onHide}>
            Close
          </Button>
          <Button variant='primary' form={formId} type='submit'>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default FormModal
