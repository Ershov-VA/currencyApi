const express = require('express')
import { Response, Request } from 'express';
import auth from '../auth'
const router = express.Router();
import { viewer, admin } from '../auth/roles';
import { RateController } from '../controllers';
import { IMiddleware } from '../interfaces';



router.get('/', [auth, viewer], <IMiddleware>function(req, res) {
    RateController().getTodayRate(req, res)
})

router.get('/range/:range', [auth, viewer], <IMiddleware>function(req, res) {
    RateController().getRatePerRange(req, res)
})

router.get('/date/:date', [auth, viewer], <IMiddleware>function(req, res) {
    RateController().getRateByDate(req, res)
})

router.get('/pair/:pairOne/:pairTwo', [auth, viewer], <IMiddleware>function(req, res) {
    RateController().getRateByPair(req, res)
})

router.delete('/:id', [auth, admin], <IMiddleware>function(req,res) {
    RateController().remove(req, res)
})


export default router