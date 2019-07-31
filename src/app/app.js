require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRouter = require('../authorize/authRouter');
const regRouter = require('../registration/regRouter');
const userRouter = require('../user/userRouter');
const verifyRouter = require('../verify-account/verifyRouter');
const {NODE_ENV} = require('../../config'); 
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganSetting));
app.use(cors());
app.use(helmet());
app.use('/api', authRouter);
app.use('/api', regRouter);
app.use('/api', verifyRouter);
app.use('/user', userRouter);

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
      response = { error: 'Server error' }
    } else {
      
      response = { error: error.message, object: error }
    }
    console.error(error)
    res.status(500).json(response)
  })

  app.get('/', (req, res)=>{
    res.send('Hello')
  })


module.exports = app;