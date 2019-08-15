const express = require('express');
const requestServiceRouter = express.Router();
const RequestService = require('./RequestService')


requestServiceRouter
    .route('/service')
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get(express.json(), (req, res, next)=>{
        const {id} = req.query;
        RequestService.getServiceByServiceId(req.app.get('db'), id)
            .then( response => {
                if(!response){
                    return res.status(400).json({ error: 'No service found'})
                }
                res.json({service: response, id}
            )});
        
        
    })
    .post((req, res, next)=>{
        const {service_type, comments, day, best_time_reached, price, date_modified} = req.body
        const user_id = req.user.id

        const newService = {service_type, comments, day, best_time_reached, price, user_id, date_modified
        }
        
        RequestService.newService(req.app.get('db'), newService);

        res.status(201).json(req.body);
    })
    .patch((req, res, next)=>{

        const {service_type, comments, day, price, id,date_modified, best_time_reached} = req.body;
        
        const newService = {service_type, comments, day, price, id, date_modified, best_time_reached};

        RequestService.updateService(req.app.get('db'), newService)
            .then(data => res.status(200).json({success: 'Service has been updated'}))
        
    })
    .delete((req, res, next)=>{
        
        RequestService.deleteService(req.app.get('db'), req.body.id).then( data => res.json({success: 'Service canceled'}))
    })



module.exports = requestServiceRouter;