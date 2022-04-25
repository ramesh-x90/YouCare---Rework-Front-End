function cookie2Dict(cookies) {
  if (typeof cookies == "undefined" || cookies == "" || cookies == null) {
    throw "undefined input param";
  }
  let list = String(cookies).split(";");

  let obj = {};

  list.forEach((value) => {
    let kv = value.split("=");

    obj[kv[0].trim()] = kv[1].trim();
  });

  return obj;
}
