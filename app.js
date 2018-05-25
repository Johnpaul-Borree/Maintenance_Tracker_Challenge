import express from "express";
import bodyParser from "body-parser";
const app = express();


//import routes
import requestRoutes from "./api/routes/index";
app.use(bodyParser());

app.use("/api/v1", requestRoutes);

app.set("json spaces",2);



export default app;