

const VerifyService = {
    isVerified(db, id){
        return db.select('verified').from('users').where({id}).first()
    },
    verifyId(db, id){
        return db.select('verified').from('users').where({id}).update({ verified: true})
    }
}

module.exports = VerifyService;