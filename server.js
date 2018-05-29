import express from "express";
import bodyParser from "body-parser";
//import routes
import requestRoutes from "./api/routes/index";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/api/v1", requestRoutes);

// app.set("json spaces",2);

const port = process.env.PORT || 3000;


app.listen(port, () => {

	console.log(`listening to port ${port}`);
});

export default app;