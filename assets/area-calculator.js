const lengthInput = document.querySelector("#length");
const widthInput = document.querySelector("#width");
const resultSqf = document.querySelector("#calc-result-sqf");
const resultSqm = document.querySelector("#calc-result-sqm");
const sqmField = document.querySelector("#sqm");
const boxesField = document.getElementsByName("quantity")[0];
const calcHeaderIcon = document.querySelector(".toggle-calc-area");
const calcContent = document.querySelector(".calc-content");
const addMore = document.querySelector("#add-more");
const subTotal = document.querySelector("#calc-sub-total");
const currencyFormatter = Intl.NumberFormat('en-PK', { style: "currency", currency: "PKR"});
const btnAddToCart = document.querySelector("#btn-add-to-cart");
const showActualSqm = document.querySelector(".show-actual-sqm");

const toggleAreaCalc = () => {
    let style = getComputedStyle(calcContent).display;
    if (style === "none") {
        calcContent.style.display = "grid";
        calcHeaderIcon.style.transform = "rotate(180deg)";
    } else if (style === "grid") {
        calcContent.style.display = "none";
        calcHeaderIcon.style.transform = "rotate(0deg)";
        showActualSqm.style.display = "none";
    }
}

calcHeaderIcon.addEventListener("click", toggleAreaCalc);

const updateActualSqm = (sqm, boxes) => {
  showActualSqm.innerHTML = `${sqm} is the actual sq m. for <b>(${boxes})</b> ${boxes > 1 ? 'boxes' : 'box'}`;
}

const calcBoxes = (sqm, price) => {
    let boxes = sqmField.value / sqm;
    boxesField.value = Math.ceil(boxes);
    addMore.checked = false;
    calcPrice(price);
    updateBtnCart(boxesField.value);
    let actualsqm = boxesField.value * sqm;
    actualsqm = actualsqm.toFixed(2);
    showActualSqm.style.display = "block";
    updateActualSqm(actualsqm, boxesField.value);
}

const calcSqm = (meters, price) => {
    let sqm = boxesField.value * meters;
    sqmField.value = sqm.toFixed(2);
    addMore.checked = false;
    calcPrice(price);
    updateBtnCart(boxesField.value);
    updateActualSqm(sqmField.value, boxesField.value);
}

let extra;

const addMoreSqm = (sqm, price) => {
    extra = sqmField.value * 0.1;
    sqmField.value = (parseFloat(sqmField.value) + extra).toFixed(2);
    let boxes = sqmField.value / sqm;
    boxesField.value = Math.ceil(boxes);
    calcPrice(price);
    updateBtnCart(boxesField.value);
    let actualSqm = boxesField.value * sqm;
    actualSqm = actualSqm.toFixed(2);
    updateActualSqm(actualSqm, boxesField.value);
}

const removeSqm = (sqm, price) => {
    sqmField.value = (parseFloat(sqmField.value) - extra).toFixed(2);
    let boxes = sqmField.value / sqm;
    boxesField.value = Math.ceil(boxes);
    calcPrice(price);
    updateBtnCart(boxesField.value);
    let actualSqm = boxesField.value * sqm;
    actualSqm = actualSqm.toFixed(2);
    updateActualSqm(actualSqm, boxesField.value);
}

const calcArea = (meters, price) => {
    let sqf = lengthInput.value * widthInput.value;
    resultSqf.textContent = sqf;
    let sqm =  Math.round((sqf/(10.764)) * 10) / 10;
    resultSqm.textContent = sqm;
    sqmField.value = sqm;
    calcBoxes(meters, price);
    showActualSqm.style.display = "block";
}

const calcPrice = (productPrice) => {
    let price = boxesField.value * productPrice;
    subTotal.innerHTML = currencyFormatter.format(price).replace("Rs","Rs.");
}

const addMoreFunc = (e, meters, price) => {
    const isChecked = e.target.checked;
    if (isChecked) {
        addMoreSqm(meters, price);
    } else {
        removeSqm(meters, price);
    }
};

function updateBtnCart(boxes) {
  btnAddToCart.innerHTML = `Add (${boxes}) ${boxes > 1 ? 'boxes' : 'box'} to cart`;
}