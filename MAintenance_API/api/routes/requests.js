const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);
const express = require("express");
const router = express.Router();


router.use(express.json());

const userRequests = [
	{id: 1, type: "generator Maintenance", requestDate: "2018-04-11", requestTime: "08:41:40.973000", Summary: "Generator is yet to be serviced for 3 months now"},
	{id: 2, type: "vehicles Maintenance", requestDate: "2018-03-19", requestTime: "11:36:32.456000", Summary: "vehicles are yet to be serviced for 2 months now"},
	{id: 3, type: "Office Equipments", requestDate: "2018-03-11", requestTime: "09:41:40.973000", Summary: "Replacement of old office equipments"},
	{id: 4, type: "electrical Faults", requestDate: "2018-03-01", requestTime: "07:46:20.645000", Summary: "Fixing Faultsin electric equipments"},
	{id: 5, type: "Security", requestDate: "2018-02-14", requestTime: "14:31:34.2750500", Summary: "Replacement of old security devices"}
];

//GET: /users/requests
router.get("/",(req, res) => {
	res.json(userRequests);
});

//POST:/users/request
router.post("/",(req, res) => {

	//validate input with joi.
	const {error} = validateRequests(req.body);
	if (error) {
		//return Http status code 400 -- Bad Request
		res.status(400).json(error.details[0].message);
		return;
	}

	const userRequest = {
		id: userRequests.length +1,
		type: req.body.type,
		requestDate: req.body.requestDate,
		requestTime: req.body.requestTime,
		Summary: req.body.Summary
	};

	userRequests.push(userRequest);
	res.json(userRequest);
});

//GET: /users/requests/id
router.get("/:id",(req, res) => {
	const requestId = parseInt(req.params.id);
	const userRequest = userRequests.find(r => r.id === requestId);

	if (!userRequest) {
		//404 status code error
		res.status(404).json("The request with the given id was not found");
		return;
	}

	res.json(userRequest);
});

//PUT /users/requests/id
router.put("/:id",(req, res) => {
	const requestId = parseInt(req.params.id);
	const userRequest = userRequests.find(r => r.id === requestId);

	if (!userRequest) {
		res.status(404).send("The request with the given id was not found");
		return;
	}

	const {error} = validateRequests(req.body);
	if (error) {
		//return Http status code 400 -- Bad Request
		res.status(400).json(error.details[0].message);
		return;
	}

	userRequest.type        = req.body.type;
	userRequest.requestDate = req.body.requestDate;
	userRequest.requestTime = req.body.requestTime;
	userRequest.Summary     = req.body.Summary;

	res.json(userRequest);
});

//DELETE /users/requests/id
router.delete("/:id",(req, res) => {
	const requestId = parseInt(req.params.id);
	const userRequest = userRequests.find(r => r.id === requestId);

	if (!userRequest) {
		res.status(404).send("The request with the given id was not found");
		return;
	}

	const index = userRequests.indexOf(userRequest);
	userRequests.splice(index,1);

	res.json(userRequest);
});

function validateRequests(userRequest) {
	const schema ={
		type: Joi.string().min(4).required(),
		requestDate: Joi.date().format("YYYY-MM-DD").required(),
		requestTime: Joi.date().format("HH:mm:ss.SSSSSS").required(),
		Summary: Joi.string().min(10).required()
	};

	return Joi.validate(userRequest,schema);
}
module.exports = router;