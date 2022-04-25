function showLoading() {
  const loading = document.createElement("div");
  const spiner = document.createElement("div");
  let cildrenCount = document.body.childElementCount;

  for (let i = 0; i < cildrenCount; i++) {
    if (!document.body.children[i].classList.contains("toastContainer")) {
      document.body.children[i].classList.add("blur");
    }
  }
  loading.className = "loading";
  spiner.className = "spiner";
  loading.appendChild(spiner);
  document.body.appendChild(loading);
}
function removeLoading() {
  let cildrenCount = document.body.childElementCount;

  for (let i = 0; i < cildrenCount; i++) {
    document.body.children[i].classList.remove("blur");
  }

  const loading = document.getElementsByClassName("loading");

  if (loading != null) {
    for (const e of loading) {
      e.getElementsByClassName.opacity = 0;
      e.remove();
    }
  }
}
