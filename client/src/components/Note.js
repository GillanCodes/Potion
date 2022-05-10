import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isEmpty } from './Utils';

import EditablePage from "./Editor/EditablePage";
import axios from 'axios';
import { changeBanner, editTitle } from '../actions/note.action';

let timeout = null;

export default function Note() {

    const dispatch = useDispatch();

    const [state, setState] = useState({
        isLoading:true
    })

    const { id: noteId } = useParams();
    const noteData = useSelector(state => state.noteReducer);

    useEffect(() => {
    
        if (!isEmpty(noteData)) {
            setState({...state, isLoading:false});
        }

    }, [noteData])

    const titleHandle = (e) => {
        clearTimeout(timeout);
        var title = e.target.innerText

        timeout = setTimeout(() => {
            if (!isEmpty(title)) {
                dispatch(editTitle(noteId, title));
            }
        }, 1000)
    }

    const bannerHandle = (e) => {

        var image = e.target.files[0];
        var blob = URL.createObjectURL(image);
        document.getElementById('banner').src = blob;
        
        var data = new FormData();
        data.append('banner', image);

        dispatch(changeBanner(noteId, data))
    }
    

  return (
    <div className='_container note-container'>
        {!state.isLoading && (
            <>
                {noteData.map((note) => {
                    if (note._id === noteId) {
                        return (
                            <div>
                                <div className="head">
                                    <div className="banner-content">
                                        <label htmlFor="file-input">
                                            <img src={`${process.env.REACT_APP_API_URL}/${note.banner}`} alt="img" className='banner' id="banner" />
                                        </label>
                                        <input type="file" name="" id="file-input" style={{display: 'none'}} onChange={(e) => bannerHandle(e)}/>
                                    </div>
                                    <div className="title">
                                        <p className='icon'></p>
                                        <h1 className='title-text' contentEditable onKeyUp={(e) => titleHandle(e)}>{note.title}</h1>
                                    </div>
                                </div>
                                <EditablePage content={note.content} id={note._id} />
                            </div>
                        )
                    }
                    return null
                })}
            </>
        )}
    </div>
  )
}
