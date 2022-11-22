const backontop = document.querySelector(".backontop");
const accountID = JSON.parse(localStorage.getItem("AccountID"));

if (accountID === null || accountID.isAdmin == false) {
  window.location.href = "/index.html";
}

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
