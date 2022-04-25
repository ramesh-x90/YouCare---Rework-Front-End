const express = require("express");
const needle = require("needle");
const { cookie2Dict, CreateAuthHeader } = require("../AuthLib.js");
const multer = require("multer");
const upload = multer();

const router = express.Router();
// router.use(upload.array());

const endpoint = "http://127.0.0.1:8080/";

router.post("/login", upload.array(), async (req, res) => {
  console.log(req.body);
  try {
    const APIres = await needle("post", `${endpoint}user/Login/`, req.body, {
      json: true,
    });

    const data = APIres.body;

    if (APIres.statusCode == 200) {
      res.append(
        "set-cookie",
        `refresh=${data.refresh};httponly;path=/;Max-Age=${
          24 * 3600 * 5
        };SameSite=Strict`
      );
      res.append(
        "set-cookie",
        `access=${data.access};httponly;path=/;Max-Age=${
          24 * 3600 * 5
        };SameSite=Strict`
      );
      res.append(
        "set-cookie",
        `username=${data.username};path=/;Max-Age=${
          24 * 3600 * 5
        };SameSite=Strict`
      );
      res.append(
        "set-cookie",
        `id=${data.id};path=/;Max-Age=${24 * 3600 * 5};SameSite=Strict`
      );
      res.append(
        "set-cookie",
        `accountType=${data.accountType};path=/;Max-Age=${
          24 * 3600 * 5
        };SameSite=Strict`
      );

      res.statusCode = 200;
      // console.log(data);
      res.send(data);

      return;
    }
    res.statusCode = APIres.statusCode;
    res.send(data);
  } catch (err) {
    res.statusCode = 400;
    res.send({ error: Error(err).message });
  }
});

router.get("/logOut", async (req, res) => {
  try {
    if (typeof req.headers.cookie == "undefined") {
      throw "Allow cookies or sign in first";
    }
    let cookies = cookie2Dict(req.headers.cookie);

    let AuthHeader = CreateAuthHeader(cookies);
    AuthHeader.json = true;

    let options = { headers: AuthHeader };

    const APIres = await needle(
      "post",
      `${endpoint}user/LogOut/`,

      { refresh: cookies.refresh },
      options

      // AuthHeader
    );

    if (APIres.statusCode == 200) {
      res.clearCookie("refresh");
      res.clearCookie("access");
      res.clearCookie("username");
      res.clearCookie("id");
      res.clearCookie("accountType");

      res.statusCode = APIres.statusCode;
      res.send(APIres.body);

      return;
    }
    res.statusCode = APIres.statusCode;
    res.send(APIres.body);
  } catch (err) {
    res.statusCode = 401;
    res.send({ error: err });
  }
});

module.exports = router;
