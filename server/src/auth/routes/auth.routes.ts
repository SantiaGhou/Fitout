import { Router } from "express";
import { AuthController } from "../../auth/controllers/auth.controller";
import { authenticateToken } from "../../middlewares/auth";
import { validateBody } from "../../middlewares/validation";
import { loginSchema, registerSchema } from "../schemas/auth.schemas";

const router = Router();

router.post("/register", validateBody(registerSchema), AuthController.register);
router.post("/login", validateBody(loginSchema), AuthController.login);

router.get("/profile", authenticateToken, AuthController.getProfile);
router.post("/logout", authenticateToken, AuthController.logout);

export default router;
