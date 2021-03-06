import { RequestHandler } from "express";
import noteModel from "../../models/note.model";
import { isValidObjectId } from "mongoose"
import * as fs from "fs";

export const getNotes: RequestHandler = async (req, res) => {
    
    if (res.locals.user) {
        var notes = await noteModel.find({author: res.locals.user.id});
        return res.status(201).json(notes)
    } else {
        return res.status(401).send('Need Auth');
    }

}

export const createNote: RequestHandler  = async (req, res) => {
    if (res.locals.user) {
        var newNote = await noteModel.create({
            author: res.locals.user.id,
            content: [
                {
                    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
                    tag: "p",
                    html: ""
                }
            ]
        });
        return res.status(201).json(newNote);
    } else {
        return res.status(401).send('Need Auth');
    }
}

export const insertContent: RequestHandler = (req, res) => {
   
        const { blocks } = req.body;
        const { id: noteId } = req.params

        console.log(res.locals.user)

        if (!isValidObjectId(noteId))  
            return res.status(200).send("Cant find note " + noteId);

        if (res.locals.user){
            try {
                noteModel.findByIdAndUpdate(noteId, {
                    $set: {
                        content: blocks
                    }
                }, {new: true}, (err, data) => {
                    if (err) throw Error(err.toString());
                    else res.status(201).send(data);
                });
            } catch (error) {
                console.log('err');
            }
        }
}

export const titleEdit: RequestHandler = (req, res) => {

    const { id: noteId } = req.params

    if (!isValidObjectId) 
        return res.status(200).send('invalid ID');

    if (res.locals.user) {

        const { title } = req.body;
        
        try {
            noteModel.findByIdAndUpdate(noteId, {
                $set: {
                    title: title
                }
            }, {new: true}, (err, data) => {
                if (err) throw Error(err.toString());
                else res.status(201).send(data);
            });
        } catch (error) {
            console.log('err');
        }


    } else {
        //TODO
    }
}

export const bannerEdit: RequestHandler = (req, res) => {

    if (res.locals.user) {
        
        if (req.file) {
            const fileName: string = req.params.id + '-' + Date.now() + "." + req.file.originalname.split('.')[1];

            try {
                if (req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpeg") throw Error('invalid_type');
                if (req.file.size > 2500000) throw Error('max_size'); //Taille en KO
            } catch (error) {
                
            }

            fs.writeFile('./public/cdn/notes/banner/' + fileName, req.file.buffer, (err: NodeJS.ErrnoException | null) => {
                if (err) console.log(err);
            });

            try {
                noteModel.findByIdAndUpdate(req.params.id, {
                    $set: {
                        banner: `cdn/notes/banner/${fileName}`
                    }
                }, {new: true}, (err, data) => {
                    if (err) throw Error(err.toString());
                    else res.status(201).send(data);
                });
            } catch (error) {
                console.log('err');
            }

        }
    }

}