const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




const AuthService = {
    getUserWithUserName(db, mobile_number){
        return db.select('*').from('clean_users').where({mobile_number}).first()
    },
    comparePassword(password, hash){
        return bcrypt.compare(password, hash);
    },
    createJwt(subject, payload){
        return jwt.sign(payload, process.env.JWT_SECRET, {
            subject,
            algorithm: 'HS256'
        });
    },
    verifyJwt(token){
        return jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256'],
        });
    },
    parseBasicToken(toekn){
        return Buffer.from(toekn, 'base64').toString().split(':')
    }

}


module.exports = AuthService;