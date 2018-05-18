const express = require("express");
const app = express();


//import routes
const requestRoutes = require("./api/routes/requests");

app.use("/users/requests", requestRoutes);

app.set("json spaces",2);

app.use((req, res, next) => {
	res.status(200).json({
		message : "connected"
	});

});


module.exports = app;