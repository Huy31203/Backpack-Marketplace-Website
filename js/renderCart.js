import AmountProducts from "./AmountProductsHandler.js";
import products from "./productList.js";
import QuantityChangeHandler from "./QuantityChangeHandler.js";

let htmlString = ``;
let cartLists = [];
cartLists = JSON.parse(localStorage.getItem("CartList"));

const ProductCartPlace = document.querySelector(".cart-list__table").tBodies[0];
const ProductCartHeaderPlace = document.querySelector(".cart-list__heading");
const TotalMoneyPlace = document.querySelector(".cart-list__total-money");

AmountProducts();

if (cartLists === null || cartLists.length == 0) {
  ProductCartHeaderPlace.innerHTML = "";
  document.querySelector(".cart-list__payment-wrapper").innerHTML = "";
}

function renderCartList(cartLists) {
  htmlString = ``;

  cartLists.forEach((cartList) => {
    htmlString += `
        <tr class="cart-list__row" id="${cartList.id}">
            <td class="cart-list__image">
                <a href="/product_detail.html?id=${cartList.id}"><img class="cart-list__img" src="${cartList.img}" alt="">
                </td></a>
            <td class="cart-list__product-name">${cartList.name}</td>
            <td class="cart-list__price">
                <span>${cartList.Price}<span class="currency">₫</span></span>
            </td>
            <td>
                <div class="cart-list__quantity">
                    <span id="${cartList.id}" class="cart-list__btn-quantity minus">-</span>
                    <input id="${cartList.id}" type="number" min="1" value="${cartList.Quantity}" class="cart-list__input-quantity">
                    <span id="${cartList.id}" class="cart-list__btn-quantity plus">+</span>
                </div>
            </td>
            <td class="cart-list__delete-icon">
                <span>
                    <i class="fa-solid fa-trash fa-2x" id ="${cartList.id}"></i>
                </span>
            </td>
        </tr>
        `;
  });
  //   console.log(htmlString);
  ProductCartPlace.innerHTML = htmlString;

  const deleteProducts = document.querySelectorAll(".fa-trash");
  deleteProducts.forEach((deleteProduct) => {
    deleteProduct.addEventListener("click", () => {
      let productID = -1;
      cartLists.forEach((cartList) => {
        if (JSON.stringify(cartList).includes(`"id":${deleteProduct.id}`)) {
          productID = cartLists.indexOf(cartList);
        }
      });
      updateCartLists(cartLists, productID, 1);
      if (cartLists.length == 0) {
        ProductCartHeaderPlace.innerHTML = "";
      }
    });
  });
}

function updateCartLists(cartLists, pos, amount) {
  cartLists.splice(pos, amount);
  localStorage.setItem("CartList", JSON.stringify(cartLists));
  renderCartList(cartLists);
  totalMoney();
  AmountProducts();
}

renderCartList(cartLists);

const clearCartBtn = document.querySelector(".cart-list__clear-cart-wrapper");
const proceedCheckout = document.querySelector(".cart-list__checkout-wrapper");

clearCartBtn.addEventListener("click", clearCart);
proceedCheckout.addEventListener("click", () => {
  let flag = localStorage.getItem("flag");
  if (flag == 1) {
    clearCart();
    totalMoney();
    ProductCartHeaderPlace.innerHTML = "";
  } else {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    document.querySelector(".login-form").style.display = "block";
  }
});

function clearCart() {
  cartLists = [];
  localStorage.setItem("CartList", JSON.stringify(cartLists));
  renderCartList(cartLists);
  totalMoney();
  AmountProducts();
  if (cartLists === null || cartLists.length == 0) {
    ProductCartHeaderPlace.innerHTML = "";
  }
}

function totalMoney() {
  let total = 0;
  cartLists.forEach((cartList) => {
    total += cartList.Price.split(".").join("") * cartList.Quantity;
  });
  TotalMoneyPlace.innerHTML = total
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

totalMoney();

const quantityWrapper = document.querySelectorAll(".cart-list__quantity");
quantityWrapper.forEach((quantity) => {
  let plus = quantity.querySelector(".plus");
  let pluses = quantity.querySelectorAll(".plus");
  let minus = quantity.querySelector(".minus");
  let minuses = quantity.querySelectorAll(".minus");
  let quantityInp = quantity.querySelector(".cart-list__input-quantity");
  let quantityInps = quantity.querySelectorAll(".cart-list__input-quantity");
  QuantityChangeHandler(plus, minus, quantityInp);

  quantityInps.forEach((input) => {
    input.addEventListener("change", () => {
      let lists = [{}];
      let i = 0;
      lists = JSON.parse(localStorage.getItem("CartList"));
      lists.forEach((list) => {
        if (list.id == Number(input.id)) {
          list.Quantity = Number(input.value);
          cartLists[i].Quantity = Number(input.value);
        } else i++;
      });
      localStorage.setItem("CartList", JSON.stringify(lists));
      totalMoney();
      AmountProducts();
    });
  });

  pluses.forEach((plus) => {
    plus.addEventListener("click", () => {
      let lists = [{}];
      let i = 0;
      lists = JSON.parse(localStorage.getItem("CartList"));
      lists.forEach((list) => {
        if (list.id == Number(plus.id)) {
          list.Quantity++;
          cartLists[i].Quantity++;
        } else i++;
      });
      localStorage.setItem("CartList", JSON.stringify(lists));
      console.log(cartLists);
      totalMoney();
      AmountProducts();
    });
  });

  minuses.forEach((minus) => {
    minus.addEventListener("click", () => {
      let lists = [{}];
      let i = 0;
      lists = JSON.parse(localStorage.getItem("CartList"));
      lists.forEach((list) => {
        if (list.id == Number(minus.id)) {
          list.Quantity--;
          cartLists[i].Quantity--;
        } else i++;
        localStorage.setItem("CartList", JSON.stringify(lists));
        totalMoney();
        AmountProducts();
      });
    });
  });
});
