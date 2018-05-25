import express from "express";
const router = express.Router();


router.use(express.json());

import { getRequests, signUp, postRequests, getRequestsById, updateRequests, deleteRequests } from "../controllers/usersController";

router.post("/users/signup", signUp);
//GET: /users/requests
router.get("/users/requests", getRequests);

//POST:/users/request
router.post("/users/requests", postRequests);

//GET: /users/requests/id
router.get("/users/requests/:id", getRequestsById);

//PUT /users/requests/id
router.put("/users/requests/:id", updateRequests);

//DELETE /users/requests/id
router.delete("/users/requests/:id", deleteRequests);


export default router;