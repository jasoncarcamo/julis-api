const jwt = require('jsonwebtoken');

const VerifyService = {
    isVerified(db, id){
        return db.select('verified').from('clean_users').where({id}).first()
    },
    verifyId(db, id){
        return db.select('verified').from('clean_users').where({id}).update({ verified: true})
    },
    verifyJwt(token){
        return jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256'],
        });
    }
}

module.exports = VerifyService;