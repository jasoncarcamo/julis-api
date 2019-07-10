const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRouter = require('../authorize/authRouter');
const regRouter = require('../registration/regRouter');



app.use(morgan('common'));
app.use(cors());
app.use(helmet());
app.use('/api', authRouter);
app.use('/api', regRouter);

app.get('/', (req, res, next)=> {
    res.send('Success!')
})

module.exports = app;