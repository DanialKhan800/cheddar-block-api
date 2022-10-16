import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routes from './routes/index.js'

const app = express();
dotenv.config();
app.use(cors());
app.use('/images', express.static('images'));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


app.use(routes)

app.get("/", (req, res) => {
  res.send("Api is working");
});

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
