let logOutURL = "API/logOut";
let Options = {
  method: "GET",
};

function logOut() {
  console.log("log out pressed");
  ApiCall({
    endpoint: logOutURL,
    on_200: (data) => {
      new Toast(
        `Good Bye`,
        "Sign Out successful",
        "bi-check-circle text-primary"
      );
    },
    on_400: (data) => {
      new Toast(`Error`, data.error, "bi-check-circle text-primary");
    },
    on_error: (err) => {
      new Toast(
        `Error`,
        "Some thing want wrong",
        "bi-check-circle text-primary"
      );
    },
    requestOptions: Options,
  }).then((data) => {
    showLoading();
    setTimeout(() => {
      removeLoading();
      window.location.replace("/");
    }, 5000);
  });
}
