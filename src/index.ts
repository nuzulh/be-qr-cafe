import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initializeDB } from "../config/ormconfig";
import { ErrorController } from "./controllers";
import {
  authRoutes,
  orderRoutes,
  productRoutes,
  tableRoutes,
  userRoutes,
} from "./routes";

dotenv.config();
initializeDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/table", tableRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);

app.all("*", ErrorController.otherRoutesHandler);
app.use(ErrorController.globalErrorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
