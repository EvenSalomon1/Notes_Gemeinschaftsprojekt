import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectToDatabase } from "./models/index.js";
import { usersRouter } from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/users", usersRouter);

try {
  await connectToDatabase();
  const PORT = 3010;
  app.listen(PORT, () => console.log("Server ready at port", PORT));
} catch (err) {
  console.log(err);
  process.exit(1);
}
