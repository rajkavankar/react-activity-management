import React from "react"
import { Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import FacultiesPage from "./pages/FacultiesPage"
import ProfilePage from "./pages/ProfilePage"
import PrivateRoute from "./components/PrivateRoute"
import TagsPage from "./pages/TagsPage"
import ResourcePersonsPage from "./pages/ResourcePerson"
import ComiteePage from "./pages/ComiteePage"
import ActivitesPage from "./pages/ActivitiesPage"

const App = () => {
  return (
    <div className='wrapper '>
      <ToastContainer autoClose={2000} position='top-center' theme='colored' />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/sign-in' element={<LoginPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='/dashboard' element={<DashboardPage />} />
        </Route>
        <Route path='/faculties' element={<PrivateRoute />}>
          <Route path='/faculties' element={<FacultiesPage />} />
        </Route>
        <Route path='/profile' element={<PrivateRoute />}>
          <Route path='/profile' element={<ProfilePage />} />
        </Route>
        <Route path='/tags' element={<PrivateRoute />}>
          <Route path='/tags' element={<TagsPage />} />
        </Route>
        <Route path='/resource-persons' element={<PrivateRoute />}>
          <Route path='/resource-persons' element={<ResourcePersonsPage />} />
        </Route>
        <Route path='/comitees' element={<PrivateRoute />}>
          <Route path='/comitees' element={<ComiteePage />} />
        </Route>
        <Route path='/activites' element={<PrivateRoute />}>
          <Route path='/activites' element={<ActivitesPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
