if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app  = express();


mongoose
    .connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => {
        console.log('connected to DB');
        app.listen(process.env.PORT || 3000,(req,res) => {
            console.log("app running port 3000");
        });
    })
    .catch((error) => {
        console.log(error);
    });


app.set('view engine','ejs');
app.set('views',__dirname + '/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({limit:'10mb', extended: false}));

app.use(express.static('public'));



app.use('/', indexRouter);
app.use('/authors', authorRouter);

