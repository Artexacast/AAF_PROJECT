const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Document = require('./models/Document');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb+srv://Artex:admin@testcluster-6u9qi.azure.mongodb.net/test?retryWrites=true&w=majority')

let url  = mongoose.connect('mongodb+srv://Artex:admin@testcluster-6u9qi.azure.mongodb.net/test?retryWrites=true&w=majority');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = process.env.PORT || 5000;

app.post('/signup', (req,res)=>{
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    newUser.save(err =>{
        if(err){
            return res.status(400).json({
                title:'error',
                error:'email in use'
            })
        }
            return res.status(200).json({
                title:'success'
        })
    })
})

app.post('/login', (req, res)=>{
    //emails are unique, so single email find will suffice
 
    User.findOne({email: req.body.email}, (err, user) => {
        if(err){
            return res.status(500).json({
                title:'error',
                error:err
            })
        }
        //no user email is found
        if(!user){
            return res.status(401).json({
                title:'Unauthorized: User not found',
                error:'User not found'
            })
        }
        //incorrect password
        if(!bcrypt.compareSync(req.body.password, user.password)){
          //  console.log(req.body.password, user.password);
    
            return res.status(401).json({
                title:'Unauthorized: User not found',
                error:'Incorrect password'
            })
        }

        //if successful login
        let token = jwt.sign({userId: user._id}, 'eMXdP7P5jY58zbeq');
        return res.status(200).json({
            title: 'Login Success',
            token: token
        })
    })
})

app.get('/user', (req, res)=>{
    let token = req.headers.token;
    jwt.verify(token, 'eMXdP7P5jY58zbeq', (err, decoded) =>{
        if(err) return res.status(401).json({
            title:'Unauthorized'
        })
      //  console.log(decoded);
        User.findOne({_id: decoded.userId}, (err, user)=>{
            if(err) return console.log(err)
            return res.status(200).json({
                title: 'user info',
                user:{
                    email: user.email,
                    name: user.name
                }
            })
        })
    })
})

app.post('/deletedocument', (req, res)=>{
    console.log(req.body);
    Document.deleteOne(req.body,function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
      });
})

app.get('/editdocument', (req, res)=>{
    Document.find({}, function(err, docs){
        let docMap = {};
        docs.forEach(function(doc){
            docMap[doc] = doc;
        });
      //  res.send(docMap);
      console.log(docs);

         return res.status(200).json({
                title: 'Documents',
                docs
               
            })
    })
})


app.post('/newdocument', (req, res)=>{
   // console.log(req.body);
         const newDocument = new Document({
         id:req.body.id,
         version: req.body.version,
         date: req.body.date,
         author: req.body.author,
         checkedout: req.body.checkedout,
         checkedoutby: req.body.checkedoutby,
         doctitle: req.body.title,
         creator: req.body.creator,
         optional: req.body.optional
    })
    newDocument.save( err =>{
        if(err){
            return res.status(400).json({
                title:'error',
                error:'email in use'
            })
        }
            return res.status(200).json({
                title:'success'
        })
    })
})

app.get('/', (req, res) =>{
    res.send('hello');
});

app.listen(port, (err) =>{
    if(err) return console.log(err);
    console.log('server running on port ' + port + ' available at https://localhost:'+port);
})
