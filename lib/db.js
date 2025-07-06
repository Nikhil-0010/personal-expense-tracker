import mongoose from 'mongoose';

// connect to db
const connectDB = async ()=> {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('MongoDB connected');
    }).catch((err) => {
        console.error('MongoDB connection error:', err);
    });
};

export default connectDB;