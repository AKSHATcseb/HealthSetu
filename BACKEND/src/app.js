const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/hospitals", require("./routes/hospital.routes"));
app.use("/api/machines", require("./routes/machine.routes"));

// Health check
app.get("/", (req, res) => {
  res.send("Health Setu Backend Running 🚀");
});

module.exports = app;
