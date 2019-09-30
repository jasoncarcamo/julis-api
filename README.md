# julis clieaning service API

## `npm install`

Install the project's dependencies

## `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:<choice of PORT>] to use on postman in development mode.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## `npm test`

Launches the test runner in the interactive watch mode.<br/>

## API url: `https://fathomless-eyrie-65525.herokuapp.com`
For demo purposes you can use this account:
- Mobile number: 11
- Password: Password11! (case-sensitive)

## Summary
The starting template used to create a full stack website for a cleaning company. Features include endpoints for creating user accounts and complete control of creating, editing, and deleting services.

## /api/register - Registers an account

- POST /api/register   Create a new user
- DELETE /api/delete/:id   Deletes a specific user by id

## /api/login - Logs in a user and returns a authorization token
- POST /api/login  Create and returns a new authorizaion token for user successful log in

## /user/service - Service endpoints
You will need a authorization token for the next few endpoints. You should have recieved a authorization token when you loggined in and automatically saved in your local storage or you can use the above account for demo purposes.

- GET /user/service   Returns specific user service
- POST /user/service   Create a new service request
- PATCH /user/service   Update a specific service
- DELETE /user/service   Delete a specific service

## Built with
- PostgreSQL
- Knex.js
- Helmet.js
- Nodemon.js
- Cors.js
- RESTful principles
- TDD with mocha, Jest, and Enzyme
