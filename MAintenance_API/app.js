const express = require("express");
const app = express();

//import routes
const requestRoutes = require("./api/routes/requests");
app.use("/requests", requestRoutes);

app.use((req, res, next) => {
	res.status(200).json({
		message : "connected"
	});

});


module.exports = app;