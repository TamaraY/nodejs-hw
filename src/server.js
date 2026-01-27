import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(
  cors({
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  }),
);
app.use(helmet());
app.use(express.json({ limit: "10mb" }));

// app.get("/get-err", (req, res) => {
//   throw new Error("Whoops, it's an error!!!!");
// });

app.get("/notes", (req, res) => {
  res.status(200).json({ message: "Retrieved all notes" });
});

app.get("/notes/:noteId", (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
});

app.get("/test-error", () => {
  throw new Error("Simulated server error");
});

app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: isProd ? "Oops, it's an error :)" : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
