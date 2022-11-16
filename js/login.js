const SIGNINFORM = document.querySelector("#signin-form");
const SIGNUPFORM = document.querySelector("#signup-form");
const LOGOUTBTN = document.querySelector(".log-out");

let accounts = [];
let id = -1;
let flag = 0;

// localStorage.clear();

const handleSubmit = (event) => {
  event.preventDefault();
  // call the api
};

window.addEventListener("load", (event) => {
  flag = localStorage.getItem("flag");
  accounts = JSON.parse(localStorage.getItem("AccountList"));
  if (accounts === null) {
    accounts = [
      {
        user: "huy",
        pass: "1234",
      },
    ];
    localStorage.setItem("AccountList", JSON.stringify(accounts));
  }
  id = parseInt(localStorage.getItem("AccountID"));
  if (flag == 1) {
    SIGNINFORM.style.display = "none";
    SIGNUPFORM.style.display = "none";
    document.getElementById("login-btn-text").innerHTML = accounts[id].user;
    LOGOUTBTN.style.display = "flex";
  }
});

let account_index = 1;

document.querySelector("#sign-up-submit").addEventListener("click", signup);

function signup() {
  let accountObject = {
    user: document.getElementById("user-signup-inp").value,
    pass: document.getElementById("pass-signup-inp").value,
  };
  accounts.push(accountObject);
  localStorage.setItem("AccountList", JSON.stringify(accounts));
  signin(accountObject.user, accountObject.pass);
  location.reload();
}

document.querySelector("#login-submit").addEventListener("click", () => {
  let user_inp = document.getElementById("user-inp").value;
  let pass_inp = document.getElementById("pass-inp").value;
  signin(user_inp, pass_inp);
});

function signin(user_inp, pass_inp) {
  // alert(user_inp);
  // alert(pass_inp);
  // if (user_inp == "" || pass_inp == "") return;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].user == user_inp) {
      if (accounts[i].pass == pass_inp) {
        // alert("login")
        flag = 1;
        localStorage.setItem("AccountID", i.toString());
        id = i;
        localStorage.setItem("flag", flag);
        SIGNINFORM.style.display = "none";
        SIGNUPFORM.style.display = "none";
        LOGOUTBTN.style.display = "flex";
        location.reload();
        break;
      } else {
        document.getElementById("user-inp").style.backgroundColor =
          "rgba(255, 89, 89, 0.438)";
        document.getElementById("user-inp").style.animation = "shake 0.3s";

        document.getElementById("pass-inp").style.backgroundColor =
          "rgba(255, 89, 89, 0.438)";
        document.getElementById("pass-inp").style.animation = "shake 0.3s";
        setTimeout(() => {
          document.getElementById("user-inp").style.backgroundColor = "white";
          document.getElementById("user-inp").style.animation = "none";

          document.getElementById("pass-inp").style.backgroundColor = "white";
          document.getElementById("pass-inp").style.animation = "none";
        }, 500);
      }
    } else {
      document.getElementById("user-inp").style.backgroundColor =
        "rgba(255, 89, 89, 0.438)";
      document.getElementById("user-inp").style.animation = "shake 0.3s";

      document.getElementById("pass-inp").style.backgroundColor =
        "rgba(255, 89, 89, 0.438)";
      document.getElementById("pass-inp").style.animation = "shake 0.3s";
      setTimeout(() => {
        document.getElementById("user-inp").style.backgroundColor = "white";
        document.getElementById("user-inp").style.animation = "none";

        document.getElementById("pass-inp").style.backgroundColor = "white";
        document.getElementById("pass-inp").style.animation = "none";
      }, 500);
    }
  }
}

document.querySelector(".log-out").addEventListener("click", logout);

function logout() {
  LOGOUTBTN.style.display = "none";
  SIGNINFORM.style.display = "block";
  SIGNUPFORM.style.display = "block";
  document.getElementById("login-btn-text").innerHTML = "Login/Sign up";
  document.getElementById("user-inp").value = "";
  document.getElementById("pass-inp").value = "";
  document.getElementById("user-signup-inp").value = "";
  document.getElementById("pass-signup-inp").value = "";
  flag = 0;
  localStorage.setItem("flag", flag);
  location.reload();
}
