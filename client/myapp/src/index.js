import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './login';
import User_Ragister from './register';
import Home from './home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
function linkdin (){
    return(<BrowserRouter>
    <Routes>
        <Route path='/'  element={<Login />} />
    </Routes>
    </BrowserRouter>)
}
root.render(< Login />)

