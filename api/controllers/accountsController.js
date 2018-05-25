import BaseJoi from"joi";
import Extension from "joi-date-extensions";
const Joi = BaseJoi.extend(Extension);

import pool from "../models/database";
import bodyParser from "body-parser";
import bycrypt from "bycrypt";
//create account

//create new user 
exports.post_new_user = (req, res) => {
	res.send("i goy here");
	const userEmail = req.body.email;
	const userPassword = bycrypt.hashSync(req.body.password,10); 
	const isAnAdmin = req.body.isAnAdministrator;

	//validation

		const sqlQuery = {
  		text: "INSERT INTO public.users(Email, password, isAnAdministrator) VALUES(userEmail, userPassword, isAnAdmin)",
  		values: ["brian.m.carlson@gmail.com", 12358, true]
};


	pool.query(sqlQuery, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
})
	


};

// callback

