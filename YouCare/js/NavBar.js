const markup = `
<div class="mx-lg-5 container-fluid">
  <a href="#" class="navbar-brand">
    <img
      src="Asset/us1.jpeg"
      width="30"
      style="border-radius: 10px"
    />
    <strong class="ms-3">YouCare</strong>
  </a>
  <button
    class="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <div class="navbar-nav container-fluid justify-content-end">
      <a class="nav-link mx-lg-3 AboutUs" href="#aboutUs">About Us</a>
      <a class="nav-link mx-lg-3 Services" href="#Services">Services</a>
      <a class="nav-link mx-lg-3 COVID" href="#">COVID-19</a>
      ${render()}
    </div>
  </div>
</div>

`;
document.getElementById("navbarTop").innerHTML = markup;
document.addEventListener("wheel", () => {
  var navbar = document.getElementsByClassName("navbar")[0];
  if (window.scrollY > 50) {
    navbar.style["background-color"] = "rgb(0,0,0,0.6)";
  } else {
    navbar.style["background-color"] = "black";
  }
});

function render() {
  const Nop = `
  <a class="nav-link mx-lg-3 Sign-in" href="#Siginbaner">Sign In</a>
  <a class="nav-link mx-lg-3 Sign-Up" href="#SignUpBannerID">Sign Up</a>
  `;

  try {
    let userName = cookie2Dict(document.cookie).username;
    let profileURL = "/Profile.html";

    if (typeof userName != "undefined") {
      return `
      
      <li class="nav-item dropdown mx-auto mx-lg-0 AboutUs">
      <a
        class="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <!-- dowpdown icon and text -->
        <span class=""> HI ${userName}<i class="bi bi-person ms-2"></i></span>
      </a>
      <!-- drop down item List -->
      <ul class="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
        <li>
          <a class="dropdown-item text-white" href="${profileURL}">Profile</a>
        </li>
        <li>
          <a class="dropdown-item text-white" href="#">Another action</a>
        </li>
        <li><hr class="dropdown-divider text-white" /></li>
        <li>
          <a class="dropdown-item text-white" onclick="logOut()"
            >Sign Out</a
          >
        </li>
      </ul>
    </li>
      
      `;
    }
  } catch (err) {
    console.log("cookies not found");
  }

  return Nop;
}
