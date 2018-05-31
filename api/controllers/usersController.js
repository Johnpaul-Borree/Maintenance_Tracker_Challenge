import bcrypt from "bcrypt";
import db from "../models/database";
import jwt from "jsonwebtoken";



exports.signUp = (req, res) => {

	const {firstName, email, password} = req.body;

	db.query("SELECT * FROM users",(err, result) => {
		if(err){
			res.status(400).send("Bad Request! unable to hash password");
		}else{
			//compairing email.

			const resultArray = [];

			for (let i = 0; i < result.rows.length; i++) {
				resultArray.push(result.rows[i].email);
			}
			//console.log(resultArray);

			if(resultArray.indexOf(email) !== -1){
				return res.json("Email already exists!");
			}else{
				bcrypt.hash(password, 10, (err, hash) => {
					if (err) {
						//return Http status code 400 -- Bad Request
						res.status(400).send("Bad Request! unable to hash password");
		
					}else{
						const query = {
							text: "INSERT INTO users(firstname, email, hashed_password, isadmin) VALUES($1, $2, $3, $4)",
							values: [firstName, email, hash, false]
						}; 
						db.query(query,(err) =>{
							if(err){
								res.json("There was a problem connecting to database!");
							}
							//console.log(response);
							//db.end();
							res.json("Account created successfully!");
						});	
					}
				});
			}
		}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
	});
};

//Login with JWT

exports.login = (req, res) => {
	const user = {
		email: req.body.email,
		password: req.body.password
	};

	const query = {
		text: "SELECT * FROM users WHERE email = $1",
		values: [user.email]
	};
	db.query(query,(err,result) => {
		if(err){
			res.status(400).send("Bad Request! unable to hash password");
			//console.log(err);
			return;
		}
		const hashedPassword = result.rows[0].hashed_password;
		const userId = result.rows[0].id;
		// db.end();

		bcrypt.compare(user.password,hashedPassword, (err, resp) => {
			if(resp){
				//console.log("match");
				const token = jwt.sign({
					id: userId,
					email:user.email
				}, 
				"secretkey", 
				{ expiresIn: "1hr"}

				);
				res.status(200).json({token});
			} else {
				//console.log("Passwords don't match");
				res.sendStatus(403); 
			} 
		});
	});	
			
};
//Middleware to verify Token
exports.verifyToken = (req, res, next) => {
//Authentification Header
	const bearerHeader = req.headers["authorization"];
	if(typeof bearerHeader !== "undefined"){
		//we need to store like array of words.
		const bearer = bearerHeader.split(" ");
		//Get Token From the Array
		const bearerToken = bearer[1];
		//set  the token now
		req.token = bearerToken;
		//res.sendStatus(200);
		next();
	}else{
		//Forbidden
		res.status(403);
	}
};

exports.authenticateUser = (req, res, next) => {
	jwt.verify(req.token, "secretkey", (err, authData) => {
		if(err){
			res.status(403);
		}
		// }else{

		// 	res.json({
		// 		Message: "created",
		// 		authData
		// 	});
		// }
		req.userId = authData.id;
		req.email = authData.email;
	});
	
	next();
};
//GET ALL REQUEST FOR A LOGGED USER
exports.getRequests = (req, res) => {
	const userId = req.userId;
	// console.log(userId);
	const query = {
		text: "SELECT * FROM requests WHERE users_id = $1",
		values: [userId]
	}; 

	db.query(query,(err, result) =>{
		if(err){
			res.status(400).send("Bad Request! unable to hash password");
			//console.log(err);
		}else{
			const userRequests = result.rows;
			// console.log(userRequests);
			res.status(200).json(userRequests);
		}
		db.end();
	});	
};

exports.postRequests = (req, res) => {

	const usersId = req.userId;
	const {type, requestDate, requestTime, summary} = req.body;

	const query = {
		text: "INSERT INTO requests(type, request_date, request_time, summary, users_id) VALUES($1, $2, $3, $4, $5)",
		values: [type, requestDate, requestTime, summary, usersId]
	}; 
	db.query(query,(err) =>{
		if(err){
			res.status(400).send("Bad Request! unable to hash password");
		}
		//console.log(result);
		
		return res.status(200).json("success!");

		//db.end();
	});	

};
exports.getRequestsById = (req, res) => {

	const userId = req.userId;
	// console.log(userId);
	const query = {
		text: "SELECT * FROM requests WHERE users_id = $1",
		values: [userId]
	}; 

	db.query(query,(err, result) =>{
		if(err){
			res.status(400).send("Bad Request! unable to hash password");
			//console.log(err);
		}else{
			const userRequests = result.rows;
			const requestId = parseInt(req.params.id);
			const userRequest = userRequests.find(r => r.id === requestId);

			if (!userRequest) {
				//404 status code error
				res.status(404).json("The request with the given id was not found");
				return;
			}

			res.json(userRequest);
			// console.log(userRequests);
		}
		db.end();
	});	
};
exports.updateRequests = (req, res) => {

	const userId = req.userId;
	// console.log(userId);
	db.query("SELECT * FROM requests WHERE users_id = $1",[userId], (err, result) => {
		if(err){
			res.status(400).send("Bad Request! unable to hash password");
		}else{
			const userRequests = result.rows;
			const requestId = parseInt(req.params.id);
			const userRequest = userRequests.find(r => r.id === requestId);

			if (!userRequest) {
				//404 status code error
				res.status(404).json("The request with the given id was not found");
				return;
			}
			if(userRequest.status !== "approved"){
				const query = {
					text: "UPDATE requests SET type=$1, request_date=$2, request_time=$3, summary=$4 WHERE id=$5 RETURNING *",
					values: [req.body.type, req.body.requestDate, req.body.requestTime, req.body.summary, req.params.id]
				}; 	

				db.query(query,(err) =>{
					if(err){
						res.status(400).send("Bad Request!");
						//console.log(err);
					}else{
						res.json("success!");
						// console.log(userRequests);
					}
					db.end();
				});	
			}
			res.json("Can not Update Approved request!");
		} 
	});
	
};


exports.getAllRequests = (req, res) => {

	const query = {
		text: "SELECT * FROM requests",
	}; 

	db.query(query,(err, result) =>{
		if(err){
			res.status(400).send("Bad Request!");
			//console.log(err);
		}else{
			const userRequests = result.rows;
			// console.log(userRequests);
			res.status(200).json(userRequests);
		}
		db.end();
	});	
};


exports.approveRequest = (req, res) => {

	const requestId = req.params.id;

	const query = {

		text: "UPDATE requests SET status=$1 WHERE id=$2",
		values: ["approved", requestId]
	};
	db.query(query, (err) =>{
		if(err){
			//console.log(err);
			res.status(400).send("Bad Request!");
		}else{
			//console.log(result);
			res.json("success!");
		}
	});
};

exports.disapproveRequest = (req, res) => {

	const requestId = req.params.id;

	const query = {

		text: "UPDATE requests SET status=$1 WHERE id=$2",
		values: ["Not Approved", requestId]
	};
	db.query(query, (err) =>{
		if(err){
			//console.log(err);
			res.status(400).send("Bad Request!");
		}else{
			//console.log(result);
			res.json("success!");
		}
	});
};

exports.resolveRequest = (req, res) => {

	const requestId = req.params.id;

	const query = {

		text: "UPDATE requests SET status=$1 WHERE id=$2",
		values: ["resolved", requestId]
	};
	db.query(query, (err) =>{
		if(err){
			//console.log(err);
			res.status(400).send("Bad Request!");
		}else{
			//console.log(result);
			res.json("success!");
		}
	});
};

exports.getAdmin = (req, res, next) => {
	const email = req.email;
	const query = { 
		text: "SELECT * FROM users WHERE isadmin = $1",
		values: [true]
	};

	db.query(query, (err, result) => {
		if (err){
			res.status(400).send("Bad Request!");
			//console.log(err);
		}else{
			const arr = [];
			for (let i = 0; i < result.rows.length; i++) {
				arr.push(result.rows[i].email);
			}
			//console.log(arr);

			if(arr.indexOf(email) === -1){
				return res.json("Admin route!");
			}

			next();
		}
	});

	
};


