function cookie2Dict(cookies) {
  if (typeof cookies == "undefined") {
    throw "undefined input param";
  }
  let list = String(cookies).split(";");

  let dict = {};

  list.forEach((value) => {
    let kv = value.split("=");

    dict[kv[0].trim()] = kv[1].trim();
  });

  return dict;
}

function CreateAuthHeader(cookies) {
  if (typeof cookies != "object") throw "expect a object";
  if (
    typeof cookies.refresh == "undefined" ||
    typeof cookies.access == "undefined"
  )
    throw "token not found";

  return {
    Authorization: `Bearer ${cookies.access}`,
  };
}

module.exports = {
  cookie2Dict,
  CreateAuthHeader,
};

// export { cookie2Dict, CreateAuthHeader };
