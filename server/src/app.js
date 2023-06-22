require("dotenv").config();
const connectDB = require("./config/connect");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const upvoteRouter = require("./routes/upvote");
const commentRouter = require("./routes/comment");
const categoryRouter = require("./routes/category");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use("/api", authRouter);
app.use("/api/product", productRouter);
app.use("/api/upvote", upvoteRouter);
app.use("/api/comment", commentRouter);
app.use("/api/category", categoryRouter);

// Start the server
const port = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port}`));
  } catch (err) {
    console.error(err);
  }
};

startServer();
