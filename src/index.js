import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';
import {Navigate, Route, Routes} from 'react-router-dom'
import Signup from './component/Signup';
import {BrowserRouter} from 'react-router-dom';
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import Navbar from './component/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<Signup/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/app/:id' element={<App/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
