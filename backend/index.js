const express = require('express');
// const path require "path";
const mongoose =require('mongoose');
const dotenv = require ('dotenv');
const userRouter= require('./routes/userRoutes.js');
const teamLeaderRouter= require('./routes/teamLeaderRoutes.js');
const teamRouter= require('./routes/teamRoutes.js');

dotenv.config();
mongoose.connect("mongodb://127.0.0.1:27017/register", { useNewUrlParser: true, useUnifiedTopology: true })


  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

  const app = express();

  app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/users", teamLeaderRouter);
app.use("/api/users", teamRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
