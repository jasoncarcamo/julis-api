const knex = require('knex')
const jwt  = require('jsonwebtoken'); 
const app = require('../src/app/app');
const helpers = require('./test-helpers');

describe('Register endpoint', ()=>{
    let db;

    before('make knex instance', ()=>{
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db);
    })

    after('disconnect from db', ()=>{
        db.destroy();
    })

    before('cleanup', ()=>{
        helpers.cleanTables(db)
    })

    afterEach('cleanup',()=>{
        helpers.cleanTables(db);
    })
    
    describe('POST /api/register', ()=>{
        it('should return status 201', ()=>{

            const newRegister = {
            first_name: "name", 
            last_name: "lastname", 
            email: "email@yahoo.com", 
            password: "Carcamo11!",
            home_number: "111111111",  
            mobile_number: "6317050168", 
            address: "address", 
            city: "city", 
            state_region: "state", 
            zipcode: "1111111", 
            id: "kj12iui12uuid"};

            return supertest(app)
                .post('/api/register')
                .send(newRegister)
                .expect(201)
                
        })
    })
})