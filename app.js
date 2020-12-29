import bodyParser from "body-parser";
import cookieParser from"cookie-parser";
import express from "express";
import morgan from "morgan";

import homeRouter from "./routers/homeRouter";
// import userRouter from "./routers/userRouter";

import routes from "./routes";
import {middleware} from "./middleware";
import "./db";


const app = express();
const PORT = process.env.PORT || 9999;

app.set("view engine","pug");

app.use("/uploads",express.static("uploads"));
app.use("/public",express.static("public"));

app.use(middleware);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(routes.home, homeRouter);
// app.use("/:id", userRouter);

const handleListen = () =>{
    console.log(`listen on ${PORT}`);

    
};

app.listen(PORT,handleListen);





