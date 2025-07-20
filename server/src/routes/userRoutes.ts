import { Router } from "express";
import { registerUser } from "../controllers/usersControllers";

const router = Router();

router.post("/register", registerUser);

export default router;
