import products from "./productList.js";
import { AddToCartHovered } from "./AddToCartHoveredHandler.js";
import AmountProducts from "./AmountProductsHandler.js";

let item = products.length;
let itemPerPage = 12;
let currentPage = 1;
let start = 0;
let end = itemPerPage;
let htmlString = ``;
let pageString = ``;
let totalPage;

function countTotalPage(item, itemPerPage) {
  totalPage = 0;
  for (let i = 0; i < item; i += itemPerPage) {
    totalPage++;
  }
}

countTotalPage(item, itemPerPage);

const productPlace = document.querySelector(".all-product-list");
const paginationPlace = document.querySelector(".page-wrapper");
const p1 = document.querySelector("#page1");
const p2 = document.querySelector("#page2");
const searchInp = document.querySelector(".search-inp");
const searchButton = document.querySelector(".search-btn");
const nextBtn = document.querySelector("#next-btn");
const backBtn = document.querySelector("#back-btn");
const Sort = document.querySelector("#sort");

window.addEventListener("load", (event) => {
  let SearchValue = localStorage.getItem("SearchValue");
  localStorage.removeItem("SearchValue");
  if (SearchValue !== null && SearchValue !== "") {
    search(SearchValue);
  }
});

AmountProducts();

function renderProducts(products) {
  htmlString = ``;
  start = (currentPage - 1) * itemPerPage;
  end = currentPage * itemPerPage;
  const content = products.map((item, index) => {
    if (index >= start && index < end) {
      if (item.firstPrice == "") {
        htmlString += `
        <div class="all-product-list-wrapper" id="${item.id}">
                <div class="img-wrapper">
                    <a href="/product_detail.html?id=${item.id}" class="all-product-list__item">
                        <img class="product-img"
                            src="${item.img}"
                            alt="">
                    </a>
                </div>
                <div class="meta-wrapper">
                    <a href="/product_detail.html?id=${item.id}" class="meta-text">${item.name}</a>
                </div>
                <div class="price-wrapper">
                    <h3 class="price-num">${item.Price}<span class="currency">₫</span></h3>
                </div>
                <div class="products__image-hovered">
                    <span class="products__item-cart">
                        <i class="fa-solid fa-cart-plus" id="${item.id}"></i>
                    </span>
                </div>
            </div> 
      `;
      } else {
        htmlString += `
      <div class="all-product-list-wrapper" id="${item.id}">
              <div class="img-wrapper">
                  <a href="/product_detail.html?id=${item.id}" class="all-product-list__item">
                      <img class="product-img"
                          src="${item.img}"
                          alt="">
                  </a>
              </div>
              <div class="meta-wrapper">
                  <a href="/product_detail.html?id=${item.id}" class="meta-text">${item.name}</a>
              </div>
              <div class="price-wrapper">
                  <h5 class="first-price-num">${item.firstPrice}₫</h5>
                  <h3 class="price-num">${item.Price}<span class="currency">₫</span></h3>
              </div>
              <div class="products__image-hovered">
                  <span class="products__item-cart">
                      <i class="fa-solid fa-cart-plus" id="${item.id}"></i>
                  </span>
              </div>
          </div>    
      `;
      }
    }
    productPlace.innerHTML = htmlString;

    const addBtns = document.querySelectorAll(".fa-cart-plus");

    addBtns.forEach((addBtn) => {
      addBtn.addEventListener("click", () => {
        AddToCartHovered(addBtn);
      });
    });
  });
}

renderProducts(products);

function renderListPage() {
  pageString = ``;
  pageString += `<span class="page__item active" id="page1">1</span>`;
  for (let i = 2; i <= totalPage; i++) {
    pageString += `<span class="page__item" id="page${i}">${i}</span>`;
  }
  paginationPlace.innerHTML = pageString;
}

renderListPage();

function changePage(products) {
  const pageList = document.querySelectorAll(".page-wrapper span");
  for (let i = 0; i < pageList.length; i++) {
    pageList[i].addEventListener("click", () => {
      const value = i + 1;
      document.querySelector(`#page${currentPage}`).className = "page__item";
      document.querySelector(`#page${value}`).className = "page__item active";
      currentPage = value;
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
      renderProducts(products);
    });
  }
}


changePage(products);

nextBtn.addEventListener("click", () => {
  if (end < item) {
    document.querySelector(`#page${currentPage}`).className = "page__item";
    currentPage++;
    document.querySelector(`#page${currentPage}`).className =
      "page__item active";
    start = (currentPage - 1) * itemPerPage;
    end = currentPage * itemPerPage;
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    renderProducts(products);
  }
});

backBtn.addEventListener("click", () => {
  if (start != 0) {
    document.querySelector(`#page${currentPage}`).className = "page__item";
    currentPage--;
    document.querySelector(`#page${currentPage}`).className =
      "page__item active";
    start = (currentPage - 1) * itemPerPage;
    end = currentPage * itemPerPage;
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    renderProducts(products);
  }
});

function sort(products) {
  Sort.addEventListener("change", () => {
    const productsSorted = products.slice();
    let value = Sort.value;
    if (value == "low-high") {
      productsSorted.sort(byPrice);
      renderProducts(productsSorted);
      changePage(productsSorted);
    } else if (value == "high-low") {
      productsSorted.sort(byPrice);
      renderProducts(productsSorted.reverse());
      changePage(productsSorted);
    } else {
      renderProducts(products);
      changePage(products);
    }
  });
}

function byPrice(a, b) {
  let aPrice = parseInt(a.Price.split(".").join(""));
  let bPrice = parseInt(b.Price.split(".").join(""));
  if (aPrice > bPrice) return 1;
  else if (aPrice < bPrice) return -1;
  else return 0;
}

sort(products);

searchInp.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    searchButton.click();
  }
});

searchButton.addEventListener("click", () => {
  search(searchInp.value);
});

function search(value) {
  let count = 0;
  let searchedProduct = [];
  htmlString = ``;
  productPlace.innerHTML = htmlString;
  products.forEach((p) => {
    let name = p.name.toUpperCase();
    if (value !== null && value != "") {
      if (name.includes(value.toUpperCase())) {
        count++;
        searchedProduct.push(p);
      }
    }
  });
  item = count;
  if (count > 0) {
    countTotalPage(item, itemPerPage);
    renderProducts(searchedProduct);
    renderListPage();
    changePage(searchedProduct);
    sort(searchedProduct);
    searchedProduct = [];
  } else {
    totalPage = 1;
    renderListPage();
  }
}