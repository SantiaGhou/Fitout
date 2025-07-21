import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateBody, validateQuery } from '../middlewares/validation';
import { authenticateToken, requireUserType } from '../middlewares/auth';
import { userProfileSchema, personalProfileSchema, updateUserSchema } from '../schemas/user.schemas';
import { z } from 'zod';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// User profile routes
router.put('/profile/user', 
  requireUserType('USER'),
  validateBody(userProfileSchema), 
  UserController.updateUserProfile
);

router.put('/profile/personal', 
  requireUserType('PERSONAL'),
  validateBody(personalProfileSchema), 
  UserController.updatePersonalProfile
);

router.put('/profile', 
  validateBody(updateUserSchema), 
  UserController.updateUser
);

// Search users
router.get('/search', 
  validateQuery(z.object({ q: z.string().min(1) })),
  UserController.searchUsers
);

// Personal trainer routes
router.post('/students', 
  requireUserType('PERSONAL'),
  validateBody(z.object({ studentId: z.string().cuid() })),
  UserController.addStudent
);

router.get('/students', 
  requireUserType('PERSONAL'),
  UserController.getStudents
);

export default router;