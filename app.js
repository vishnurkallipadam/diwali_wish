const express = require('express');
const app = new express(); 
const port = process.env.PORT || 9000;
const nodemailer = require('nodemailer');
const wishData = require('./src/model/wishData')
app.use(express.static('./public'));
app.use(express.json()); 

app.use(express.urlencoded({extended:true})); 
app.set('view engine','ejs'); 
app.set('views','./src/views'); 




app.get('/',function(req,res){
    res.render("index",
    {
        title: 'Happy Diwali'
    });
});
app.get('/home/:id',function(req,res){

   
    let id = req.params.id;
    console.log(id);
    wishData.findOne({_id:id},function(err,data){
        console.log(err);

        console.log(data);
            
        res.render("home",{name:data.rname})
       

    })

});

app.post('/mail',function(req,res){
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'creationzv@gmail.com',
            pass: 'Vishnu@123'
        }
    });
       console.log("started mail");
        let name = req.body.name;
        let email = req.body.email;
        let rname = req.body.rname;
        console.log(req.body);
        let user={
            uname:req.body.name,
            email:email,
            rname:rname
        }
        var wish=wishData(user);
        wish.save().then((response)=>{

            let mailDetails = {
                from: 'creationzv@gmail.com',
                to: email,
                subject: 'Diwali surprise from ' + name,
                text: 'you have a surprise gift from ' + name +' please click on link https://wishfordiwali.herokuapp.com/home/'+response._id,
            };
            console.log(mailDetails);
            mailTransporter.sendMail(mailDetails, function(err, data) {
                
                if(err) {
                    console.log(err);
                    res.json({success: false});
                    console.log('Error Occurs! Bad Request');
                } else {
                    res.json({success: true});
                    console.log('Email sent successfully');
                }
            });


        })
    
    });



app.listen(port,()=>{console.log("Server Ready at" + port)});

 








