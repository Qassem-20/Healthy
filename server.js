const express = require("express");
const path = require ("path");
//to hide file .env
const dotenv = require("dotenv");
dotenv.config();

// create an express app
const app = express();
app.use(express.json());

// Port
const port = process.env.PORT;

//cookie-parser for Auth
const cookieParser = require("cookie-parser");

app.use(cookieParser());


// Set the Access-Control-Allow-Origin header for the /manifest.json route
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')));

//routes
const userRoutes = require("./MS2/userRoutes.js");
app.use("/api/v1", userRoutes);
const macrosRoutes = require("./MS1/macrosRoutes.js");
app.use("/api/v1", macrosRoutes);

const { graphqlHTTP } = require("express-graphql");
const schema = require("./grapghQL/index.js");
//graphQL
app.use(
  "/api/v1/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// only when ready to deploy
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});
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
