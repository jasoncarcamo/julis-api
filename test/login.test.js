
require('dotenv').config();
const knex = require('knex');
const app = require('../src/app/app');
const bcrypt = require('bcryptjs');
const helpers = require('./test-helpers');

describe('Auth endpoint', ()=>{

    let db;

    before('make knex instance', ()=>{
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    })

    after('disconnect from db', ()=> db.destroy());

    before('cleanup', ()=>{
        return helpers.cleanTables(db)
    })

    afterEach('cleanup',()=>{
        return helpers.cleanTables(db);
    })
    

    describe('POST /api/login', ()=>{
        
        let user = {
            first_name: "name",
            last_name: "lastname", 
            email: "email@yahoo.com", 
            password: '',
            home_number: "111111111",  
            mobile_number: 6317040168, 
            address: "address", 
            city: "city", 
            state_region: "state", 
            zipcode: "1111111", 
            id: "kj12iui12uuid"
        }

        bcrypt.hash("Carcamo11!", 12).then( hashedPassword => 
            {
                user.password = hashedPassword
            });
        
        beforeEach('insert user', ()=>{
            return helpers.cleanTables(db).then(seed=> helpers.seedUsers(db, user));
        })

        it('should respond 200', ()=>{

            const loginUser = {
                mobile_number: 6317040168,
                password: "Carcamo11!"
            }
            return supertest(app)
                .post('/api/login')
                .send(loginUser)
                .expect(200);
        })
    })
})