const express = require("express");
const needle = require("needle");

const multer = require("multer");
const upload = multer();

const router = express.Router();
// router.use(upload.array());

const endpoint = "http://127.0.0.1:8080/";

router.post("/register", upload.array(), async (req, res) => {
  try {
    const APIres = await needle(
      "post",
      `${endpoint}patient/reg/`,

      req.body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.statusCode = APIres.statusCode;
    res.send(APIres.body);
  } catch (error) {
    res.send({ error: error.message });
  }
});

module.exports = router;
