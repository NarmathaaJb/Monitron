import express from "express";
import cors from "cors";
import metricsRoutes from "./routes/metrics";
import logsRoutes from "./routes/logs";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/metrics", metricsRoutes);

app.use("/logs", logsRoutes);


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`🚀 Backend API running on port ${PORT}`);
});
