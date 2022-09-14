import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/routes";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api", routes);

app.get("/", function (_req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(port, () => console.log(`starting app on: ${port}`));

export default app;
