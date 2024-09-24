
const ccForm = document.getElementById("credit-card-form");
const ppForm = document.getElementById("paypal-form");
const bcForm = document.getElementById("bitcoin-form");

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

function clickCard() {
    ccForm.classList.remove("hide");
    showAllDescendants(ccForm);

    ppForm.classList.add("hide");
    hideAllDescendants(ppForm);

    bcForm.classList.add("hide");
    hideAllDescendants(bcForm);
}

function clickPaypal() {
    ccForm.classList.add("hide");
    hideAllDescendants(ccForm);

    ppForm.classList.remove("hide");
    showAllDescendants(ppForm);

    bcForm.classList.add("hide");
    hideAllDescendants(bcForm);
}

function clickBitcoin() {
    ccForm.classList.add("hide");
    hideAllDescendants(ccForm);

    ppForm.classList.add("hide");
    hideAllDescendants(ppForm);

    bcForm.classList.remove("hide");
    showAllDescendants(bcForm);
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

function hideAllDescendants(node) {
    node.childNodes.forEach(child => {
        hideAllDescendants(child);
        if (child.id !== undefined) {
            hideIfShowing(child);
        }
    });
}

function showAllDescendants(node) {
    node.childNodes.forEach(child => {
        showAllDescendants(child);
        if (child.id !== undefined) {
            showIfHiding(child);
        }
    });
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

function toggleShowHideMonth() {
    console.log("clicked on Month");
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