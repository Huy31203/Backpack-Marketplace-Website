export default function AmountProducts() {
  let lists = [{}];
  lists = JSON.parse(localStorage.getItem("CartList"));
  if (lists.length == 0 || lists === null) {
    document.querySelector(".product-number-wrapper").style.display = "none";
  } else {
    let amount = 0;
    lists.forEach((item) => {
      amount += item.Quantity;
    });
    document.querySelector(".product-number-wrapper").style.display = "flex";
    document.querySelector(".product-number").innerHTML = String(amount);
  }
}
