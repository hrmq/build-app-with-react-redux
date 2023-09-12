import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/home/HomePage'
import AboutPage from './components/about/AboutPage'
import CoursesPage from './components/courses/CoursesPage'
import Header from './components/common/Header'
import PageNotFound from './components/PageNotFound'
import ManageCoursePage from './components/courses/ManageCoursePage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './App.css';

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Routes>
        <Route exact path='/'>
          <Route index element={<HomePage />} />
          <Route path='about' element={<AboutPage/>} />
          <Route path='courses' element={<CoursesPage/>} />
          <Route path='course/:slug' element={<ManageCoursePage/>} />
          <Route path='course' element={<ManageCoursePage/>} />
          <Route path='*' element={<PageNotFound/>} />
        </Route>
      </Routes>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
