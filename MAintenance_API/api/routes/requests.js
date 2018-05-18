const express = require("express");
const router = express.Router();

router.use(express.json());

const userRequests = [
	{id: 1, type: "generator Maintenance", requestDate: "2018-04-11", requestTime: "08:41:40.9730000", Summary: "Generator is yet to be serviced for 3 months now"},
	{id: 2, type: "vehicles Maintenance", requestDate: "2018-03-19", requestTime: "11:36:32.4560000", Summary: "vehicles are yet to be serviced for 2 months now"},
	{id: 3, type: "Office Equipments", requestDate: "2018-03-11", requestTime: "09:41:40.9730000", Summary: "Replacement of old office equipments"},
	{id: 4, type: "electrical Faults", requestDate: "2018-03-01", requestTime: "07:46:20.6450000", Summary: "Fixing Faultsin electric equipments"},
	{id: 5, types: "Security", requestDate: "2018-02-14", requestTime: "14:31:34.2750500", Summary: "Replacement of old security devices"}
];

//GET: /users/requests
router.get("/",(req, res, next) => {
	res.json(userRequests);
});

//POST:/users/request
router.post("/",(req, res, next) => {
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
router.get("/:id",(req, res, next) => {
	const requestId = parseInt(req.params.id);
	const userRequest = userRequests.find(r => r.id === requestId);

	res.json(userRequest);
});

//PUT /users/requests/id
router.put("/:id",(req, res, next) => {
	const requestId = parseInt(req.params.id);
	const userRequest = userRequests.find(r => r.id === requestId);

	userRequest.type        = req.body.type;
	userRequest.requestDate = req.body.requestDate;
	userRequest.requestTime = req.body.requestTime;
	userRequest.Summary     = req.body.Summary;

	res.json(userRequest);
});

//DELETE /users/requests/id
router.delete("/:id",(req, res, next) => {
	const requestId = parseInt(req.params.id);
	const userRequest = userRequests.find(r => r.id === requestId);

	const index = userRequests.indexOf(userRequest);
	userRequests.splice(index,1);

	res.json(userRequest);
});

module.exports = router;