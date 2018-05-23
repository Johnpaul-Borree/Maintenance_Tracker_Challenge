import express from "express";
const router = express.Router();


router.use(express.json());

import users_controller from "../controllers/usersController";

//GET: /users/requests
router.get("/users/requests", users_controller.get_all_users_requests);

//POST:/users/request
router.post("/users/requests", users_controller.post_Requests);

//GET: /users/requests/id
router.get("/users/requests/:id", users_controller.get_requests_by_Id);

//PUT /users/requests/id
router.put("/users/requests/:id", users_controller.update_requests);

//DELETE /users/requests/id
router.delete("/users/requests/:id", users_controller.delete_requests);


export default router;