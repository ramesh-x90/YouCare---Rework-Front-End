const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
// import fileUpload from "express-fileupload";
// import Buffer from "buffer";
// import Blob from "node-blob";

// const filePath = "images";

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, callback) => {
//       callback(null, filePath);
//     },
//     filename: (req, file, callback) => {
//       console.log(file);
//       callback(null, file.fieldname + "-" + Date.now() + "." + file.mimetype);
//     },
//   }),
// });

const PORT = 5500;

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
// app.use(upload.array());
// app.use(
//   fileUpload({
//     createParentPath: true,
//   })
// );

// app.use(cors());
app.use(express.static("YouCare"));

const endpoint = "http://127.0.0.1:8080/";

app.use("/API", require("./routes/login_logout.js"));
app.use("/API/refresh", require("./routes/TokenRefresh.js"));
app.use("/API/patient", require("./routes/patient/register.js"));
app.use("/API/doctor", require("./routes/doctor/register.js"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} `);
});
