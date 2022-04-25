const express = require("express");
const needle = require("needle");
const { cookie2Dict, CreateAuthHeader } = require("../AuthLib.js");
// const multer = require("multer");
// const upload = multer();

const router = express.Router();
// router.use(upload.array());

const endpoint = "http://127.0.0.1:8080/";

router.get("/", async (req, res) => {
  if (typeof req.headers.cookie == "undefined") {
    res.statusCode = 400;
    res.send({ error: "Allow cookies or sign in first" });
    return;
  }
  let cookies = cookie2Dict(req.headers.cookie);

  try {
    const APIres = await needle(
      "post",
      `${endpoint}user/RefreshToken/`,
      { refresh: cookies.refresh },
      { json: true }
    );

    const data = APIres.body;

    if (APIres.statusCode == 200) {
      res.append("set-cookie", `access=${data.access};httponly;path=/`);

      res.statusCode = 200;
      res.send(APIres.body);

      return;
    }
    res.statusCode = APIres.statusCode;
    res.send(data);
  } catch (err) {
    res.statusCode = 401;
    res.send({ error: "something want wrong" });
  }
});

module.exports = router;
