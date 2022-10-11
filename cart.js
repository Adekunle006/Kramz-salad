let label = document.getElementById("label");

let shoppingCart = document.getElementById("shopping-cart");

let Basket = JSON.parse(localStorage.getItem("data")) || [];

calculation = () => {
  let cartValue = document.querySelector(".cart-value");

  cartValue.innerHTML = Basket.map((x) => x.item).reduce((x, y) => x + y, 0);

  // console.log (Basket.map((x)=> x.item).reduce((x,y)=> x+y ,0))
};

calculation();

let getShoppingItems = () => {
  if (Basket.length !== 0) {
    return (shoppingCart.innerHTML = Basket.map((x) => {
      let { id, item } = x;

      let search = shopItemData.find((y) => y.id === id) || [];

      return `
        
            <div class = "cart-item" >
            
           <img src = "${search.img}" style =" width :120px ; height:120px ;" >

           <div class = "details" >

           <div class = "price-tittle-x">

           <h4 class = "price-tittle">
           <p class = "product">${search.name}</p>
           <p class ="btn btn-primary"> <i class="fa-solid fa-naira-sign"></i>${
             search.price
           }</p>
           </h4>

           <i onclick = "removeItem(${id})" class="fas fa-times times"></i>

           </div>

           <div class="button ">
                    <i onclick = "decrement(${id})" class="fas fa-minus"></i>
                    <p id = "${id}">${item}</p>
                    <i onclick = "increment(${id})" class="fas fa-plus"></i>
            </div>

           <h3><i class="fa-solid fa-naira-sign"></i>${item * search.price}</h3>

           </div>

            </div>

            `;
    }).join(" "));
  } else {
    shoppingCart.innerHTML = ``;

    label.innerHTML = `
     <h2>The cart is Empty !</h2>
     <a href = "index.html" >
     <button class ="btn btn-primary" >Go Back Home </button>
     </a>
    `;
  }
};

getShoppingItems();

let increment = (id) => {
  let selectedindex = id;

  let search = Basket.find((x) => x.id === selectedindex.id);

  if (search === undefined) {
    Basket.push({
      id: selectedindex.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  // console.log (Basket) ;

  getShoppingItems();

  update(selectedindex.id);

  localStorage.setItem("data", JSON.stringify(Basket));
};

let decrement = (id) => {
  let selectedindex = id;

  let search = Basket.find((x) => x.id === selectedindex.id);

  if (search === undefined) return;

  if (search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }

  update(selectedindex.id);

  Basket = Basket.filter((x) => x.item !== 0);

  //console.log (Basket) ;

  getShoppingItems();

  localStorage.setItem("data", JSON.stringify(Basket));
};

let update = (id) => {
  let search = Basket.find((x) => x.id === id);

  // console.log (search.item)

  document.getElementById(id).innerHTML = search.item;

  calculation();

  totalAmount();
};

let removeItem = (id) => {
  let selectedindex = id;

  Basket = Basket.filter((x) => x.id !== selectedindex.id);

  getShoppingItems();

  totalAmount();

  calculation();

  localStorage.setItem("data", JSON.stringify(Basket));
};

let clearCart = () => {
  Basket = [];

  getShoppingItems();

  calculation();

  localStorage.setItem("data", JSON.stringify(Basket));
};

let totalAmount = () => {
  if (Basket.length !== 0) {
    let Amount = Basket.map((x) => {
      let { item, id } = x;
      let search = shopItemData.find((y) => y.id === id) || [];
      return item * search.price;
    }).reduce((x, y) => x + y, 0);

    label.innerHTML = `
        <h2>Total Amount :<i class="fa-solid fa-naira-sign">${Amount}</h2>

        <button class = "check-out btn btn-primary">check out</button>
        <button onclick = "clearCart()" class = "clear-cart btn btn-primary">clear cart</button>
        
    `;
  } else {
    return;
  }
};

totalAmount();
