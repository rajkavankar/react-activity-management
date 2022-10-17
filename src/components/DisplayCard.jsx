import React from "react"
import { Card } from "react-bootstrap"

const DisplayCard = ({ children }) => {
  return (
    <Card className='shadow my-5 rounded'>
      <Card.Body>{children}</Card.Body>
    </Card>
  )
}

export default DisplayCard
