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
		<button type="button" class="btn btn-warning">skip</button>
		<button type="button" class="btn btn-primary">Add to cart</button>
	  </div>
	</div>`;
};

window.onload = () => {
  const addToCart = (data) => {
    let cards = document.getElementsByClassName("card");
    let addToCartBtn = document.getElementsByClassName("btn-primary");
    let cart = document.querySelector(".cart");
    for (let i = 0; i < addToCartBtn.length; i++) {
      addToCartBtn[i].addEventListener("click", function () {
        cards[i].style.background = "grey";
        cart.classList.remove("d-none");
        let p = document.createElement("p");
        p.innerText = data[i].title;
        cart.appendChild(p);
      });
    }
  };
  const skipBook = () => {
    let cards = document.getElementsByClassName("card");
    let skipBtn = document.getElementsByClassName("btn-warning");
    for (let i = 0; i < skipBtn.length; i++) {
      skipBtn[i].addEventListener("click", function () {
        cards[i].remove();
      });
    }
  };
  const searchBooks = (titles) => {
    let input = document.querySelector(".form-control");
    console.log(titles);
    input.addEventListener("input", function (e) {
      if (input.value.length > 2) {
        console.log("searching", input.value);
        // fussy search, Pant returns true
        let result = titles.some((t) => (t = input.value));
        console.log(result);
      }
    });
  };
  const addBooks = function (data) {
    let tmp = document.createElement("div");
    // building an titles array here
    let titles = [];
    data.forEach((o) =>
      titles.push(
        Object.entries(o)
          .filter((e) => e[0] === "title")
          .map((e) => e[1])
      )
    );
    titles = titles.flat();
    tmp.classList += "container row no-gutter";
    // this foreach can take some time
    data.forEach(
      (d, index) =>
        (tmp.innerHTML += createCards(d.asin, d.title, d.img, d.price, index))
    );
    document.querySelector(".container").appendChild(tmp);
    addToCart(data);
    skipBook();
    searchBooks(titles);
  };
  const loadBooks = function () {
    fetch("https://striveschool-api.herokuapp.com/books", { method: "GET" })
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => addBooks(data))
      .catch((error) => console.log(error));
  };
  loadBooks();
};
