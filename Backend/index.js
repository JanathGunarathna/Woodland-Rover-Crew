import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/db.config.js";
import account from "./routes/accountRoute.js";
import project from "./routes/projectRoute.js";

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type",
    "Content-Type: multipart/form-data"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

//connect database
sequelize
  .authenticate()
  .then(() => {
    console.log("connection has been established successfully");
  })
  .catch((error) => {
    console.error("unable connect to the database: ", error);
  });


//Table creation
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("tables created");
  })
  .catch((error) => {
    console.error("unable to create tables: ", error);
  });


  app.use("/api/account",account);
  app.use("/api/project", project);
  
//run server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

