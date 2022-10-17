import React, { useState } from "react"
import Sidebar from "../components/Sidebar"
import { Container } from "react-bootstrap"
import DisplayCard from "../components/DisplayCard"
import { getAuth } from "firebase/auth"

const DashboardPage = () => {
  const auth = getAuth()
  const [name] = useState(auth.currentUser.displayName)

  return (
    <div className='wrapper bg-light'>
      <Sidebar />
      <Container>
        <DisplayCard>
          <h1>Welcome {name}</h1>
        </DisplayCard>
      </Container>
    </div>
  )
}

export default DashboardPage
