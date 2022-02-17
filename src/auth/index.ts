import * as jwt from 'jsonwebtoken'
import { AUTH } from '../interfaces/enum/auth'
import { HTTP } from '../interfaces/enum/http'
import { Response, NextFunction} from 'express'
import { Query, UserRequest } from '../interfaces'



export default function (req: UserRequest, res:Response, next: NextFunction) {

    const {token} = req.query as Query
    if (!token) return res.status(HTTP.ACCESS_DENIED)
                        .send({ status: AUTH.ACCESS_DENIED })
    
    try {
        const decoded = jwt.verify( token, 'jwtPrivateKey')        
        req.user = decoded

    } catch(error) {
        console.log(error)
        return res.status(HTTP.ACCESS_DENIED)
                .send({status: AUTH.TOKEN_EXPIRED})
    }    
    next()
}
