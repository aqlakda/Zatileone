class ProductCard extends HTMLElement {
  constructor() {
    super();

    const images = this.querySelectorAll(".card__media img");
    if (images && images.length > 1) {
      this.querySelector(".card__inner").addEventListener("click", e => {
        images[0].classList.add("hide-img");
        images[1].classList.add("show-img");
        setTimeout(function(){
          images[0].classList.remove("hide-img");
          images[1].classList.remove("show-img");
        },3000);
      });
    }
  }
}

customElements.define('product-card', ProductCard);