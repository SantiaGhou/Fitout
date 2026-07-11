import { Router } from 'express';
import { UserController } from '../user/controllers/user.controller';
import { validateBody, validateQuery } from '../middlewares/validation';
import { authenticateToken, requireUserType } from '../middlewares/auth';
import { userProfileSchema, personalProfileSchema, updateUserSchema } from '../user/schemas/user.schemas';
import { z } from 'zod';

const router = Router();

/**
 * @openapi
 * /users/profile/user:
 *   put:
 *     tags:
 *       - Users
 *     summary: Atualiza o perfil do usuário comum
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfile'
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso
 */
router.use(authenticateToken);

/**
 * @openapi
 * /users/profile/user:
 *   put:
 *     tags:
 *       - Users
 *     summary: Atualiza o perfil do usuário comum
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário atualizado
 */
router.put('/profile/user',
  requireUserType('USER'),
  validateBody(userProfileSchema),
  UserController.updateUserProfile
);

/**
 * @openapi
 * /users/profile/personal:
 *   put:
 *     tags:
 *       - Users
 *     summary: Atualiza o perfil do personal trainer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do personal atualizado
 */
router.put('/profile/personal',
  requireUserType('PERSONAL'),
  validateBody(personalProfileSchema),
  UserController.updatePersonalProfile
);

/**
 * @openapi
 * /users/profile:
 *   put:
 *     tags:
 *       - Users
 *     summary: Atualiza informações gerais do usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil atualizado
 */
router.put('/profile',
  validateBody(updateUserSchema),
  UserController.updateUser
);

/**
 * @openapi
 * /users/search:
 *   get:
 *     tags:
 *       - Users
 *     summary: Busca usuários pelo nome ou email
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: q
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de usuários encontrados
 */
router.get('/search',
  validateQuery(z.object({ q: z.string().min(1) })),
  UserController.searchUsers
);

/**
 * @openapi
 * /users/students:
 *   post:
 *     tags:
 *       - Students
 *     summary: Adiciona um aluno à lista do personal trainer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 format: cuid
 *     responses:
 *       200:
 *         description: Aluno adicionado
 */
router.post('/students',
  requireUserType('PERSONAL'),
  validateBody(z.object({ studentId: z.string().cuid() })),
  UserController.addStudent
);

/**
 * @openapi
 * /users/students:
 *   get:
 *     tags:
 *       - Students
 *     summary: Lista os alunos vinculados ao personal trainer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alunos
 */
router.get('/students',
  requireUserType('PERSONAL'),
  UserController.getStudents
);

export default router;
