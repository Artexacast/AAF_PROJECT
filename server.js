const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const user = require('./models/User');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = process.env.PORT || 5000;

app.post('/signup', (req,res)=>{

    const newUser = new user({
        name: req.body.name,
        email: req.body.email,
        //password storage, bcrypt(value, saltRounds ) salt is stored
        password: bcrypt.hashSync(req.body.password, 5)
    })
    console.log(req.body);
})

app.get('/', (req, res) =>{
    res.send('hello');
});

app.listen(port, (err) =>{
    if(err) return console.log(err);
    console.log('server running on port ' + port + ' available at https://localhost:'+port);
})
