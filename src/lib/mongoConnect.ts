import mongoose from "mongoose";

const connectMongo = async()=>{
try {
    await mongoose.connect(process.env.MONGODB_API!,{dbName:"buddy"}).then(()=>console.log("MONGODB connected")).catch(()=>{throw Error})

} catch (error) {
    console.error("Mongo error",error)
}
}

export default connectMongo
