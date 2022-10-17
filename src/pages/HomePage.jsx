import React from "react"
import { Container } from "react-bootstrap"
import Appbar from "../components/Appbar"

const HomePage = () => {
  return (
    <div>
      <Appbar />
      <Container>
        <h1>Home page</h1>
      </Container>
    </div>
  )
}

export default HomePage
