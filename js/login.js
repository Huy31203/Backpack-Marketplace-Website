const LOGINFORM = document.querySelector(".login-form");
const SIGNINFORM = document.querySelector("#signin-form");
const SIGNUPFORM = document.querySelector("#signup-form");
const LOGOUT = document.querySelector(".log-out");
const LOGOUTBTN = document.querySelector(".log-out-btn");

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
        isAdmin: true,
      },
    ];
    localStorage.setItem("AccountList", JSON.stringify(accounts));
  }

  if (flag == 1) {
    let account = JSON.parse(localStorage.getItem("AccountID"));
    SIGNINFORM.style.display = "none";
    SIGNUPFORM.style.display = "none";
    document.getElementById("login-btn-text").innerHTML =
      accounts[account.id].user;
    LOGOUT.style.display = "flex";

    if (account.isAdmin) {
      document.querySelector(".setting-btn").setAttribute("aria-hidden", false);
    }
  }
});

let account_index = 1;

document.querySelector("#sign-up-submit").addEventListener("click", signup);

function signup() {
  let accountObject = {
    user: document.getElementById("user-signup-inp").value,
    pass: document.getElementById("pass-signup-inp").value,
    isAdmin: false,
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
        let account = {
          id: i,
          isAdmin: accounts[i].isAdmin,
        };
        localStorage.setItem("AccountID", JSON.stringify(account));
        id = i;
        localStorage.setItem("flag", flag);
        LOGINFORM.style.display = "none";
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

LOGOUTBTN.addEventListener("click", logout);

function logout() {
  LOGOUT.style.display = "none";
  SIGNINFORM.style.display = "block";
  SIGNUPFORM.style.display = "block";
  document.getElementById("login-btn-text").innerHTML = "Login";
  document.getElementById("user-inp").value = "";
  document.getElementById("pass-inp").value = "";
  document.getElementById("user-signup-inp").value = "";
  document.getElementById("pass-signup-inp").value = "";
  flag = 0;
  localStorage.setItem("flag", flag);
  localStorage.removeItem("AccountID");
  location.reload();
}
