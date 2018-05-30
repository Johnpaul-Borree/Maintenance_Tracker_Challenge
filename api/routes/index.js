import express from "express";
const router = express.Router();


router.use(express.json());

import { resolveRequest, disapproveRequest, approveRequest, getAdmin, getAllRequests, getRequests, signUp, postRequests, getRequestsById, updateRequests, login, verifyToken, authenticateUser } from "../controllers/usersController";

//POST: /api/v1/users/signUp
router.post("/auth/signup", signUp);

//POST: /api/v1/auth/login
router.post("/auth/login", login);

//GET: /api/v1/users/requests/userId
router.get("/users/requests", verifyToken, authenticateUser, getRequests);

//POST:/api/v1/users/request
router.post("/users/requests", verifyToken, authenticateUser, postRequests);

//GET: /api/v1/users/requests/id
router.get("/users/requests/:id", verifyToken, authenticateUser, getRequestsById);

//PUT /api/v1/users/requests/id
router.put("/users/requests/:id", verifyToken, authenticateUser, updateRequests);

//GET /api/v1/requests
router.get("/requests", verifyToken, authenticateUser, getAdmin, getAllRequests);

//PUT: /api/v1/requests/<requestId>/approve
router.put("/requests/:id/approve", verifyToken, authenticateUser, getAdmin, approveRequest);

//PUT: /api/v1/requests/<requestId>/approve
router.put("/requests/:id/disapprove", verifyToken, authenticateUser, getAdmin, disapproveRequest);

//PUT: /api/v1/requests/<requestId>/approve
router.put("/requests/:id/resolve", verifyToken, authenticateUser, getAdmin, resolveRequest);


export default router;