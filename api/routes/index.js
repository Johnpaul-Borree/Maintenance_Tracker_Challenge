import express from "express";
const router = express.Router();


router.use(express.json());

import { getRequests, signUp, postRequests, getRequestsById, updateRequests, deleteRequests, requestTable, login, verifyToken, authenticateUser } from "../controllers/usersController";

//POST: /api/v1/users/signUp
router.post("/auth/signup", signUp);

//POST: /api/v1/users/login
router.post("/auth/login", login);

router.post("/users/requestTable", verifyToken, authenticateUser, requestTable);

//GET: /api/users/requests/userId
router.get("/users/requests", verifyToken, authenticateUser, getRequests);

//POST:/api/users/request
router.post("/users/requests", postRequests);

//GET: /api/users/requests/id
router.get("/users/requests/:id", getRequestsById);

//PUT /api/users/requests/id
router.put("/users/requests/:id", updateRequests);

//DELETE /api/users/requests/id
router.delete("/users/requests/:id", deleteRequests);


export default router;