var express = require("express")
var path = require("path")
var fs = require("fs");
var bodyParser = require ('body-parser');

var multer = require ('multer');
const res = require("express/lib/response");
const req = require("express/lib/request");
//const { response } = require("express");
var upload = multer();
var app = express();
const port =8000;


app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname,"static")))
app.use(express.static(path.join(__dirname,"static/img")))


// for parsing application/json
app.use(bodyParser.json()); 


// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// for parsing application/xwww-
//app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded


// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

//ENDPOINTS

app.get('/index',(req,res) =>{
   // res.render('index.html');
   res.render('index.html');
   })
app.get('/',(req,res)=>{
    res.render('signup.html')
})

app.get('/login',(req,res) =>{
      res.render('login.html')

})
app.get('/caroption',(req,res)=>{
    res.render('caroption.html');
})
app.get('/contact',(req,res)=> {
    res.render('contact.html')
    
})

app.get('/about',(req,res)=>{
    res.render('about.html')
})
app.get('/caroption/pay',(req,res)=>{
    res.render('pay.html');
})
app.get('/loginFail',(req,res)=>{
    res.render('loginFail.html');
})
app.get('/signupFail',(req,res)=>{
    res.render('signupFail.html');
})
app.get('/finalpay',(req,res)=>{
    res.render('confirm.html');
    //res.render('log.html');
})
app.get('/contactUs',(req,res)=>{
    res.render('contactUs.html');
})
app.get('*',(req,res)=>{
res.render('404.html')
})

app.post('/submit',urlencodedParser, function (req, res)  {
    
     response = {
        email : req.body.email,
        password : req.body.password,
        address : req.body.address ,
        address2 : req.body.address2 ,
        city : req.body.city ,
        state : req.body.state ,
        zip : req.body.zip ,
        subject : req.body.subject

    }
   // console.log(response);
    file='form'+response.email+'.txt';
    fs.writeFileSync(file,JSON.stringify(response));
    res.redirect('/contactUs');
   // res.end(JSON.stringify(response));
    })

    app.post('/signup',urlencodedParser,function(req,res){
        signup = {
            email : req.body.email,
            password : req.body.psw ,
            rep_password : req.body.pswrepeat,
            remember : req.body.remember 

        }
         
        if(signup.password==signup.rep_password){
        file=signup.email+'.txt';
        fs.writeFileSync(file,JSON.stringify(signup));
        res.redirect('/index');
        }
        else {  res.redirect('/signupFail');
        }
    })
    app.post('/login',urlencodedParser, function(req,res){
        login = {
            uname : req.body.uname,
            password : req.body.psw 
        }
          file=login.uname+'.txt';
        var data = (JSON.parse(fs.readFileSync(file)));
          if(data.email==login.uname && data.password==login.password)
          {
            res.redirect('/index');
          }
          else res.redirect('/loginFail');
       /* console.log(login);
        res.end(JSON.stringify(login));*/
    } )
    app.post('/booking',urlencodedParser,function(req,res){
        booking = {
             pickup : req.body.pickup ,
             drop : req.body.drop ,
             time : req.body.time 
        }
        res.redirect('/caroption')
       /* console.log(booking);
        res.end(JSON.stringify(booking));*/
    })
    app.post('/finalpay',urlencodedParser,function(req,res){
        res.redirect('/finalPay')
    })




app.listen(port, ()=>{
    console.log("This app is running")
})