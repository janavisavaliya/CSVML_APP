import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from './Components/Login';
import Register from './Components/Register';
import UploadForm from './Components/UploadForm';
import PublicRoute from './Components/Publicroute';
import Watchman from './Components/Watchman';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path='/register' element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          <Route path='/csv' element={
            <Watchman>
              <UploadForm />
            </Watchman>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
