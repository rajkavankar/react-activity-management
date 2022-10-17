import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export const useAuthStatus = () => {
  const [loggedin, setLoggedin] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedin(true)
      }

      setCheckingStatus(false)
    })
  }, [])

  return { loggedin, checkingStatus }
}
