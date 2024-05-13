import express from "express";
import colors from "colors";

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello From Server</h1>");
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is Running at PORT ${PORT}`.bgMagenta);
});
