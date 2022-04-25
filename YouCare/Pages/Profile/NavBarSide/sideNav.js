function NavBarCintroller() {
  let NavOpen = document.getElementsByClassName("SideBar")[0].offsetLeft;

  if (NavOpen == 0) {
    let navBar = document.getElementsByClassName("SideBar");
    navBar[0].style.left = "-220px";
    document.getElementsByClassName("contentModule")[0].style["margin-left"] =
      "20px";
    document.getElementById("SideNavOpen").style["left"] = "0";
  } else {
    let navBar = document.getElementsByClassName("SideBar");
    navBar[0].style.left = "0px";
    document.getElementsByClassName("contentModule")[0].style["margin-left"] =
      "240px";
    document.getElementById("SideNavOpen").style["left"] = "220px";
  }
}
