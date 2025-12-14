import express from "express";
import cors from "cors";
import metricsRoutes from "./routes/metrics";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/metrics", metricsRoutes);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`🚀 Backend API running on port ${PORT}`);
});
