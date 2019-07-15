const express = require('express');
const requestServiceRouter = express.Router();
const RequestService = require('./RequestService')


requestServiceRouter
    .route('/service')
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res, next)=>{
        res.json({hello: 'Hello'});
    })
    .post((req, res, next)=>{
        const {service_type, comments, day, best_time_reached, price, user_id} = req.body
        
        RequestService.newService(req.app.get('db'), req.body);

        res.json(req.body);
    })



module.exports = requestServiceRouter;