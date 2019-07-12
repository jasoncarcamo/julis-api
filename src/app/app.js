const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRouter = require('../authorize/authRouter');
const regRouter = require('../registration/regRouter');
const userRouter = require('../user/userRouter');
const verifyRouter = require('../verify-account/verifyRoute');


app.use(morgan('common'));
app.use(cors());
app.use(helmet());
app.use('/api', authRouter);
app.use('/api', regRouter);
app.use('/api', verifyRouter);
app.use('/user', userRouter);


app.get('/', (req, res, next)=> {
    res.send('Success!')
})

module.exports = app;