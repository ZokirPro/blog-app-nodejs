import mongoose, {Schema, Document,} from 'mongoose'
import {genSalt, hash} from 'bcryptjs'

export interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

const UserSchema: any = new Schema({
    email: {
        type: String,
        unique: true
    },
    firstName: String,
    lastName: String,
    username: {
        type: String,
        unique: true
    },
    password: String
}, {
    versionKey: false,
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
})

UserSchema.pre("save", async function (next: any) {
    try {
        console.log(this.password,'before if this.password')
        if (this.password) {
            const salt: string = await genSalt(10)
            this.password = await hash(this.password, salt)
            console.log(this, 'user in user schema')
        }
    } catch (e) {
        next(e)
        throw new Error(`Password hashing error ${e}`)
    }
})

export default mongoose.model<IUser>('User', UserSchema)