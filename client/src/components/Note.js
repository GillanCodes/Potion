import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isEmpty } from './Utils';

import EditablePage from "./Editor/EditablePage";

export default function Note() {

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
    

  return (
    <div className='note-container'>
        {!state.isLoading && (
            <>
                {noteData.map((note) => {
                    if (note._id === noteId) {
                        return (
                            <div>
                                <h1>{note.title}</h1>
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
