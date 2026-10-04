import mongoose from "mongoose";
const  dbConnection = async() =>{
    try {
        await mongoose.connect("mongodb://localhost:27017/sarahah_app")
            console.log("database is conect");
            
        
    } 
    catch (error) {
        console.error("database is failed:",error);
        
    }
}
export default dbConnection;