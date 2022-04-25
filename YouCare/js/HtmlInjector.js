var loadingHtml = true;

document.addEventListener("DOMContentLoaded", function () {
  let includesElements = document.getElementsByTagName("include");

  for (let element = 0; element < includesElements.length; element++) {
    let includeTag = includesElements[element];
    // console.log(includeTag.getAttribute("src"));
    fetchHTML(includeTag.getAttribute("src"), (e) => {
      includeTag.insertAdjacentHTML("afterend", e);
      includeTag.remove();
    });
  }

  loadingHtml = false;
});

function fetchHTML(dir, func) {
  fetch(dir)
    .then((response) => response.text())
    .then((data) => func(data));
}
