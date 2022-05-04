import { Schema, model, Document, Model } from "mongoose";
import { compare, genSalt, hash } from "bcrypt";
import isEmail from "validator/lib/isEmail";

export interface IUser extends Document {
    username: string,
    password: string,
    email: string,
    picture: {
        url: string,
    }
}

export interface UserModel extends Model<IUser> {
    login(log: string, password: string): Promise<Document>
}

const userSchema = new Schema<IUser>({
    username: {type: String, required: true, unique: true, maxlength: 25, minlength: 2},
    email: {type: String, required: true, validate: isEmail},
    password: {type: String, required: true, minlength:5, maxlength: 255},
    picture: {
        type: {
            url: {type: String, default: "/default.png"}
        }
    }
});

userSchema.pre<IUser>("save", async function(this: IUser, next) {
    const salt: string = await genSalt();
    this.password = await hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (log:string, password:string) {
    var user;
    
    if (isEmail(log)){
        user = await userModel.findOne({email: log})
    } else {
        user = await userModel.findOne({username: log})
    }

    if (user) {
        const auth = await compare(password, user.password);
        if (auth) {
            return user
        } else {
            throw Error('incorrect logins !')
        }
    }
} 

const userModel = model<IUser, UserModel>('User', userSchema);
export default userModel;
