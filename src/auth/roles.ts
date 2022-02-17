import { Response, NextFunction } from "express";
import { AUTH } from "../interfaces/enum/auth";
import { HTTP } from "../interfaces/enum/http";
import { UserRequest } from "../interfaces";

export function admin(req:UserRequest, res:Response, next:NextFunction) {
    if (!req.user.roles.includes("admin")) return res.status(HTTP.ACCESS_DENIED).send({status: AUTH.ACCESS_DENIED})
    next()
}

export function viewer(req:UserRequest, res:Response, next:NextFunction) {
    if (!req.user.roles.includes("viewer")) return res.status(HTTP.ACCESS_DENIED).send({status: AUTH.ACCESS_DENIED})
    next()    
}