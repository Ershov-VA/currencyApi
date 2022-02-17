import * as bcrypt from 'bcrypt'
import { Request, Response } from "express";
import { HTTP, TYPES } from "../interfaces/enum/http";
import { RemoveId } from "../interfaces";
import { UserModel } from "../model";
import { LogController } from '.';

const UserController = () => ({
    async getByName( username: string ) {
        try {
            const item = await UserModel.findOne({username})     
            
            if (item ) return item
            return false
        } catch(error) {
            console.log(error);            
            return []
        }
    },
    async get(req:Request, res:Response) {
        try {
            LogController().logging(req.connection,  TYPES.GET)
            const item = await UserModel.find()
            return res.status(HTTP.SUCCESS)
                    .json(item)
        } catch(error) {
            return res.status(HTTP.BAD_REQUEST)
                    .send(error)
        }
    },
    async remove(  req: Request, res:Response) {
        const { params}:any = req
        const { id } = params as RemoveId
        try {
            LogController().logging(req.connection,  TYPES.DELETE)
            await UserModel.findByIdAndDelete(id)
            return res.status(HTTP.SUCCESS)
                .json({
                    status: 'ok'
                })
        } catch(error) {
            res.status(HTTP.BAD_REQUEST)
                .send(error)
        }
    },
    async create( req:Request, res:Response ) {
        try {           
            const { body }  = req
            LogController().logging(req.connection, TYPES.POST)
            const item = new UserModel({...body, password: bcrypt.hashSync(body.password, 7), roles: ['admin', 'viewer']})
            const newItem = await item.save()
            return res.status(HTTP.CREATED)
                    .json(newItem)

        } catch(error) {
            return res.status(HTTP.BAD_REQUEST)
                    .send(error)
        }
    }
})

export default UserController