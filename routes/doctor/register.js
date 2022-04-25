const express = require("express");
const fetch = require("node-fetch");
const Formdata = require("form-data");

const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10485760 },
});

const router = express.Router();
// router.use(upload.array());

const endpoint = "http://127.0.0.1:8080/";

router.post("/register", upload.single("licences"), async (req, res) => {
  try {
    if (typeof req.file == "undefined")
      throw new Error("Provide a licence document");

    let formData = new Formdata();
    formData.append("username", req.body.username);
    formData.append("email", req.body.email);
    formData.append("phone_number", req.body.phone_number);
    formData.append("birthdate", req.body.birthdate);
    formData.append("password", req.body.password);
    formData.append("specification", req.body.specification);
    formData.append("licences", req.file.buffer, {
      // contentType: "buffer",
      filename: `${req.file.fieldname}.${req.file.mimetype}`,
    });

    const APIres = await fetch(`${endpoint}doctor/reg/`, {
      method: "POST",
      body: formData,
    });
    res.statusCode = APIres.status;
    res.send(await APIres.json());
  } catch (e) {
    res.send({ error: Error(e).message });
  }
});

module.exports = router;
