import {Request, Response, NextFunction} from "express";
import User from '../models/User'
export default class {
    async register(req:Request,res:Response ){
        try{
            const data=req.body

            const existingUser=await User.findOne({email:data.email})

            if(existingUser){
                return res.status(400).send({msg:"USER_EXIST"})
            }
            console.log(data,'before user create method')
            const user= await User.create(data)
            res.status(201).send({msg:"USER_CREATED",data:user} )
            console.log(user,'user controller register')
        }
        catch (e){
            res.status(500).send({msg:"SERVER_ERROR"})
            throw new Error(`User controller register error ${e}`)
        }
    }
}
