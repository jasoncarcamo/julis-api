const express = require('express');
const authRouter = express.Router();
const AuthService = require('./AuthService');

authRouter.use(express.json());
authRouter.use(express.urlencoded({ extended: true}));

authRouter    
    .post('/login', (req, res, next)=>{

        const {mobile_number, password} = req.body;

        const user = { mobile_number, password};

        for( const [key, value] of Object.entries(user)){
            if(value == null){
                return res.status(400).json({ error: `Missing '${key}' in request body`})
            }
        }

        AuthService.getUserWithUserName(req.app.get('db'), user.mobile_number)
            .then(dbUser => {
                
                if(!dbUser){
                    return res.status(400).json({ error: 'No account found, why not signing up above?'});
                };

                AuthService.comparePassword(user.password, dbUser.password)
                    .then(compareMatch => {

                        if(!compareMatch){
                            return res.status(400).json({ error: 'Incorrect password'});
                        };

                        const sub = dbUser.mobile_number;
                        const payload = { user: dbUser.id};
                        
                        res.send({
                            authToken: AuthService.createJwt(sub, payload),
                            id: dbUser.id,
                            verified: dbUser.verified,
                            email: dbUser.email
                        });
                    })
            })
            .catch(next)

    })





module.exports = authRouter;

