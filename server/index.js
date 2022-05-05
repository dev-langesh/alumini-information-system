const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { corsOptions } = require("./config/corsOptions");

//initializing app
const app = express();

//configuring env
require("dotenv").config();
const port = process.env.PORT || 5001;

//connecting to mongodb
connectDB();

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/upload", require("./routes/uploadRoute"));
app.use("/api", require("./routes/profile"));
app.use("/api", require("./routes/notification"));

app.use("/", (req, res) => {
  res.json({ message: "server is running" });
});

//error handler
app.use(require("./middlewares/error.middleware"));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
