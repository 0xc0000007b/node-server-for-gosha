import { createWriteStream, readFile, writeFile } from "fs";

const express = require("express");
import { Request, Response } from "express";

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.post("/news", (req: Request, res: Response) => {
  const stream$ = createWriteStream("news.txt", { flags: "a" });
  const data = req.body;
  stream$.write(JSON.stringify(data) + "\n");
  console.log(data);
  res.sendStatus(200);
});
app.get("/news", (req: Request, res: Response) => {
  readFile("news.txt", "utf-8", (err, data: string) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to read file" });
      return;
    }
    const lines = data.trim().split("\n");
    const result = lines.map((line) => JSON.parse(line));
    res.status(200).json(result);
  });
});

const PORT: number = 3000;
app.listen(PORT, () => {
  console.log(`application listen on address http://localhost:${PORT}`);
});
