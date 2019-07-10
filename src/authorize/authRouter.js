const express = require('express');
const authRouter = express.Router();
const AuthService = require('./AuthService');

authRouter.use(express.json());
authRouter.use(express.urlencoded({ extended: true}));

authRouter
.get('/:id', (req, res, next)=>{
    const {id} = req.params;
    AuthService.getUserWithUserName(req.app.get('db'), id).then( data => res.json(data));
})
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
                    return res.status(400).json({ error: 'Incorrect user_name or password'});
                };

                AuthService.comparePassword(user.password, dbUser.password)
                    .then(compareMatch => {

                        if(!compareMatch){
                            return res.status(400).json({ error: 'Incorrect user_name or password'});
                        };

                        const sub = dbUser.mobile_number;
                        const payload = { user: dbUser.id};
                        
                        res.send({
                            authToken: AuthService.createJwt(sub, payload),
                            dbUser: dbUser.id
                        });
                    })
            })
            .catch(next)

    })





module.exports = authRouter;

