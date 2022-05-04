import { RequestHandler } from "express";
import noteModel from "../../models/note.model";

export const getNotes: RequestHandler = async (req, res) => {
    
    if (res.locals.user) {
        var notes = await noteModel.find({author: res.locals.user});
        return res.status(201).json(notes)
    } else {
        return res.status(401).send('Need Auth');
    }

}

export const createNote: RequestHandler  = async (req, res) => {
    if (res.locals.user) {
        var newNote = await noteModel.create({
            author: res.locals.user
        });
        return res.status(201).json(newNote);
    } else {
        return res.status(401).send('Need Auth');
    }
}