import 'reflect-metadata';
import 'dotenv/config';
import { corsOptions } from '@config/cors';
import { errors } from 'celebrate';
// import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import '@shared/infra/database/typeorm';
// import swaggerUi from 'swagger-ui-express';

import '@shared/containers';
import { AppError } from '@shared/errors/AppError';
// import swaggerFile from '@shared/infra/http/docs/swagger.json';
import routes from '@shared/infra/http/router';

const app = express();

// app.use('/notificacao/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());
// app.use(cors(corsOptions));
app.use(routes);
app.use(errors());

const host = process.env.APP_HOST || 'localhost';
const port = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3333;

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: err.message,
  });
});

app.listen(port, host, () => {
  console.log(`Server started on http://${host}:${port}!`);
});
