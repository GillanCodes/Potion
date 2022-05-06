import userModel from "../models/user.model";
import { ObjectId } from "mongodb";

let jwt = require('jsonwebtoken');

module.exports.checkUser  = async (req: { cookies: { auth: any; }; }, res: { locals: { user: any; }; }, next: () => void) => {

    let token = req.cookies.auth;
    if (token) {

        jwt.verify(token, process.env.JWT_TOKEN, async(err: any, decodedToken: { id: any; }) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await userModel.findById(decodedToken.id).select("-password -email");
                res.locals.user = user;
                next();
            }
        })

    } else {
        res.locals.user = null;
        next();
    }
}

// module.exports.requireAuth = (req, res, next) => {
//     const token = req.cookies.revtonbac_user; // On recup le token
//     if (token) {
//         jwt.verify(token, process.env.JWT_TOKEN, async (err, decodedToken) => { // on essaye de le decoder
//             if (err) { //Si on y arrive pas
//                 console.log(err);
//             } else { // sinon
//                 next();
//             }
//         });
//     } else {
//         return res.status(200)
//     }
// }

// module.exports.requireAuthDashboard = (req, res, next) => {
//     const token = req.cookies.revtonbac_dashboard; // On recup le token
//     if (token) {
//         jwt.verify(token, process.env.JWT_TOKEN, async (err, decodedToken) => { // on essaye de le decoder
//             if (err) { //Si on y arrive pas
//                 console.log(err);
//             } else { // sinon
//                 next();
//             }
//         });
//     } else {
//         return res.status(200)
//     }
// }