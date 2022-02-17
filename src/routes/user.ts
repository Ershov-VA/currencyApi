const express = require('express')
import { Response, Request } from 'express';
import auth from '../auth'
const router = express.Router();
import { admin } from '../auth/roles';
import {UserController} from '../controllers';
import { IMiddleware } from '../interfaces';


router.get('/', [auth, admin], <IMiddleware>function(req, res){
    UserController().get(req, res)
})

router.post('/', function(req:Request, res: Response) {
    UserController().create(req, res)
})

router.delete('/:id', [ auth, admin ], <IMiddleware>function(req, res) {
    UserController().remove(req, res)
})


export default router