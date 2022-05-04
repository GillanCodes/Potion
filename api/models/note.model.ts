import { Schema, Model, Document, model } from 'mongoose';

export interface INote {
    author: string,
    team: string[],
    icon: string,
    title: string,
    banner: string,
    content: string[],
}

const noteSchema = new Schema<INote>({
    author: {
        type: String,
        required: true,
    },
    team: {
        type: [String]
    },
    icon: {
        type: String
    },
    title: {
        type: String,
        default: "New Note"
    },
    banner: {
        type: String
    },
    content: {
        type: [String]
    }

});


let noteModel = model<INote>('note', noteSchema);
export default noteModel;