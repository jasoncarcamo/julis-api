const express = require('express');
const verifyRouter = express.Router();
const VerifyService = require('./VerifyService');
const {requireAuth} = require('../middleware/jwt-auth');
const transporter = require('../nodemailer/nodemailer');


verifyRouter
    .route('/verify')
    .all(requireAuth)
    .all(express.json())
    .post((req, res, next) => {
        const {email} = req.body
        const mailOptions = {
            from : 'jasoncarcamo30@yahoo.com',
            to: email,
            subject: 'Please verify your email',
            html: `<main><a href="http://localhost:3000/api${req.url}">http://localhost:3000/api${req.url}</a></main>`
        }
        
        transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.log(error);
            } else{
                console.log(info.response);
            }
        })
    })
    .put((req, res, next)=>{
        if(req.user){
            VerifyService.isVerified(req.app.get('db'), req.user.id)
                .then(resdata => {
                    if(resdata.verified !== true){
                        VerifyService.verifyId(req.app.get('db'), req.user.id)
                            .then(  data => res.status(200).json({verified: true}))
                    } else{
                        return res.status(400).json({ error: 'Account is already verified'})
                    }
                })
        } else{
            return res.status(400).json({ error: 'Bad request'})
        }
    })



module.exports = verifyRouter;