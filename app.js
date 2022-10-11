const openMenu = document.querySelector(".open");

const closeMenu = document.querySelector(".close");

const navPage = document.querySelector(".head .container nav ul");

const theme = document.querySelector(".theme");

const customizeTheme = document.querySelector(".customize-theme");

const fontSizes = document.querySelectorAll(".choose-size span");
const colorPallete = document.querySelectorAll(".choose-color span");

const root = document.querySelector(":root");

const bg1 = document.querySelector(".bg-1");
const bg2 = document.querySelector(".bg-2");
const bg3 = document.querySelector(".bg-3");



openMenu.addEventListener("click", () => {
  navPage.style.transform = "translateX(0%)";
  navPage.style.display = "flex"
  openMenu.style.display = "none";
  closeMenu.style.display = "block";
});

closeMenu.addEventListener("click", () => {
  navPage.style.transform = "translateX(100%)";
  navPage.style.display= "none"
  openMenu.style.display = "block";
  closeMenu.style.display = "none";
});

const showDate = document.querySelector(".show-date");

var day = new Date();

var today = day.toISOString();

var dateFormat = today.substr(0, 17);

const dy = dateFormat.slice(8, 10);

var dnms = day.getDay();

const mt = dateFormat.slice(5, 7);

const yr = dateFormat.substr(0, 4);

const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const month = Months[mt - 1];

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednessday",
  "Thursday",
  "Friday",
  "Saturday",
];

const dayName = dayNames[dnms];

const dateOutput =
  dayName + "," + " " + month + " " + dy + "," + " " + yr + ".";

showDate.innerHTML = dateOutput;



/* ================================customize view=========================================*/

theme.addEventListener("click", () => {
  customizeTheme.style.display = "grid";
});

const closeModal = (e) => {
  if (e.target.classList.contains("customize-theme")) {
    customizeTheme.style.display = "none";
  }
};

customizeTheme.addEventListener("click", closeModal);

const removeDot = () => {
  fontSizes.forEach((font) => {
    font.classList.remove("active");
  });
};

fontSizes.forEach((font) => {
  font.addEventListener("click", () => {
    removeDot();

    let fontSize;

    font.classList.toggle("active");

    if (font.classList.contains("font-size-1")) {
      fontSize = "10px";
    } else if (font.classList.contains("font-size-2")) {
      fontSize = "12px";
    } else if (font.classList.contains("font-size-3")) {
      fontSize = "14px";
    } else if (font.classList.contains("font-size-4")) {
      fontSize = "15px";
    } else if (font.classList.contains("font-size-5")) {
      fontSize = "17px";
    }
    document.querySelector("html").style.fontSize = fontSize;
  });
});

const removeColorActive = () => {
  colorPallete.forEach((color) => {
    color.classList.remove("active");
  });
};

colorPallete.forEach((color) => {
  color.addEventListener("click", () => {
    removeColorActive();

    color.classList.toggle("active");

    if (color.classList.contains("color-1")) {
      primaryHeu = "145";
    } else if (color.classList.contains("color-2")) {
      primaryHeu = "482";
    } else if (color.classList.contains("color-3")) {
      primaryHeu = "270";
    } else if (color.classList.contains("color-4")) {
      primaryHeu = "60";
    } else if (color.classList.contains("color-5")) {
      primaryHeu = "180";
    }
    root.style.setProperty("--primary-color-heu", primaryHeu);
  });
});

let lightColorBrightness;
let darkColorBrightness;
let whiteColorBrightness;

const changeBG = () => {
  root.style.setProperty("--light-color-lightness", lightColorBrightness);
  root.style.setProperty("--dark-color-lightness", darkColorBrightness);
  root.style.setProperty("--white-color-lightness", whiteColorBrightness);
};

bg1.addEventListener("click", () => {
  bg1.classList.add("active");
  bg2.classList.remove("active");
  bg3.classList.remove("active");
  window.location.reload();
});

bg2.addEventListener("click", () => {
  darkColorBrightness = "95%";
  whiteColorBrightness = "20%";
  lightColorBrightness = "15%";
  bg2.classList.add("active");
  bg1.classList.remove("active");
  bg3.classList.remove("active");
  changeBG();
});

bg3.addEventListener("click", () => {
  darkColorBrightness = "95%";
  whiteColorBrightness = "10%";
  lightColorBrightness = "0%";
  bg3.classList.add("active");
  bg1.classList.remove("active");
  bg2.classList.remove("active");
  changeBG();
});

/* card code view=========================================*/

let shop = document.getElementById("shop");

let Basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = Basket.find((x) => x.id === id) || [];
      return `
    <div id = "product-id-${id}" class="item card">
    <img src="${img}" alt="">
    <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
            <h2> <i class="fa-solid fa-naira-sign"></i> ${price}</h2>
  
            <div class="button card">
                <i onclick = "decrement(${id})" class="fas fa-minus"></i>
                <p id = "${id}">${
        search.item === undefined ? 0 : search.item
      }</p>
                <i onclick = "increment(${id})" class="fas fa-plus"></i>
            </div>
  
        </div>
    </div>
        </div>
    `;
    })
    .join(" "));
};

generateShop();

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

  localStorage.setItem("data", JSON.stringify(Basket));
};

let update = (id) => {
  let search = Basket.find((x) => x.id === id);

  // console.log (search.item)

  document.getElementById(id).innerHTML = search.item;

  calculation();
};

calculation = () => {
  let cartValue = document.querySelector(".cart-value");

  cartValue.innerHTML = Basket.map((x) => x.item).reduce((x, y) => x + y, 0);

  // console.log (Basket.map((x)=> x.item).reduce((x,y)=> x+y ,0))
};

calculation();

//https://github.com/Adekunle006/Kramz-salad.git



