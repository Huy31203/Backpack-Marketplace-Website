export default function QuantityChangeHandler(plus, minus, quantityInp) {
    plus.addEventListener("click", () => {
      quantityInp.value++;
    });
    
    minus.addEventListener("click", () => {
      if (quantityInp.value > 1) quantityInp.value--;
    });
  }