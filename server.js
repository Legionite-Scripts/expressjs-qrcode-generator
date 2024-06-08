const express = require("express");
const uuid = require("uuid");
const app = express();

const port = 5000;

app.use(express.json());

const { Response, QrcodeGenerator } = require("./utils/response");

// endpoint routes
app.get("/", (req, res) => {
  // res.status(200).json(Response(true, "Server Active and Reachable 🆗"));
  res.send(uuid.v4());
});

app.post("/register", (req, res) => {
  // console.table(req.body);
  // const { employeeName, employeeDepartment } = req.body;
  const response = QrcodeGenerator(req.body);

  if (response) {
    res.status(200).json(Response(true, "Qrcode Generation Successful"));
  } else {
  }
  res.status(500).json(Response(false, "Qrcode Generation Failed"));
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port} 🥇🥇`);
});
