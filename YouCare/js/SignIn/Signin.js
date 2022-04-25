function SubmitForm() {
  const form = document.getElementById("signInForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  if (email.value == "" || password.value == "") {
    alert("invalid");
    return false;
  }

  const formdata = new FormData();
  formdata.append("email", email.value);
  formdata.append("password", password.value);

  var requestOptions = {
    method: "POST",
    body: formdata,
  };

  ApiCall({
    endpoint: "API/login",
    requestOptions: requestOptions,
    on_200: (data) => {
      new Toast(
        `HI ${cookie2Dict(document.cookie).username ?? ""}`,
        "login successful",
        "bi-check-circle text-primary"
      );
    },
    on_400: (data) => {
      new Toast(
        `Login Failed`,
        data.error,
        "bi-exclamation-circle-fill text-danger"
      );
    },
    on_error: (error) => {
      new Toast(
        `Login Failed`,
        "Something went wrong",
        "bi-exclamation-circle-fill text-danger"
      );
      console.log(error);
    },
  }).then((res) => {
    if (res != null) {
      showLoading();
      setTimeout(() => {
        removeLoading();
        // window.location.replace("/Profile.html");
      }, 3000);
    } else {
      email.value = "";
      password.value = "";
    }
  });

  return false;
}
