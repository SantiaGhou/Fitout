import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

export function setupSwagger(app: Express) {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Fitout API',
        version: '1.0.0',
        description: 'Documentação da API do teu projeto de treino, dieta e usuários.',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
          },
        }
      },
      security: [
        { bearerAuth: [] }
      ]
    },
    apis: ['./src/routes/**/*.ts', './src/controllers/*.ts'],
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }'
  }));
}
