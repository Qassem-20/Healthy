const express = require("express");

//to hide file .env
const dotenv = require("dotenv");
dotenv.config();

// create an express app
const app = express();
app.use(express.json());

// Port
const port = process.env.PORT || 4000;

//cookie-parser for Auth
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("", (req, res) => {
  res.send("Welcome to Healthy project, this is the backend layer");
});

//routes
const userRoutes = require("./routes/userRoutes.js");
app.use("/api/v1", userRoutes);
const macrosRoutes = require("./routes/macrosRoutes.js");
app.use("/api/v1", macrosRoutes);

//db authentication
const connectDB = require("./db/connect.js");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}, and DB is connected`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
