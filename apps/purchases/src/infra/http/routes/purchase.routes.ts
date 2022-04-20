import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { PurchaseController } from "../controller/purchase.controller";

const purchaseRouter = Router();
const purchaseController = new PurchaseController();

purchaseRouter.get("/", (req, res) => {
  return res.json({ ok: true });
});

purchaseRouter.post(
  "/:id",
  celebrate(
    {
      [Segments.BODY]: {
        productId: Joi.string().required(),
        name: Joi.string(),
        email: Joi.string(),
      },
    },
    { abortEarly: false }
  ),
  purchaseController.create
);

export { purchaseRouter };
