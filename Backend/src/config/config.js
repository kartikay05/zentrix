import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGODB_URI) {
    throw new Error("MongoDB URI is not defined");
}

if(!process.env.PORT){
    throw new Error("Port is not defined");
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT Secret is not defined");
}

if (!process.env.NODE_ENV) {
    throw new Error("Node Env is not defined");
}

export const config = {
    port: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
}