const knex = require('knex');
const app = require('../src/app/app');
const jwt = require('jsonwebtoken');
const helpers = require('./test-helpers');

describe('New service endpoint', ()=>{

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
        helpers.cleanTables(db)
    })

    afterEach('cleanup',()=>{
        helpers.cleanTables(db);
    })
    

    describe('POST /user/service', ()=>{
        const user = {
            first_name: "name",
            last_name: "lastname", 
            email: "email@yahoo.com", 
            password: "Carcamo11!",
            home_number: "111111111",  
            mobile_number: "6317040168", 
            address: "address", 
            city: "city", 
            state_region: "state", 
            zipcode: "1111111", 
            id: "kj12iui12uuid"
        }

        beforeEach('insert user', ()=>{
            helpers.seedUsers(db, user)
        })

        it('should respond 201', ()=>{
            

            
            const newService ={
                service_type: 'Windows', comments: 'Hello', day: 'Monday', best_time_reached: '8:00AM', 
                price: '$90:00', user_id: 'kj12iui12uuid', date_modified: new Date()
            };

            return supertest(app)
                .post('/user/service')
                .set('authorization', helpers.makeAuthHeader(user))
                .send(newService)
                .expect(201);
        })
    } )
})