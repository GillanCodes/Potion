import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { isEmpty } from './Utils';

export default function Navbar() {

    const userData = useSelector(state => state.userReducer);
    const notesData = useSelector(state => state.noteReducer);
    

  return (
    <>
    <nav className='nav-container'>
        <div className="nav-content">
            <NavLink className='item' extact="true" to="/">
                Home
            </NavLink>
            {!isEmpty(userData) ? (
                <p className='item'>{userData.username}</p>
            ) : (
                <NavLink className='item' extact="true" to="/auth">
                    Authentification
                </NavLink>
            )}
        </div>
    </nav>
    <nav className='nav-note'>
        <div className="nav-note-content">
            {!isEmpty(notesData) && (
                notesData.map((note) => {
                    return (
                        <NavLink extact="true" to={`/note/${note._id}`} className='item'>
                            {note.icon ? note.icon : null} {note.title}
                        </NavLink>
                    )
                })
            )}
        </div>
    </nav>
    </>
  )
}
