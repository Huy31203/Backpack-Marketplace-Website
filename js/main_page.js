const navToggleOn = document.querySelector(".fa-bars");
const navToggleOff = document.querySelector(".fa-xmark");
const navLink = document.querySelectorAll(".mobilenav__item");
const backontop = document.querySelector(".backontop");
const signIn = document.querySelector("#sign-in");
const signUp = document.querySelector("#sign-up");
const forgot = document.querySelector("#forgot-pass");
const searchInpMain = document.querySelector(".search-inp");
const searchButtonMain = document.querySelector(".search-btn");

document.querySelector(".navOn").addEventListener("click", navFunctionOn);

function navFunctionOn() {
  document.body.classList.toggle("mobilenav-open");
}

document.querySelector(".navOff").addEventListener("click", navFunctionOff);

function navFunctionOff() {
  document.body.classList.toggle("mobilenav-open");
}

document
  .querySelector("#signup-btn")
  .addEventListener("click", signupShowFunction);

function signupShowFunction() {
  signIn.style.display = "none";
  forgot.style.display = "none";
  signUp.style.display = "block";
}

document
  .querySelector("#signin-btn")
  .addEventListener("click", signupHiddenFunction);
document
  .querySelector("#sign-up-submit")
  .addEventListener("click", signupHiddenFunction);

function signupHiddenFunction() {
  signUp.style.display = "none";
  signIn.style.display = "block";
  forgot.style.display = "block";
}

navLink.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("mobilenav-open");
  });
});

document.querySelector(".backontop").addEventListener("click", topFunction);

function topFunction() {
  window.scroll(0, 0);
}

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    backontop.style.display = "inline-block";
  } else {
    backontop.style.display = "none";
  }
}

searchInpMain.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    searchButtonMain.click();
  }
});

searchButtonMain.addEventListener("click", function (event) {
  if (!String(window.location.href).includes("all_backpack.html") ||
    String(window.location.href).includes("female_backpack.html") ||
    String(window.location.href).includes("male_backpack.html")) {
    localStorage.setItem("SearchValue", searchInpMain.value);
    window.location.href = "all_backpack.html";
  }
});
