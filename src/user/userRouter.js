const express = require('express');
const userRouter = express.Router();
const UserService = require('./UserService');



userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true}));



userRouter
    .get('/:userId', (req, res, next)=>{
        const {userId} = req.params;

        UserService.getUserInfo(req.app.get('db'), userId).then( resData => {
            res.send({
                first_name: resData.first_name, 
                last_name: resData.last_name, 
                best_days_reach: resData.best_days_reached,
                best_time_reach: resData.best_time_reached,
                email: resData.email, 
                home_number: resData.home_number,
                mobile_number: resData.mobile_number,
                date_created: resData.date_created,
                date_modified: resData.date_modified,
                address: resData.address,
                city: resData.city,
                state_region: resData.state_region,
                zipcode: resData.zipcode,
                message: resData.message,
                verified: resData.verified,
        })});
    })




module.exports = userRouter;