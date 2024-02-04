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
const static_ecomerance=path.join(__dirname,"../ecomrance site.html")
const static_SucessfulySignUP=path.join(__dirname,"../sucessfully.html")
const static_BackToSign=path.join(__dirname,"../redirectSignIn.html")
const static_IncorrectSignIN=path.join(__dirname,"../IncorrectUser.html")
app.use(express.static(static_path))
app.use(express.static(static_ecomerance))
app.use(express.static(static_SucessfulySignUP))
app.use(express.static(static_BackToSign))
app.use(express.static(static_IncorrectSignIN))
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
    "image":req.body.image,
    "baseImage":req.body.baseImage
 }

const data =new RegisteredUser(dataObj)
data.save()
.then(()=>{
res.sendFile(static_SucessfulySignUP)
// res.send("sucessfully registered")
// res.send("sucessfully registered")
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
            // res.send('Sucessfull login' )
            // res.sendFile(static_ecomerance)
            res.send(`
            
            
            <!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FONTS -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap"
        rel="stylesheet">
    <script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script>
</head>

<body class="font-[Poppins] bg-gray-300 h-screen">
    <header class="bg-white">
        <nav class="flex justify-between items-center w-[92%]  mx-auto">
            <div>
                <img class="w-16 cursor-pointer" src="https://global-uploads.webflow.com/5e157548d6f7910beea4e2d6/62dea3499594dc2982ac87e2_general-store-free-logo-maker-p-500.png" alt="..."/>
            </div>
            <div
                class="nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto  w-full flex items-center px-5">
                <ul class="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                    <li>
                        <a class=" hover:bg-green-600 rounded-full " href="#">Products</a>
                    </li>
                    <li>
                        <a class="hover:bg-green-600 rounded-full" href="#">Kitchen</a>
                    </li>
                    <li>
                        <a class="hover:bg-green-600 rounded-full" href="#">Deals</a>
                    </li>
                    <li>
                        <a class="hover:bg-green-600 rounded-full" href="#">Fashion & Beauty</a>
                    </li>
                    <li>
                        <a class="hover:bg-green-600 rounded-full" href="#">Tearms & condations </a>
                    </li>
                </ul>
            </div>
            <div class="flex items-center gap-6">
            
            <div class=" items-center justify-center ">
            <img src=${answer.baseImage} alt="Profile Image" class="rounded-full h-16 w-16 object-cover">
            </div>

                <button class="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">${answer.firstname} </button>


                <ion-icon onclick="onToggleMenu(this)" name="menu" class="text-3xl cursor-pointer md:hidden"></ion-icon>
            </div>
    </header>



<div class=" grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8 pt-8 pr-6 pl-6 pb-6 text-center">
  <!-- this is product one -->
  <div class="bg-gray-300 rounded-2xl cursor-pointer shadow-lg overflow-hidden ">
    <div class="overflow-hidden ">
    <img class="rounded-t-lg hover:scale-110 duration-1000 " src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="..."/>
  </div>
  <h1 style="font-size: 1.4em;">Black Fujifilm Dslr Camera
  Sony 2345 Jet</h1>
  

  </div>

  <!-- this is product two -->
  <div class="bg-gray-300 rounded-2xl cursor-pointer shadow-lg  overflow-hidden ">
    <div class="overflow-hidden ">
    <img class="rounded-t-lg hover:scale-110 duration-1000" src="https://images.pexels.com/photos/6685889/pexels-photo-6685889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="...">
    </div>
  <h1 style="font-size: 1.4em;">New Deal Sony 3410 Dslr with Free memory Card</h1>
  </div>
  <!-- this is product three -->
  <div class="bg-gray-300 rounded-2xl cursor-pointer shadow-lg  overflow-hidden">
    <div class="overflow-hidden ">
    <img class="rounded-t-lg hover:scale-110 duration-1000" src="https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="...">
    </div>
  <h1 style="font-size: 1.4em;">Mac Book With Free Iphone</h1>
  </div>
  <!-- this is product four -->
  <div class="bg-gray-300 rounded-2xl cursor-pointer shadow-lg overflow-hidden">
    <div class="overflow-hidden ">
    <img class="rounded-t-lg hover:scale-110 duration-1000" src="https://images.pexels.com/photos/380954/pexels-photo-380954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="...">
    </div>
  <h1 style="font-size: 1.4em;">All Flour Ice-Cream Buy now$</h1>
  </div>
  <!-- this is product five-->
  <div class="bg-gray-300 rounded-2xl cursor-pointer shadow-lg overflow-hidden">
    <div class="overflow-hidden ">
    <img img class="rounded-t-lg hover:scale-110 duration-1000" src="https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="...">
    </div>
  <h1 style="font-size: 1.4em;">Take A Cart and Start Shoping Now</h1>
  </div>
  <!-- this is product six-->
  <div class="bg-gray-300 rounded-2xl cursor-pointer shadow-lg  overflow-hidden">
    <div class="overflow-hidden ">
    <img img class="rounded-t-lg hover:scale-110 duration-1000" src="https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600" alt="...">
    </div>
  <h1 style="font-size: 1.4em;">Exelent Fragrance Made form Original Flower</h1>
  </div>
  <!-- this is product seven -->
  <div class="bg-gray-300 rounded-2xl cursor-pointer shadow-lg overflow-hidden">
    <div class="overflow-hidden ">
    <img img class="rounded-t-lg hover:scale-110 duration-1000" src="https://images.pexels.com/photos/3989394/pexels-photo-3989394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="...">
    </div>
  <h1 style="font-size: 1.4em;">England National Fragrance</h1>
  </div>
  <!-- this is product eight -->
  <div class="bg-gray-300 rounded-2xl cursor-pointer  shadow-lg overflow-hidden">
    <div class="overflow-hidden ">
    <img class="rounded-t-lg hover:scale-110 duration-1000" src="https://images.pexels.com/photos/2537930/pexels-photo-2537930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="...">
    </div>
  <h1 style="font-size: 1.4em;">Surprised your Husband By our Makeup 
  </div>
  
<!-- this is product nine -->
<div class="bg-gray-300 rounded-2xl cursor-pointer  shadow-lg overflow-hidden">
    <div class="overflow-hidden ">
    <img class="rounded-t-lg hover:scale-110 duration-1000" src="https://images.pexels.com/photos/1936848/pexels-photo-1936848.jpeg?auto=compress&cs=tinysrgb&w=600" alt="...">
    </div>
  <h1 style="font-size: 1.4em;">Pure Leather Bag 
  </div>
  <!-- this is product Ten -->
  <div class="bg-gray-300 rounded-2xl cursor-pointer  shadow-lg overflow-hidden">
    <div class="overflow-hidden ">
    <img class="rounded-t-lg hover:scale-110 duration-1000" src="https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg?auto=compress&cs=tinysrgb&w=600" alt="...">
    </div>
  <h1 style="font-size: 1.4em;"> Yellow Love Stylish Bag
  </div>
  <!-- this is product eleven -->
  <div class="bg-gray-300 rounded-2xl cursor-pointer  shadow-lg overflow-hidden">
    <div class="overflow-hidden ">
    <img class="rounded-t-lg hover:scale-110 duration-1000" src="https://images.pexels.com/photos/842959/pexels-photo-842959.jpeg?auto=compress&cs=tinysrgb&w=600" alt="...">
    </div>
  <h1 style="font-size: 1.4em;">Black Multi Portion Bag 50% OFF
  </div>
<!-- this is product 12-->
<div class="bg-gray-300 rounded-2xl cursor-pointer  shadow-lg overflow-hidden">
  <div class="overflow-hidden ">
  <img class="rounded-t-lg hover:scale-110 duration-1000" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=799&q=80" alt="...">
  </div>
<h1 style="font-size: 1.4em;">Browse premium related images on iStock | Save 20%
</div>
<!-- this is product 13 -->
<div class="bg-gray-300 rounded-2xl cursor-pointer  shadow-lg overflow-hidden">
  <div class="overflow-hidden ">
  <img class="rounded-t-lg hover:scale-110 duration-1000" src="https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" alt="...">
  </div>
<h1 style="font-size: 1.4em;">Fashion & Beauty Dark Gray Shose for mans
  
</div>
<!-- this is product 14 -->
<div class="bg-gray-300 rounded-2xl cursor-pointer  shadow-lg overflow-hidden">
  <div class="overflow-hidden ">
  <img class="rounded-t-lg hover:scale-110 duration-1000" src="https://cdn.pixabay.com/photo/2020/03/06/16/16/cornflakes-4907490_960_720.jpg" alt="...">
  </div>
<h1 style="font-size: 1.4em;">corn Flaks 50% OFF. We Want Your Health
</div>

<!-- this is product 15 -->
<div class="bg-gray-300 rounded-2xl cursor-pointer  shadow-lg overflow-hidden">
  <div class="overflow-hidden ">
  <img class="rounded-t-lg hover:scale-110 duration-1000" src="https://cdn.pixabay.com/photo/2017/07/28/16/30/bee-pollen-2549125_960_720.jpg" alt="...">
  </div>
<h1 style="font-size: 1.4em;">Bee Pollan
</div>
<!-- this is product 16 -->
<div class="bg-gray-300 rounded-2xl cursor-pointer  shadow-lg overflow-hidden">
  <div class="overflow-hidden ">
  <img class="rounded-t-lg hover:scale-110 duration-1000" src="https://cdn.pixabay.com/photo/2017/01/06/17/49/honey-1958464_960_720.jpg" alt="...">
  </div>
<h1 style="font-size: 1.4em;">100% Orignal Honey
</div>

<!-- this is product 17 -->
<div class="bg-gray-300 rounded-2xl cursor-pointer  shadow-lg overflow-hidden">
  <div class="overflow-hidden ">
  <img class="rounded-t-lg hover:scale-110 duration-1000" src="https://cdn.pixabay.com/photo/2018/05/29/23/18/potato-3440360_960_720.jpg" alt="...">
  </div>
<h1 style="font-size: 1.4em;">Fresh white Potatos Get Now 
</div>

<!-- this is product 18 -->
<div class="bg-gray-300 rounded-2xl cursor-pointer  shadow-lg overflow-hidden">
  <div class="overflow-hidden ">
  <img class="rounded-t-lg hover:scale-110 duration-1000" src="https://cdn.pixabay.com/photo/2016/03/27/07/12/apple-1282241_960_720.jpg" alt="...">
  </div>
<h1 style="font-size: 1.4em;">Mac Book Laptop with Iphone By Now 50% OFF
</div>
<!-- this is product 19 -->
<div class="bg-gray-300 rounded-2xl cursor-pointer  shadow-lg overflow-hidden">
  <div class="overflow-hidden ">
  <img class="rounded-t-lg hover:scale-110 duration-1000" src="https://cdn.pixabay.com/photo/2015/10/02/15/59/olive-oil-968657_960_720.jpg" alt="...">
  </div>
<h1 style="font-size: 1.4em;">100% Orignal Olive Oil 50% OFF. We Want Your Health
</div>
<!-- this is product 20 -->
<div class="bg-gray-300 rounded-2xl cursor-pointer  shadow-lg overflow-hidden">
  <div class="overflow-hidden ">
  <img class="rounded-t-lg hover:scale-110 duration-1000" src="https://cdn.pixabay.com/photo/2017/11/30/08/56/ice-cream-2987955_960_720.jpg" alt="...">
  </div>
<h1 style="font-size: 1.4em;">Chocolate Ice-Cream By Now
</div>
<!-- this is product 21 -->
<div class="bg-gray-300 rounded-2xl cursor-pointer  shadow-lg overflow-hidden">
  <div class="overflow-hidden ">
  <img class="rounded-t-lg hover:scale-110 duration-1000" src="https://cdn.pixabay.com/photo/2017/09/11/11/22/essential-oils-2738555_960_720.jpg" alt="...">
  </div>
<h1 style="font-size: 1.4em;">Orignal Sunflower Fragrance
</div>

<!-- this is product 22 -->
<div class="bg-gray-300 rounded-2xl cursor-pointer  shadow-lg overflow-hidden">
  <div class="overflow-hidden ">
  <img class="rounded-t-lg hover:scale-110 duration-1000" src="https://cdn.pixabay.com/photo/2015/06/27/16/34/food-823607_960_720.jpg" alt="...">
  </div>
<h1 style="font-size: 1.4em;">Cake cup with Chocolate Touch
</div>




<!-- this is product 23 -->
<div class="bg-gray-300 rounded-2xl cursor-pointer  shadow-lg overflow-hidden">
  <div class="overflow-hidden ">
  <img class="rounded-t-lg hover:scale-110 duration-1000" src="https://cdn.pixabay.com/photo/2018/11/15/02/41/essential-oil-3816410_960_720.jpg" alt="...">
  </div>
<h1 style="font-size: 1.4em;">Essential-oil Make From Sunflower
</div>




</div>   <!-- this is product end div -->



<!--  
<div class="flex bg-white ">
    <div class="basis-[100%] "> <img src="https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/60107ec758f4bb02f210c81a_6002086f72b7274f8001e77d_think32-footer.jpeg" alt=""> </div>
    
</div>
-->





<!-- this is full div -->
<div class="">
  <!-- this is uper div -->
  <div class=" bg-teal-600 flex sm: h-36 md:h-52 " > 
<div class="basis-[45%] ">
  
  <button class=" border-2 flex float-right p-2  mt-8 text-white  " > I WANT ONE TOO! </button> 
   
  </div>

<div class="basis-[55%] ">
  <div class=" float-right mt-8 mr-8 bg-white rounded-md cursor-pointer "><img src="https://www.iconbolt.com/iconsets/akar-icons/two-line-horizontal.svg"  alt="...">
  </div>
</div>
  </div>
<!-- this is uper div -->

<!-- this is lower div -->
  <div class="  text-white bg-slate-800  sm:h-60 md:h-96 h-60 ">
    <!-- fellow us  image -->
      <div class=" float-right pt-8 pr-20 md:pr-60 lg:mt-24 lg:pr-24"> 
        Fellow Us
        <div>
      <a href="#"><img src="https://www.iconbolt.com/iconsets/akar-icons/instagram-fill.svg" class="float-left" alt="..."></a>
      <a href="#"><img src="https://www.iconbolt.com/iconsets/coolicons/facebook.svg " class="float-left" alt="..."></a>
      <a href="#"><img src="https://www.iconbolt.com/iconsets/basicons/twitter-social-tweet.svg" class="float-left" alt="..."></a>
      <a href="#"><img src="https://www.iconbolt.com/iconsets/iconoir/youtube.svg" class="float-left" alt="..."></a>
      
     </div>
      </div>

    <!-- fellow us  image -->
    <!-- now sub email -->
    <div class=" text-center  pt-28 invisible lg:visible absolute ml-[35%]">
    <p >Digital Marketting In Sights For Clever Dentist </p>
    <p>
     Direct Your BOX
    </p>
    <input type="text" placeholder="Enter your Email" class="rounded text-black">:<button class="bg-red-400 rounded">Subscribe</button>
    </div>
    <!-- now sub email -->
    <div class="   pl-6 pt-8 md:pt-16 lg:pt-24 " style="font-size: 28px; font-weight:bold  " > THINK <SUP class=" text-pink-400 ">32</SUP>
     </div  >
      <p class="text-white font-bold md:mt-24 ml-6 lg:mt-5 ">Thoughtful marketing for growing for </p>
      <p class="text-white font-bold  ml-6 "> dental practices. </p>
      <hr class=" mt-9 ml-12 mr-12 lg:mt-32">
      <p class="mt-2 ml-6">CopyRight &copy; By Ahsan Rasheed&reg; Shoping For Home Marketing agencey. Punjab,Pakistan.All Rights Reserved. 
        
      </p>
  </div>
  
  <!-- this is lover div -->
</div>
<!-- this is full div -->





    <script>
        const navLinks = document.querySelector('.nav-links')
        function onToggleMenu(e){
            e.name = e.name === 'menu' ? 'close' : 'menu'
            navLinks.classList.toggle('top-[9%]')
        }
    </script>
</body>

</html>
            
            
            `)

        } else {
            // res.send('userName or pasward is incorrect')            
            res.sendFile(static_IncorrectSignIN)            
        }
    } catch (error) {
        res.send("Record Not found")
    }

})


app.get("/BackToSign",(req,res)=>{
res.sendFile(static_BackToSign)
})




app.listen(port,()=>{
    console.log(`Server is runing on thee server ${port}`);
})