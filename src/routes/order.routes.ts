import { Router } from "express";

const orderRoutes = Router();

orderRoutes.get("/");
orderRoutes.post("/");
orderRoutes.patch("/");
orderRoutes.delete("/");

export default orderRoutes;
