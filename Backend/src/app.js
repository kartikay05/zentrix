import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(helmet())
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.send({
    message: "server is running.",
  });
});

app.use("/api/auth", authRouter);

export default app;
