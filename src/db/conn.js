const mongoose= require("mongoose")

const Url="mongodb://0.0.0.0/Form"

mongoose.connect(Url)
.then(()=>{
    console.log("BackendServer is connected sucessfully    ");
    }).catch(()=>{
        console.log("Faild to connecte with BackendServer");
    })
    