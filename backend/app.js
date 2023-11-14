import express from "express";
const app = express();

import cookieParser  from "cookie-parser"
import bodyParser  from "body-parser"
import fileUpload  from "express-fileupload"
import dotenv from "dotenv"
import path  from "path"
// import { dirname } from 'path';


import errorMiddleware from "./middleware/error.js"

// // Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// // Route Imports
import product  from "./routes/productRoute.js"
import user from "./routes/userRoute.js"
import order from "./routes/orderRoute.js"
import payment from "./routes/paymentRoute.js"

app.use("/api/v1", product); 
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

 
const __dirname = path.resolve();
const frontendBuildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendBuildPath));

// app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});


// Middleware for Errors
app.use(errorMiddleware);

export default app; 
