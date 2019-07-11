const bcrypt = require('bcryptjs');
const xss = require('xss');

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const RegService = {
    getUser(db, {mobile_number}){
      return db.select('*').from('clean_users').where({mobile_number}).first();
  },
    insertUser(db, newUser){
        return db.insert(newUser).into('clean_users').returning('*').then(([user])=> user);
    },
    validatePassword(password) {
        if (password.length < 8) {
          return 'Password be longer than 8 characters'
        }
        if (password.length > 72) {
          return 'Password be less than 72 characters'
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
          return 'Password must not start or end with empty spaces'
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
          return 'Password must contain one upper case, lower case, number and special character'
        }
        return null
      },
      hashPassword(password){
          return bcrypt.hash(password, 12);
      },
      serializaUser(user){
          return {
              id: user.id,
              authToken: user.authToken,
              first_name: xss(user.user_name),
              last_name: xss(user.last_name),
              date_created: new Date(user.date_created)
          }
      },
      deleteuser(db, id){
          return db.delete().from('clean_users').where({id});
      }

}

module.exports = RegService;