import mongoose from 'mongoose'
const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('mongo connected');
    } catch (error) {
        console.log('error',error);
    }
}
export default ConnectDb;