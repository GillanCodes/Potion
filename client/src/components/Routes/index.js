import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from '../Home/Home';
import Auth from "../Auth";

export default function index() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' exact='true' element={<Home/>} />
            <Route path='/auth' exact='true' element={<Auth/>} />

        </Routes>
    </BrowserRouter>
  )
}
