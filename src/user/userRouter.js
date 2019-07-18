const express = require('express');
const userRouter = express.Router();
const UserService = require('./UserService');
const {requireAuth} = require('../middleware/jwt-auth');
const requestServiceRouter = require('./requestServiceRoute/requestServiceRouter');


userRouter.use(requireAuth, requestServiceRouter);



userRouter
    .route('/')
    .all(requireAuth)
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res, next)=>{
        const userId = req.user.id;

        UserService.getUserInfo(req.app.get('db'), userId).then( resData => {
            if(resData){
                res.json({
                    first_name: resData.first_name, 
                    last_name: resData.last_name,
                    email: resData.email, 
                    home_number: resData.home_number,
                    mobile_number: resData.mobile_number,
                    date_created: resData.date_created,
                    date_modified: resData.date_modified,
                    address: resData.address,
                    city: resData.city,
                    state_region: resData.state_region,
                    zipcode: resData.zipcode,
                    verified: resData.verified,
                })  
            } else{
                return res.status(400).json({ error: 'Account does not exist'})
            }}
        );
    });




module.exports = userRouter;