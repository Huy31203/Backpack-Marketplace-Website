import products from "./productList.js";
import { AddToCartHovered } from "./AddToCartHoveredHandler.js";
import AmountProducts from "./AmountProductsHandler.js";

const featureProduct = document.querySelector(".feature-product");
const newProduct = document.querySelector(".new-arrival-product");

AmountProducts();

function renderFeatureProducts(products) {
  let htmlString = ``;
  for (let i = 0; i < 4; i++) {
    htmlString += `
    <div class="feature-product-wrapper" id=${products[i].id}>
      <div class="img-wrapper">
          <a href="/product_detail.html?id=${products[i].id}" class="feature-product__item">
              <img class="product-img" src="${products[i].img}" alt="">
          </a>
      </div>
      <div class="meta-wrapper">
          <a href="/product_detail.html?id=${products[i].id}" class="meta-text">${products[i].name}</a>
      </div>
      <div class="price-wrapper">
          <h5 class="first-price-num">${products[i].firstPrice}₫</h5>
          <h3 class="price-num">${products[i].Price}<span class="currency">₫</span></h3>
      </div>
      <div class="products__image-hovered">
          <span class="products__item-cart">
              <i class="fa-solid fa-cart-plus" id="${products[i].id}"></i>
          </span>
      </div>
    </div>   
      `;
  }
  featureProduct.innerHTML = htmlString;
}

function renderNewProducts(products) {
  let htmlString = ``;
  for (let i = 8; i < 12; i++) {
    htmlString += `
    <div class="new-arrival-product-wrapper" id=${products[i].id}>
      <div class="img-wrapper">
          <a href="/product_detail.html?id=${products[i].id}" class="new-arrival-product__item">
              <img class="product-img" src="${products[i].img}" alt="">
          </a>
      </div>
      <div class="meta-wrapper">
          <a href="/product_detail.html?id=${products[i].id}" class="meta-text">${products[i].name}</a>
      </div>
      <div class="price-wrapper">
          <h5 class="first-price-num">${products[i].firstPrice}₫</h5>
          <h3 class="price-num">${products[i].Price}<span class="currency">₫</span></h3>
      </div>
      <div class="products__image-hovered">
          <span class="products__item-cart">
              <i class="fa-solid fa-cart-plus" id="${products[i].id}"></i>
          </span>
      </div>
    </div>   
      `;
  }
  newProduct.innerHTML = htmlString;
}
renderFeatureProducts(products);
renderNewProducts(products);

const addBtns = document.querySelectorAll(".fa-cart-plus");

addBtns.forEach((addBtn) => {
  addBtn.addEventListener('click', () => {
    AddToCartHovered(addBtn);
  });
});