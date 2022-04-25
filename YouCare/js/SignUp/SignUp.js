function hideMoreInfo(params) {
  console.log(params);
  let moreToggle = document.getElementById("moreInfo");
  let element = moreToggle.getElementsByClassName("moreInfo");

  if (typeof params == "undefined") {
    for (let index = 0; index < element.length; index++) {
      let infoElement = element[index];
      infoElement.style.display = "none";
    }
    return;
  }

  if (params >= element.length) return;

  let infoElement = element[params];
  infoElement.style.display = "none";
}

function ShowMoreInfo(params) {
  console.log(params);
  let moreToggle = document.getElementById("moreInfo");
  let element = moreToggle.getElementsByClassName("moreInfo");

  if (typeof params == "undefined") {
    for (let index = 0; index < element.length; index++) {
      let infoElement = element[index];
      infoElement.style.display = "block";
    }
    return;
  }

  if (params >= element.length) return;

  let infoElement = element[params];

  infoElement.style.display = "block";
  infoElement.style.height = "0";
  infoElement.style.height = "100%";

  for (let index = 0; index < element.length; index++) {
    if (index !== params) {
      let infoElement = element[index];
      infoElement.style.display = "none";
    }
  }
}

let form = document.getElementById("SignUpForm");
let selector = document.getElementById("accTye");

let UserNamefield = document.getElementById("UserName");
let UserEmailfield = document.getElementById("UserEmail");
let PhoneNofield = document.getElementById("PhoneNo");
let Birth_Datefield = document.getElementById("Birth_Date");

let docSpecfield = document.getElementById("docSpec");
let doctor_licensefield = document.getElementById("doctor_license");

let passwordfield = document.getElementById("password");
let confirmpasswordfield = document.getElementById("confirmpassword");

let H_Namefield = document.getElementById("H_name");
let H_emailfield = document.getElementById("H_email");
let H_addressfield = document.getElementById("H_Address");

selector.addEventListener("change", () => {
  // console.log(selector.value);
  let form = document.getElementById("SignUpForm");
  if (selector.value == "patient") {
    hideMoreInfo();
  } else if (selector.value == "doctor") {
    ShowMoreInfo(0);
  } else if (selector.value == "hospital_manager") {
    ShowMoreInfo(1);
  }
});

function validateForm() {
  // console.log(UserNamefield.value);
  // console.log(UserEmailfield.value);
  // console.log(PhoneNofield.value);
  // console.log(Birth_Datefield.value);

  try {
    if (passwordfield.value != confirmpasswordfield.value) {
      new Toast(
        "password missmatch",
        "password should be match",
        "bi-x-circle",
        5000
      );
      return false;
    }
    if (selector.value == "patient") {
      //
      //
      //
      let reqObj = {
        user: {
          username: UserNamefield.value,
          email: UserEmailfield.value,
          phone_number: PhoneNofield.value,
          birthdate: Birth_Datefield.value,
          password: passwordfield.value,
        },
      };

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      ApiCall({
        endpoint: "API/patient/register",
        on_200: (data) => {
          new Toast(
            "Successful",
            "Patient registration successful",
            "bi-check-circle text-primary"
          );
          form.reset();
        },
        on_400: () => {
          new Toast(
            "Error",
            "Patient registration Unsuccessful",
            "bi-x-circle text-danger"
          );
        },
        requestOptions: {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(reqObj),
        },
      });
      //
      //
      //
      //
    } else if (selector.value == "doctor") {
      if (doctor_licensefield.files.length == 0) {
        new Toast(
          "Fill all the fields",
          "licences document required",
          "bi-x-circle text-danger",
          5000
        );
        throw "input error";
      }
      if (docSpecfield.value == "") {
        new Toast(
          "Fill all the fields",
          "Specification field required",
          "bi-x-circle text-danger",
          5000
        );
        throw "input error";
      }
      let filename = doctor_licensefield.files[0].name.split(".");

      let data = new FormData();
      data.append(
        "licences",
        new Blob(
          [doctor_licensefield.files[0]],
          {
            type: filename[filename.length - 1],
          },
          "licences.jpg"
        )
      );
      data.append("username", UserNamefield.value);
      data.append("email", UserEmailfield.value);
      data.append("phone_number", PhoneNofield.value);
      data.append("birthdate", Birth_Datefield.value);
      data.append("password", passwordfield.value);
      data.append("specification", docSpecfield.value);

      ApiCall({
        endpoint: "API/doctor/register",
        on_200: (data) => {
          new Toast(
            "Successful",
            "Doctor registration successful",
            "bi-check-circle text-primary",
            5000
          );
        },
        on_400: (data) => {
          new Toast(
            "Error",
            JSON.stringify(data)
              .split('"')
              .filter((word) => word.match(/[\w]+/g))
              .join(" <br>"),
            "bi-x-circle text-danger",
            5000
          );
        },
        requestOptions: {
          method: "POST",
          body: data,
        },
      });
    } else if (selector.value == "hospital_manager") {
      // console.log(H_Namefield.value);
      // console.log(H_emailfield.value);
      // console.log(H_addressfield.value);
      let data = new FormData();
      data.append("username", UserNamefield.value);
      data.append("email", UserEmailfield.value);
      data.append("phone_number", PhoneNofield.value);
      data.append("birthdate", Birth_Datefield.value);
      data.append("password", passwordfield.value);
      data.append("hospitalName", H_Namefield.value);
      data.append("Organization_Email_Address", H_emailfield.value);
      data.append("Organization_Address", H_addressfield.value);

      ApiCall({
        endpoint: "API/hospitalManager/register",
        on_200: (data) => {
          new Toast(
            "Successful",
            "hospital manager registration successful",
            "bi-check-circle text-primary",
            5000
          );
        },
        on_400: (data) => {
          new Toast(
            "Error",
            JSON.stringify(data)
              .split('"')
              .filter((word) => word.match(/[\w]+/g))
              .join(" <br>"),
            "bi-x-circle text-danger",
            5000
          );
        },
        requestOptions: {
          method: "POST",
          body: data,
        },
      });
    }
  } catch (error) {
    console.log(Error(error).message);
  }

  // console.log(passwordfield.value);
  // console.log(confirmpasswordfield.value);

  return false;
}
