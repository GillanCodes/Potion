import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";
import * as fs from 'fs';
import userModel from "../../models/user.model";

export const getUser: RequestHandler = (req, res) => {

    const { id: userId } = req.params;

    if (isValidObjectId(userId)) {
        
        userModel.findById(userId, (err: any, data: any) => {
            if (err) console.log(err);
            else {
                return res.status(200).send(data);
            }
        })

    } else {

    }

}