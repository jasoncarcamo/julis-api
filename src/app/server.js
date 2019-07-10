require('dotenv').config();
const app = require('./app');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

app.set('db', db)


app.listen(process.env.PORT, ()=>{
    console.log('Server running on http://localhost:8000')
})