import { Router } from "express";

const productRoutes = Router();

productRoutes.get("/");
productRoutes.post("/");
productRoutes.patch("/");
productRoutes.delete("/");

export default productRoutes;
