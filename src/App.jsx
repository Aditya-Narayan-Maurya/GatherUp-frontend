import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import Events from './pages/Events';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <div>
      <Toaster/>
        <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>

            {/* private routes */}
            <Route path='/events' element={<PrivateRoute><Events/></PrivateRoute>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
