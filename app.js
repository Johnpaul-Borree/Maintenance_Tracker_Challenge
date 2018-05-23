import express from "express";
const app = express();


//import routes
import requestRoutes from "./api/routes/requests";

app.use("/api/v1", requestRoutes);

app.set("json spaces",2);



export default app;