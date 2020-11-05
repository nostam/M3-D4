const handleErrors = function (response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};
const createCards = function (asin, title, img, price, index) {
  return `<div class="card mx-2" style="width: 200px">
	  <img src="${img}" class="card-img-top" alt="${title}">
	  <div class="card-body" id="book${index}">
		<h5 class="card-title">${title}</h5>
		<p class="card-text">ASIN : ${asin}</p>
		<a href="#" class="btn btn-info">$ ${price}</a>
		<button type="button" class="btn btn-primary">Add to cart</button>
	  </div>
	</div>`;
};

window.onload = () => {
  const addToCart = (data) => {
    // console.table(data);
    let cards = document.getElementsByClassName("card");
    let addToCartBtn = document.getElementsByClassName("btn-primary");
    let cart = document.querySelector(".cart");
    for (let i = 0; i < 50; i++) {
      addToCartBtn[i].addEventListener("click", function () {
        cards[i].style.background = "grey";
        cart.classList.remove("d-none");
        let p = document.createElement("p");
        p.innerText = data[i].title;
        cart.appendChild(p);
      });
    }
  };
  const addBooks = function (data) {
    let tmp = document.createElement("div");
    tmp.classList = "container row no-gutter";
    data.forEach(
      (d, index) =>
        (tmp.innerHTML += createCards(d.asin, d.title, d.img, d.price, index))
    );
    document.querySelector(".container").appendChild(tmp);
    let cards = document.getElementsByClassName("card");
    let addToCartBtn = document.getElementsByClassName("btn-primary");
    addToCart(data);
  };
  const loadBooks = function () {
    fetch("https://striveschool-api.herokuapp.com/books")
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => addBooks(data))
      .catch((error) => console.log(error));
  };
  loadBooks();
};
