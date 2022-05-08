const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const Redis = require("ioredis");
const { corsOptions } = require("./config/corsOptions");
const { notificationModel } = require("./model/notification.model");
const { rateLimiter } = require("./middlewares/rateLimiter.middleware");

//initializing app
const app = express();

//configuring env
require("dotenv").config();
const PORT = process.env.PORT || 5001;

//connecting to mongodb
connectDB();

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use("/uploads", express.static("uploads"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/upload", require("./routes/uploadRoute"));
app.use("/api", require("./routes/profile"));
app.use("/api", require("./routes/notification"));

//http server
const server = http.createServer(app);

const io = new Server(server, {
  cors: "http://localhost:3000",
});

io.on("connection", (socket) => {
  socket.on("send_message", async (data) => {
    await notificationModel.create({ user: data.name, message: data.message });
    const res = await notificationModel.find({});

    socket.broadcast.emit("receive_message", res);
  });
});

app.use("/", (req, res) => {
  console.log(`server at ${PORT}`);
  res.json({ message: "server is running", port: PORT });
});

//error handler
app.use(require("./middlewares/error.middleware"));

server.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
