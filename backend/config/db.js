
import mongoose from "mongoose";
import dns from "dns";
// const dns = require('dns')

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])


export const connectDB = async ()=>{

    try{
       await mongoose.connect(process.env.MONGO_URL);

       console.log("MONGODB CONNECTED SUCCESSFULLY!")
    }catch(error){
        console.error("Error connecting to MONGODB",error);
        process.exit(1) //exit with failure
    }

}
