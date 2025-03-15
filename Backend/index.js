import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/db.config.js";
import account from "./routes/accountRoute.js";
import project from "./routes/projectRoute.js";
import auth from './middleware/auth.js';
import registration from './routes/registrationRoute.js'

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(express.json());

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type",
//     "Content-Type: multipart/form-data"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use("/api/account",account);
app.use("/api/project", project);
app.use("/api/register", registration);

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



//run server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// app.use(cors({
//   origin: 'http://localhost:3000', // Your frontend URL
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json());
// app.use(auth);