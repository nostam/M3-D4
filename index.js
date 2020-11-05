const handleErrors = function (response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};
const createCards = function (asin, title, img, price) {
  return `<div class="card" style="width: 200px">
	  <img src="${img}" class="card-img-top" alt="${title}">
	  <div class="card-body">
		<h5 class="card-title">${title}</h5>
		<p class="card-text">ASIN : ${asin}</p>
		<a href="#" class="btn btn-primary">$ ${price}</a>
	  </div>
	</div>`;
};
const addBooks = function (data) {
  let tmp = document.createElement("div");
  tmp.classList = "container row no-gutter";
  data.forEach(
    (d) => (tmp.innerHTML += createCards(d.asin, d.title, d.img, d.price))
  );
  document.body.append(tmp);
};
const loadBooks = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then(handleErrors)
    .then((response) => response.json())
    .then((data) => addBooks(data))
    .catch((error) => console.log(error));
};
loadBooks();

const addToCartBtn = () => {
  let btn = document.createElement("div");
  btn.innerHTML = `<button type="button" class="btn btn-primary">Add to cart</button>`;
  document.querySelector("h1").append(btn);
};
addToCartBtn();
window.onload = function () {};
