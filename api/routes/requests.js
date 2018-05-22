const express = require("express");
const router = express.Router();


router.use(express.json());

const users_controller = require("../controllers/usersController");

//GET: /users/requests
router.get("/", users_controller.get_all_users_requests);

//POST:/users/request
router.post("/", users_controller.post_Requests);

//GET: /users/requests/id
router.get("/:id", users_controller.get_requests_by_Id);

//PUT /users/requests/id
router.put("/:id", users_controller.update_requests);

//DELETE /users/requests/id
router.delete("/:id", users_controller.delete_requests);


module.exports = router;