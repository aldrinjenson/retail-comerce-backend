require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { indexRouter } = require("./routes");
const cors = require("cors");

const app = express();

// todo: use little more stricter and hence safer cors handling(using cors library)
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS,GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.use(express.json());
app.use(morgan("dev")); //for getting request logs

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to db"))
  .catch((err) => console.log("error in connecting to db" + err));
app.use(express.json());

app.use(indexRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
