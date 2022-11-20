let accounts = JSON.parse(localStorage.getItem("AccountList"));
let htmlString = ``;

let params = new URL(document.location).searchParams;
const page = params.get("p");

const accountsPlace = document.querySelector(
  ".setting-section__accounts-wrapper"
);
const logoutBtn = document.querySelector(".log-out-btn");
const type = document.querySelector(".type-text");

logoutBtn.addEventListener("click", () => {
  localStorage.setItem("flag", "0");
});

function renderAccounts(accounts) {
  htmlString = ``;
  for (let i = 1; i < accounts.length; i++) {
    htmlString += `
        <div class="setting-section__account-wrapper">
            <div class="account-name">${accounts[i].user}</div>
            <div class="setting-section__delete-btn-wrapper" id="${i}">
                <span class="setting-section__delete-btn">Detele</span>
            </div>
        </div>
        `;
  }
  accountsPlace.innerHTML = htmlString;

  const deleteBtns = document.querySelectorAll(
    ".setting-section__delete-btn-wrapper"
  );
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      updateAccounts(deleteBtn.id);
    });
  });
}

function updateAccounts(pos) {
  accounts.splice(pos, 1);
  localStorage.setItem("AccountList", JSON.stringify(accounts));
  renderAccounts(accounts);
}

if (page == "user" || page === null) {
  type.innerHTML = "Users";
  renderAccounts(accounts);
}
