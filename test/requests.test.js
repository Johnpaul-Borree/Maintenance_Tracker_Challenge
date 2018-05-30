import router from "../server";
import chai from "chai";
import chaiHttp from "chai-http";
import request from "supertest";
import bcrypt from "bcrypt";
import db from "../api/models/database";
import jwt from "jsonwebtoken";


// const userRequests = [
// 	{id: 1, type: "generator Maintenance", requestDate: "2018-04-11", requestTime: "08:41:40.973000", Summary: "Generator is yet to be serviced for 3 months now"},
// 	{id: 2, type: "vehicles Maintenance", requestDate: "2018-03-19", requestTime: "11:36:32.456000", Summary: "vehicles are yet to be serviced for 2 months now"},
// 	{id: 3, type: "Office Equipments", requestDate: "2018-03-11", requestTime: "09:41:40.973000", Summary: "Replacement of old office equipments"},
// 	{id: 4, type: "electrical Faults", requestDate: "2018-03-01", requestTime: "07:46:20.645000", Summary: "Fixing Faultsin electric equipments"},
// 	{id: 5, type: "Security", requestDate: "2018-02-14", requestTime: "14:31:34.2750500", Summary: "Replacement of old security devices"}
// ];


const should = chai.should();

chai.use(chaiHttp);


before((done) => {
	chai.request(router)
				.post("/api/v1/auth/login")
				.send(
					{ 
					email:"johnson@email.com",
					password: "johnson2018"
				})
				.end((err, res) => {
					//console.log(res);
				});
				done();
	
	global.token = req.body.token;


});


describe("User SignUp and Login", () => {
	describe("#POST: /api/v1/auth/signup",() => {
		it("should SignUp new users",(done) => {
			chai.request(router)
				.post("/api/v1/auth/signup")
				.send(
					{ 
					firstName: "Johnson",
					email:"johnson@email.com",
					password: "johnson2018",
					isAdmin:false,
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
				});
				done();

		});
	});

	describe("#POST: /api/v1/auth/login",() => {
		it("should login users",(done) => {
			chai.request(router)
				.post("/api/v1/auth/login")
				.send(
					{ 
					email:"johnson@email.com",
					password: "johnson2018"
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
				});
				done();

		});
	});
});

	
	-                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
//Testing API EndPoints

describe("User requests API integration testing", () => {

	describe("#GET: /api/v1/users/requests",() => {
		it("should get all users requests",(done) => {
			chai.request(router)
				.get("/api/v1/users/requests")
				.end((err,res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
		
				});

				done();
		});

	});

	describe("#GET: /api/v1/users/requests/:id",() => {
		it("should get a user single requests", (done) => {
			chai.request(router)
				.get("/api/v1/users/requests/:id")
				.end((err,res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
					res.body.should.have.property("type");
					res.body.should.have.property("requestDate");
					res.body.should.have.property("requestTime");
					res.body.should.have.property("Summary");
				});

			done();
		});

	});

	describe("#POST: /api/v1/users/requests",() =>{
		it("should not post requests without all fields in correct format",(done) =>{
			const userRequest = {
				type: "vehicles Maintenance",
				requestDate: "2018-04-30",
				requestTime: "11:36:32.890000",
				Summary: "vehicles are yet to be serviced for 2 months now"
			};

			chai.request(router)
				.post("/api/v1/users/requests")
				.send(userRequest)
				.end((err,res) => {

					res.should.have.status(200);
					res.body.should.be.a("object");
					res.body.should.have.property("id");
					
				});
				done();
		});

		it("should Post a request", (done) => {

			const userRequest = {
				type: "Security",
				requestDate: "2018-02-14",
				requestTime: "14:31:34.2750500",
				Summary: "Replacement of old security devices"
			};

			chai.request(router)
				.post("/api/v1/users/requests")
				.send(userRequest)
				.end((err,res) => {

					res.should.have.status(200);
                	res.body.should.be.a("object");
					res.body.should.have.property("id");
					res.body.should.have.property("type");
					res.body.should.have.property("requestDate");
					res.body.should.have.property("requestTime");
					res.body.should.have.property("Summary");
					
				});

				done();
		});
	});

	describe("#PUT: /api/v1/users/requests/:id",() => {

		it("should update user request of a given id",(done) => {
			const userRequest = {type: "Office Equipments", requestDate: "2018-03-11", requestTime: "09:41:40.973000", Summary: "Replacement of old office equipments"};
			chai.request(router)
				.put("/api/v1/users/requests/3").send(userRequest)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
					res.body.should.have.property("type").eql(userRequest.type);
					res.body.should.have.property("requestDate").eql(userRequest.requestDate);
					res.body.should.have.property("requestTime").eql(userRequest.requestTime);
					res.body.should.have.property("Summary").eql(userRequest.Summary);
					res.body.should.have.property("id").eql(3);

				});

				done();

		
		});
	});



});	