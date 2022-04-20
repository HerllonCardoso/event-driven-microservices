import { purchaseRouter } from '../../../../../src/infra/http/routes/purchase.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/', purchaseRouter);

export default routes;
