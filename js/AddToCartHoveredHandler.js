import AmountProducts from "./AmountProductsHandler.js";
import products from "./productList.js";

function AddToCartHovered(addBtn) {
  let flag = 1;
  let cartProducts = JSON.parse(localStorage.getItem("CartList"));
  if (cartProducts === null) {
    cartProducts = [
      {
        id: products[addBtn.id - 1].id,
        img: products[addBtn.id - 1].img,
        name: products[addBtn.id - 1].name,
        desc: products[addBtn.id - 1].desc,
        firstPrice: products[addBtn.id - 1].firstPrice,
        Price: products[addBtn.id - 1].Price,
        Quantity: 1,
      },
    ];
    localStorage.setItem("CartList", JSON.stringify(cartProducts));
    flag = 0;
  } else {
    for (let i = 0; i < cartProducts.length; i++) {
      if (cartProducts[i].id == addBtn.id) {
        cartProducts[i].Quantity += 1;
        localStorage.setItem("CartList", JSON.stringify(cartProducts));
        flag = 0;
      }
    }
  }
  if (flag) {
    cartProducts.push({
      id: products[addBtn.id - 1].id,
      img: products[addBtn.id - 1].img,
      name: products[addBtn.id - 1].name,
      desc: products[addBtn.id - 1].desc,
      firstPrice: products[addBtn.id - 1].firstPrice,
      Price: products[addBtn.id - 1].Price,
      Quantity: 1,
    });
    localStorage.setItem("CartList", JSON.stringify(cartProducts));
  }
  AmountProducts();
}


export { products, AddToCartHovered };
