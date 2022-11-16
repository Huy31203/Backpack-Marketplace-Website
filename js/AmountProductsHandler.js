export default function AmountProducts() {
  let lists = JSON.parse(localStorage.getItem("CartList"));
  if (lists === null) {
    lists = [];
    document.querySelector(".product-number-wrapper").style.display = "none";
  }
  if (lists.length == 0) {
    document.querySelector(".product-number-wrapper").style.display = "none";
  } else {
    let amount = 0;
    if (lists.length != 0) {
      lists.forEach((item) => {
        amount += item.Quantity;
      });
    }
    document.querySelector(".product-number-wrapper").style.display = "flex";
    document.querySelector(".product-number").innerHTML = String(amount);
  }
}
