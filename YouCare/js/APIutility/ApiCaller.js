// include loading js in html

async function ApiCall({
  endpoint: endpoint,
  requestOptions: requestOptions,
  on_200: on_200,
  on_400: on_400,
  on_error: on_error,
}) {
  showLoading();
  try {
    const res = await fetch(endpoint, requestOptions);
    removeLoading();

    const data = await res.json();

    //on 200 http status
    if (res.status == 200) {
      if (typeof on_200 != "undefined") on_200(data);
      return data;
    } else {
      // can failed
      // case 1: not login or no cookies
      if (typeof data.error != "undefined") {
        if (
          data.error == "Allow cookies or sign in first" ||
          data.error == "invalid refresh token"
        ) {
          alert("You have to login to application again");
          window.location.replace("/SignIn.html");
        }
      }
      // case 2: 401 Unauthorized
      // call refresh token endpoint
      if (res.status == 401) {
        if ((await refreshTokenCall()) == 1) {
          return await ApiCall({
            endpoint: endpoint,
            requestOptions: requestOptions,
            on_200: on_200,
            on_400: on_400,
            on_error: on_error,
          });
        } else {
          alert("You have to login to application again");
          window.location.replace("/SignIn.html");
        }
      }
      if (typeof on_400 != "undefined") on_400(data);
    }
  } catch (error) {
    removeLoading();
    if (typeof on_error != "undefined") on_error(error);
  }
  return null;
}

async function refreshTokenCall() {
  let refreshEndpoint = "API/refresh";
  let refreshOptions = {
    method: "GET",
  };

  const refreshRes = await fetch(refreshEndpoint, refreshOptions);
  // if failed has to login
  if (refreshRes.status != 200) {
    console.log("access token refreshed failed");
    return 0;
  }
  // on refresh success remake the previous requestOptions
  // and return the new response data
  console.log("access token refreshed");
  return 1;
}
