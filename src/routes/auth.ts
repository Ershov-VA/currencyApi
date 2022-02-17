import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { tHTTP, tUSER } from '../interfaces/routes.dto'
import {AUTH, ROLES} from '../interfaces/enum/auth'
import { LogController, UserController } from '../controllers'
import { HTTP, TYPES } from '../interfaces/enum/http'

const router = express.Router()

router.post('/', async function (req, res) {

    const {username, password}:tUSER = req.body

    const user = await UserController().getByName(username)    

    if(!user) {
        res.status(HTTP.ACCESS_DENIED).send({
            status: AUTH.ERROR,
            error: AUTH.WRONG_USERNAME
        })
        throw new Error(AUTH.WRONG_USERNAME)
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
        res.status(HTTP.ACCESS_DENIED).send({
            status: AUTH.ERROR,
            error: AUTH.WRONG_USERNAME
        })
        throw new Error(AUTH.WRONG_PASSWORD)
    }

    LogController().logging(req.connection,  TYPES.POST)

    const token = jwt.sign({
        id:user._id,
        roles: user.roles
    }, "jwtPrivateKey", {expiresIn: "1h"})
    

    res.status(HTTP.ACCEPTED).send({
        status: AUTH.SUCCESS,
        token
    })
} )


export default router