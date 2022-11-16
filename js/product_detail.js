import products from "./productList.js";
import QuantityChangeHandler from "./QuantityChangeHandler.js";
import { AddToCartHovered } from "./AddToCartHoveredHandler.js";

let htmlString = ``;

let params = new URL(document.location).searchParams;
const productID = parseInt(params.get("id"));

const similarProduct = document.querySelector(".similar-product__wrapper");
const ProductDetailPlace = document.querySelector(".product-detail");

function renderProducts(products) {
  htmlString = `
  <div class="product-detail__item" id="${productID}">
    <div class="product-detail__image"><img
            src="${products[productID - 1].img}" alt="">
    </div>
    <div class="product-detail__info">
        <div class="product-detail__name">${products[productID - 1].name}</div>
        <div class="product-details__price-wrapper">
            <span class="product-detail__first-price">${
              products[productID - 1].firstPrice
            }₫</span>
            <span class="product-detail__price">${
              products[productID - 1].Price
            }<span class="currency">₫</span></span>
        </div>
        <div class="product-detail__desc">${products[productID - 1].desc}</div>
        <div class="product-details__buy-wrapper">
            <div class="product-details__quantity">
                <span class="product-details__btn-quantity minus">-</span>
                <input type="number" min="1" value="1" class="product-details__input-quantity">
                <span class="product-details__btn-quantity plus">+</span>
            </div>
            <button class="product-details__add-btn"><i class="fa-solid fa-cart-shopping"></i> ADD TO
                CART</button>
        </div>
    </div>
  </div>`;
  ProductDetailPlace.innerHTML = htmlString;
}

renderProducts(products);

const addToCart = document.querySelector(".product-details__add-btn");


addToCart.addEventListener("click", addToCart_func);


function addToCart_func() {
  let quantity = parseInt(
    document.querySelector(".product-details__input-quantity").value
  );
  let flag = 1;
  let cartProducts = JSON.parse(localStorage.getItem("CartList"));
  if (cartProducts === null) {
    cartProducts = [
      {
        id: products[productID - 1].id,
        img: products[productID - 1].img,
        name: products[productID - 1].name,
        desc: products[productID - 1].desc,
        firstPrice: products[productID - 1].firstPrice,
        Price: products[productID - 1].Price,
        Quantity: quantity,
      },
    ];
    localStorage.setItem("CartList", JSON.stringify(cartProducts));
    flag = 0;
  } else {
    for (let i = 0; i < cartProducts.length; i++) {
      if (cartProducts[i].id == productID) {
        if (quantity >= 1) {
          cartProducts[i].Quantity += quantity;
          localStorage.setItem("CartList", JSON.stringify(cartProducts));
        }
        flag = 0;
      }
    }
    if (flag) {
      cartProducts.push({
        id: products[productID - 1].id,
        img: products[productID - 1].img,
        name: products[productID - 1].name,
        desc: products[productID - 1].desc,
        firstPrice: products[productID - 1].firstPrice,
        Price: products[productID - 1].Price,
        Quantity: quantity,
      });
      localStorage.setItem("CartList", JSON.stringify(cartProducts));
    }
  }
}

const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const quantityInp = document.querySelector(".product-details__input-quantity");

QuantityChangeHandler(plus, minus, quantityInp);

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

function ramdomProduct(products) {
  let item = products.random();
  return `<div class="similar-product__item" id="${item.id}">
        <div class="similar-product__image-wrapper">
            <a href="/product_detail.html?id=${item.id}" class="similar-product__image-link">
                <img class="similar-product__image"
                    src="${item.img}"
                    alt="">
            </a>
        </div>
        <div class="similar-product__name-wrapper">
            <a href="/product_detail.html?id=${item.id}" class=".similar-product__name">${item.name}</a>
        </div>
        <div class="similar-product__price-wrapper">
            <h5 class="similar-product__first-price">${item.firstPrice}</h5>
            <h3 class="similar-product__price">${item.Price}<span class="currency">₫</span></h3>
        </div>
        <div class="similar-product__image-hovered">
            <span class="similar-product__item-cart">
                <i class="fa-solid fa-cart-plus" id="${item.id}"></i>
            </span>
        </div>
    </div>`;
}

function renderSimilarProducts(products) {
  let count = 0;
  htmlString = ``;
  while (count < 4) {
    let html = ramdomProduct(products);
    if (!htmlString.includes(html) && !html.includes(`id="${productID}"`)) {
      htmlString += html;
      count++;
    }
  }
  similarProduct.innerHTML = htmlString;
}

renderSimilarProducts(products);

const addBtns = document.querySelectorAll(".fa-cart-plus");

addBtns.forEach((addBtn) => {
  addBtn.addEventListener('click', () => {
    AddToCartHovered(addBtn);
  });
});

QuantityChangeHandler();
