import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGODB_URI) {
    throw new Error("MongoDB URI is not defined");
}

if(!process.env.PORT){
    throw new Error("Port is not defined");
}

export const config = {
    port: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI,
}