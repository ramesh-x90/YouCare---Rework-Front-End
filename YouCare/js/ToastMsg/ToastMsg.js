var doc = document.body;
var toastDiv = document.createElement("div");
toastDiv.classList.add(
  "position-fixed",
  "bottom-0",
  "end-0",
  "p-3",
  "toastContainer"
);
toastDiv.style.zIndex = 100;

doc.appendChild(toastDiv);

class Toast {
  constructor(header, body, imgClass = "bi-app", duration = 3000) {
    this.imgClass = imgClass;
    this.header = header;
    this.body = body;
    this.duration = duration;
    let today = new Date();
    this.toastBody = document.createElement("div");
    this.toastBody.innerHTML = `
    <div class="toast show" role="alert">
    <div class="toast-header">
    <i class="bi ${this.imgClass} me-2 "></i>
      <strong class="me-auto">${this.header}</strong>
      <small>${today.getHours()}:${today.getMinutes()}</small>
    </div>
    <div class="toast-body">${this.body}</div>
  </div>`;
    this.showToast();
  }

  async showToast() {
    toastDiv.appendChild(this.toastBody);
    setTimeout(() => {
      this.ToastDestroy();
    }, this.duration);
  }

  ToastDestroy() {
    this.toastBody.remove();
  }
}
