import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from '../Home/Home';
import Auth from "../Auth";
import Note from '../Note';
import Navbar from '../Navbar';

export default function index() {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path='/' exact='true' element={<Home/>} />
            <Route path='/auth' exact='true' element={<Auth/>} />
            <Route path='/note/:id' exact='true' element={<Note/>} />

        </Routes>
    </BrowserRouter>
  )
}
