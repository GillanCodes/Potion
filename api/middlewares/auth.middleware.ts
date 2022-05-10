import userModel from "../models/user.model";
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

export function requireAuth(req: { cookies: { auth: string; }; }, res: { status: (arg0: number) => any; }, next: () => void) {
    const token = req.cookies.auth; 
    if (token) {
        jwt.verify(token, process.env.JWT_TOKEN, async (err: any, decodedToken: string) => {
            if (err) {
                console.log(err);
            } else {
                next();
            }
        });
    } else {
        return res.status(200)
    }
}

