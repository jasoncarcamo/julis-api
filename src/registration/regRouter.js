const express = require('express');
const regRouter = express.Router();
const RegService = require('./RegService');
const AuthService = require('../authorize/AuthService');

regRouter.use(express.json());
regRouter.use(express.urlencoded({ extended: true}));


regRouter
    .post('/register', (req, res, next) => {
        const {first_name, last_name, email, password, home_number,  mobile_number, address, city, state_region, zipcode, id} = req.body;

        const newUser = {first_name, last_name, email, password, home_number,  mobile_number, address, city, state_region, zipcode, id};

        for(const [key, value] of Object.entries(newUser)){
            if(value == null){
                return res.status(400).json({ error: `Missing '${key}' in request body`});
            };
        }

        const passwordError = RegService.validatePassword(newUser.password);

        if(passwordError){
            return res.status(400).json({ error: passwordError});
        };

        RegService.getUser(req.app.get('db'), newUser)
            .then( hasUser => {
                if(hasUser){
                    return res.status(400).json({ error: 'You seem to have an account with us already'});
                };

                return RegService.hashPassword(newUser.password)
                    .then( hashedPassword => {
                        newUser.password = hashedPassword;

                        return RegService.insertUser( req.app.get('db'), newUser)
                            .then( user => {

                                const sub = newUser.mobile_number;
                                const payload = { user: newUser.id};
                                
                                const token = AuthService.createJwt(sub, payload);
                                
                                return res.status(201).json(RegService.serializaUser(user));
                            });
                    })
            })
            .catch(next);
    })
    .delete('/delete/:id', (req, res, next)=>{
        RegService.deleteuser(req.app.get('db'), req.params.id).then(data => {
            res.send('Success')
        });
    })



module.exports = regRouter;