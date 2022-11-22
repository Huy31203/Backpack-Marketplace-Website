import products from "./productList.js";

let accounts = JSON.parse(localStorage.getItem("AccountList"));
let htmlString = ``;

let params = new URL(document.location).searchParams;
const page = params.get("p");

const accountsPlace = document.querySelector(
  ".setting-section__accounts-wrapper"
);
const productsPlace = document.querySelector(
  ".setting-section__products-wrapper"
);

const addProductBtn = document.querySelector(
  ".setting-section__add-btn-wrapper"
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

function renderProducts(products) {
  htmlString = ``;
  products.forEach((product) => {
    htmlString += `
    <div class="setting-section__product-wrapper" id="${product.id}">
      <div class="setting-section__info-wrapper">
          <div class="setting-section__img-wrapper">
              <img src="${product.img}" alt="">
          </div>
          <div class="setting-section__meta-wrapper">
              <div class="setting-section__meta-text">${product.name}</div>
              <div class="setting-section__meta-price">${product.Price}<span class="currency">đ</span></div>
          </div>
      </div>
      <div class="setting-section__btn-wrapper">
          <span class="setting-section__delete-btn" id="${product.id}">Delete</span>
          <span class="setting-section__update-btn" id="${product.id}">Update</span>
      </div>
    </div>`;
  });
  productsPlace.innerHTML = htmlString;

  const addBtn = document.querySelector(".setting-section__add-btn-wrapper");
  addBtn.addEventListener("click", () => {
    ManageControlHidden(false);
    const createBtn = document.querySelector(".submit-btn-wrapper");
    document.querySelector(".submit-btn").innerHTML = "Create";

    createBtn.addEventListener("click", () => {
      let fPrice = `${document
        .querySelector("#fPrice-inp")
        .value.toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}.000`;
      let price = `${document
        .querySelector("#price-inp")
        .value.toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}.000`;
      let newProduct = {
        id: products.length + 1,
        name: document.querySelector("#name-inp").value,
        img: document.querySelector(".upload-img").getAttribute("src"),
        desc: document.querySelector("#desc-inp").value,
        firstPrice: fPrice,
        Price: price,
      };
      products.push(newProduct);
      // console.log(products);
      localStorage.setItem("ProductList", products);
      updateProducts(0, 0);
      ManageControlHidden(true);
    });
  });

  const deleteBtns = document.querySelectorAll(".setting-section__delete-btn");
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      updateProducts(
        products.findIndex((x) => x.id === Number(deleteBtn.id)),
        1
      );
    });
  });

  const updateBtns = document.querySelectorAll(".setting-section__update-btn");
  updateBtns.forEach((updateBtn) => {
    updateBtn.addEventListener("click", () => {
      ManageControlHidden(false);
      const update = document.querySelector(".submit-btn-wrapper");
      document.querySelector(".submit-btn").innerHTML = "Update";
      
      document.querySelector("#name-inp").value =
        products[updateBtn.id - 1].name;
      document.querySelector(
        "#img-lb"
      ).innerHTML = `<img class="upload-img" src="${products[updateBtn.id - 1].img
      }" alt="Uploaded Image">`;
      document.querySelector("#desc-inp").value = products[updateBtn.id - 1].desc;
      document.querySelector("#fPrice-inp").value = ((products[updateBtn.id - 1].firstPrice).split(".").join("")).slice(0, -3);
      document.querySelector("#price-inp").value = ((products[updateBtn.id - 1].Price).split(".").join("")).slice(0, -3);
      
      update.addEventListener("click", () => {
        let fPrice = `${document
          .querySelector("#fPrice-inp")
          .value.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}.000`;
        let price = `${document
          .querySelector("#price-inp")
          .value.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}.000`;
        let product = {
          id: updateBtn.id,
          name: document.querySelector("#name-inp").value,
          img: document.querySelector(".upload-img").getAttribute("src"),
          desc: document.querySelector("#desc-inp").value,
          firstPrice: fPrice,
          Price: price,
        };
        products[product.id - 1] = product;
        // console.log(products);
        localStorage.setItem("ProductList", products);
        updateProducts(0, 0);
        ManageControlHidden(true);
      });
    });

    const ManageCloseBtn = document.querySelector(
      ".setting-section__manage-close"
    );
    ManageCloseBtn.addEventListener("click", () => {
      ManageControlHidden(true);
    });
  });
};

function updateProducts(pos, amount) {
  products.splice(pos, amount);
  localStorage.setItem("ProductList", JSON.stringify(products));
  renderProducts(products);
}

function updateAccounts(pos) {
  accounts.splice(pos, 1);
  localStorage.setItem("AccountList", JSON.stringify(accounts));
  renderAccounts(accounts);
}

function ManageControlHidden(flag) {
  if (flag)
    document
      .querySelector(".setting-section__manage-wrapper")
      .setAttribute("aria-hidden", "true");
  else
    document
      .querySelector(".setting-section__manage-wrapper")
      .setAttribute("aria-hidden", "false");
}

const imgInp = document.querySelector("#img-inp");
let uploadImg = "";
imgInp.addEventListener("change", (event) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    document.querySelector(
      "#img-lb"
    ).innerHTML = `<img class="upload-img" src="${reader.result}" alt="Uploaded Image">`;
  });
  reader.readAsDataURL(event.target.files[0]);
});

if (page == "user" || page === null) {
  addProductBtn.style.display = "none";
  type.innerHTML = "Users";
  renderAccounts(accounts);
} else if (page == "product") {
  addProductBtn.style.display = "block";
  type.innerHTML = "Products";
  renderProducts(products);
}
