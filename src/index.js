const express = require("express")
const app=express();
const port =process.env.PORT || 4000
const path=require("path");
const RegisteredUser = require("./models/model");
require("./db/conn")

app.use(express.json())
app.use(express.urlencoded({extended:false}));
//this is used to encode the sign up data 

const static_path=path.join(__dirname,"../public")
app.use(express.static(static_path))
app.set("view engine","hbs")

app.get("/",(req ,res)=>{
    //rendring the index page
res.render("index")
})

app.post("/register",(req ,res)=>{
    let userName=req.body.username
    let makeUserName=(req.body.firstName+req.body.lastName).toLowerCase()
 const dataObj={
    "firstname":req.body.firstName,
    "lastname":req.body.lastName,
    "Username":userName ||makeUserName,
    "phone":req.body.phone,
    "email":req.body.email,
    "passward":req.body.password,
 }

const data =new RegisteredUser(dataObj)
data.save()
.then(()=>{
res.send("sucessfully registered")
})
.catch((e)=>{
res.send(e)
})
})

app.post('/signIn',async(req,res)=>{
    const signInUsername=req.body.signinUsername
    const signInPassword=req.body.signinPassword

    try {
      const answer=  await RegisteredUser.findOne({
        $or: [
            { email: signInUsername },
            { Username: signInUsername }
          ]
      })
      
      let ServerUserName=  (answer.firstname+answer.lastname).toLowerCase() 
        let ServerUserEmail=  answer.email 
        if ((ServerUserName ==signInUsername || ServerUserEmail ==signInUsername) && answer.passward==signInPassword ) {
            res.send('Sucessfull login' )
        } else {
            res.send('userName or pasward is incorrect')            
        }
    } catch (error) {
        res.send("Record Not found")
    }

})

app.listen(port,()=>{
    console.log(`Server is runing on thee server ${port}`);
})