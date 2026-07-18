import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";
import studyRoutes from "./routes/studyRoutes.js";
import generateStudyRoutes from "./routes/generateStudyRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/chat", chatRoutes);
app.use("/api/study", studyRoutes);
app.use("/api/study", generateStudyRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🚀 StudyFlow Backend is running!"
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
