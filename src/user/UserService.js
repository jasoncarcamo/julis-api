

const UserService = {
    getUserInfo(db, id){
        return db.select('*').from('clean_users').where({id}).first();
    }
}


module.exports = UserService;