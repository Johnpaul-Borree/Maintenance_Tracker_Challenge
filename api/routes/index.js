import express from "express";
const router = express.Router();


router.use(express.json());

import { getAllRequests, getRequests, signUp, postRequests, getRequestsById, updateRequests, login, verifyToken, authenticateUser } from "../controllers/usersController";

//POST: /api/v1/users/signUp
router.post("/auth/signup", signUp);

//POST: /api/v1/users/login
router.post("/auth/login", login);

//GET: /api/users/requests/userId
router.get("/users/requests", verifyToken, authenticateUser, getRequests);

//POST:/api/users/request
router.post("/users/requests", verifyToken, authenticateUser, postRequests);

//GET: /api/users/requests/id
router.get("/users/requests/:id", verifyToken, authenticateUser, getRequestsById);

//PUT /api/users/requests/id
router.put("/users/requests/:id", verifyToken, authenticateUser, updateRequests);

//GET /api/v1/requests
router.get("/requests", getAllRequests);


export default router;