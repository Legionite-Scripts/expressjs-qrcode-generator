const express = require("express");
const app = express();
const uuid = require("uuid");
const port = 5000;
app.use(express.json());

const {
  Response,
  QrcodeGenerator,
  Validate,
  employeeRegistrationSchema,
} = require("./utils/helper");

// endpoint routes
app.get("/", (req, res) => {
  res.status(200).json(Response(true, "Server Active and Reachable 🆗"));
  res.send(uuid.v4());
});

app.post("/register", (req, res) => {
  Validate(employeeRegistrationSchema, req.body);

  // console.log(schemaValidation);
  const response = QrcodeGenerator(req.body);
  [];
  if (response) {
    res.status(200).json(Response(true, "Qrcode Generation Successful"));
  } else {
  }
  res.status(500).json(Response(false, "Qrcode Generation Failed"));
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port} 🥇🥇`);
});
