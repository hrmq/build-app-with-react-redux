import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/courses/CoursesPage';
import Header from './components/common/Header';
import PageNotFound from './components/PageNotFound';

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
          <Route path='*' element={<PageNotFound/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
