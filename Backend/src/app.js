import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";

const app = express();


//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send({
    message: "server is running.",
  });
});

export default app;
