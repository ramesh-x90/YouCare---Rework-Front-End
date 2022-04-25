refreshTokenCall().then((res) => {
  if (res == 0) {
    window.open(
      "/SignIn.html",
      "",
      `width=800,height=800,resizable=no,top=100,left = ${
        window.innerWidth / 2 - 400
      }`
    );
    window.location.replace("/index.html");
  }
});
