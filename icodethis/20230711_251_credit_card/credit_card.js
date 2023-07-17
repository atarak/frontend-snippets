const templateMonthItem = document.querySelector("#tpl-momthitem");
const templateYearItem = document.querySelector("#tpl-yearitem");


const monthSelBtn = document.getElementById("month-sel-btn");
const yearSelBtn = document.getElementById("year-sel-btn");


window.onload = function () {
    createDropdowns();
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn') & !event.target.matches("#myInput")) {
        closeDropdownMenuItems();
    }
}

function clickJoin() {
    if (!formIsValid()) {
        return;
    }
    postSuccessfulSend();
}

function formIsValid() {
    var paymenttype_valid = validatePaymentType();
    var cardnumber_valid = true;
    var cvc_valid = true;

    if (paymentIsCard()) {
        cardnumber_valid = document.getElementById("card-number").checkValidity();
        cvc_valid = document.getElementById("cvc").checkValidity();
    }

    var msg = "Oops! There was something wrong with the information you provided."
    if (!paymenttype_valid) {
        msg += "\n- One payment type must be selected.";
    }
    if (!cardnumber_valid) {
        msg += "\n- The card number must be exactly 15 digits."
    }
    if (!cvc_valid) {
        msg += "\n- The CVC code must be exactly 3 digits."
    }

    if (!(paymenttype_valid) || !(cardnumber_valid) || !(cvc_valid)) {
        alert(msg);
        return false;
    }
    return true;
}

function postSuccessfulSend() {
    var cardComplete = document.getElementById("card-complete");
    var cardContent = document.getElementById("card-content");
    cardComplete.classList.toggle("hide");
    cardContent.classList.toggle("hide");
    setTimeout(function () { cardComplete.classList.toggle("hide"); cardContent.classList.toggle("hide") }, 3000);
}

function validatePaymentType() {
    var ptypes = document.querySelectorAll("input[name='paymenttype']");
    for (var i = 0; i < ptypes.length; i++) {
        if (ptypes[i].checked) {
            return true;
        }
    }
    return false;
}

function paymentIsCard() {
    var ptype = document.querySelector("#creditcard-select");
    return (ptype && ptype.checked);
}

function clickPaypal() {
    showIfHiding(document.querySelector("#paypal-confirmation"));
    hideIfShowing(document.getElementById("card-front-details"));
    hideIfShowing(document.getElementById("card-expiration-details"));
    hideIfShowing(document.getElementById("card-cvv-details"));
}

function clickCard() {
    hideIfShowing(document.querySelector("#paypal-confirmation"));
    showIfHiding(document.getElementById("card-front-details"));
    showIfHiding(document.getElementById("card-expiration-details"));
    showIfHiding(document.getElementById("card-cvv-details"));
}

function hideIfShowing(elem) {
    if (!elem.classList.contains("hide")) {
        elem.classList.add("hide");
    }
}

function showIfHiding(elem) {
    if (elem.classList.contains("hide")) {
        elem.classList.remove("hide");
    }
}


function createDropdowns() {
    createMonthElements();
    createMonthSelection();
    setDefaultMonth();
    createDropdownChevron(monthSelBtn);

    createYearElements();
    createYearSelection();
    setDefaultYear();
    createDropdownChevron(yearSelBtn);
}

function createDropdownChevron(btn) {
    var chevronIcon = document.createElement("span");
    chevronIcon.classList.add("fa");
    chevronIcon.classList.add("fa-chevron-down");
    chevronIcon.classList.add("dropbtn");
    btn.appendChild(chevronIcon);
}

function toggleShowHideMonth() {
    document.getElementById("month-dropdown").classList.toggle("show");
}

function toggleShowHideYear() {
    document.getElementById("year-dropdown").classList.toggle("show");
}

function closeDropdownMenuItems() {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }
}

function createMonthSelection() {
    var element = document.createElement("span");
    element.id = "month-selection";
    element.classList.add("dropbtn");
    monthSelBtn.appendChild(element);
}

function createYearSelection() {
    var yelement = document.createElement("span");
    yelement.id = "year-selection";
    yelement.classList.add("dropbtn");
    yearSelBtn.appendChild(yelement);
}

function setDefaultMonth() {
    var monthList = document.getElementsByClassName("month-item");
    setMonth(monthList[0]);
}

function setDefaultYear() {
    var yearList = document.getElementsByClassName("year-item");
    setYear(yearList[0]);
}

function setMonth(e) {
    var selSpan = document.querySelector("#month-selection");
    selSpan.textContent = e.innerHTML;
}

function setYear(e) {
    var selSpan = document.querySelector("#year-selection");
    selSpan.textContent = e.innerHTML;
}

////////////////////
// Months
////////////////////
function createMonthElements() {
    var dataset = getMonths();
    dataset.forEach(createMonthElement);
}

function createMonthElement(datapoint) {
    var monthItem = templateMonthItem.content.cloneNode(true);
    monthItem.querySelector("button").textContent = datapoint;
    document.getElementById('month-dropdown').appendChild(monthItem);
}

function getMonths() {
    return ["01 - Jan", "02 - Feb", "03 - Mar", "04 - Apr", "05 - May", "06 - June", "07 - July", "08 - Aug", "09 - Sep", "10 - Oct", "11 - Nov", "12 - Dec"];
}


////////////////////
// Years
////////////////////

function createYearElements() {
    var dataset = getYears();
    dataset.forEach(createYearElement);
}

function createYearElement(datapoint) {
    var yearItem = templateYearItem.content.cloneNode(true);
    yearItem.querySelector("button").textContent = datapoint;
    document.getElementById('year-dropdown').appendChild(yearItem);
}

const arrayRange = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );

function getYears() {
    return arrayRange(2023, 2033, 1);
}