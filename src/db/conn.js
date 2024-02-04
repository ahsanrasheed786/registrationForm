const mongoose= require("mongoose")

const passward="ukDNgGUkEwnrRWcT"

// mongodb+srv://rasheedahsan786:{passward}@cluster0.lwuhqrn.mongodb.net/Form
 const mongodbUrl=`mongodb+srv://rasheedahsan786:${passward}@cluster0.lwuhqrn.mongodb.net/Form`
              
// const userName="rasheedahsan786"


const Url="mongodb://0.0.0.0/Form"

mongoose.connect(mongodbUrl)
.then(()=>{
    console.log("BackendServer is connected sucessfully ");
    }).catch(()=>{
        console.log("Faild to connecte with BackendServer");
    })
    