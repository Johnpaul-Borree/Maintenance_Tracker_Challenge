const router = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require("supertest");


const userRequests = [
	{id: 1, type: "generator Maintenance", requestDate: "2018-04-11", requestTime: "08:41:40.973000", Summary: "Generator is yet to be serviced for 3 months now"},
	{id: 2, type: "vehicles Maintenance", requestDate: "2018-03-19", requestTime: "11:36:32.456000", Summary: "vehicles are yet to be serviced for 2 months now"},
	{id: 3, type: "Office Equipments", requestDate: "2018-03-11", requestTime: "09:41:40.973000", Summary: "Replacement of old office equipments"},
	{id: 4, type: "electrical Faults", requestDate: "2018-03-01", requestTime: "07:46:20.645000", Summary: "Fixing Faultsin electric equipments"},
	{id: 5, type: "Security", requestDate: "2018-02-14", requestTime: "14:31:34.2750500", Summary: "Replacement of old security devices"}
];

const should = chai.should();

chai.use(chaiHttp);

describe("User requests API integration testing", () => {
	describe("#GET: /users/requests",() => {
		it("should get all users requests",(done) => {
			chai.request(router)
				.get("/users/requests")
				.end((err,res) => {
					res.should.have.status(200);
					res.body.should.be.a("array");
					done();
				});
		});
	});
});