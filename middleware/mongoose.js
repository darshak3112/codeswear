const mongoose = require('mongoose');

const connectDb = handler => async(req,res) => {
    if(mongoose.connections[0].readyState) {
        return handler(req,res)
    }
    const con = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected : ${con.connection.host}`)
    return handler(req,res);
}
export default connectDb
