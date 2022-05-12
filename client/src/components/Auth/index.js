import React from 'react'
import Login from './Login'
import Register from './Register'

export default function index() {
  return (
    <div className='_container auth-module '>
        <Login />
        <Register />
    </div>
  )
}
