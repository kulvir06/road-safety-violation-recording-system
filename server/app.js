import express from "express";
// import bodyParser from "body-parser";
import db from './config/atlasConnection';
import userRoutes from './routes/user';
import createTransporterDB from './models/transporterSchema';
import createLocationDB from './models/locationSchema';

const app = express();

const PORT = 3001;
db.connection();

app.use("/", userRoutes)

app.listen(PORT, () => {
    console.log("Server listening on Port -",PORT,"\n http://localhost:3001");
});

//use this method only if you changed transporter data
// createTransporterDB.addData();
//use this method only if you changed location data
// createLocationDB.addData();