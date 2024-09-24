window.onload = function () {
    const ps = document.getElementsByClassName("banner-box-item");

    for (const p of ps) {
        // Hide the clicked <p> element
        p.addEventListener("click", selectBox, false);
    }
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", clickSubmit, false);

    const prevBtn = document.getElementById("prevDateBtn");
    prevBtn.addEventListener("click", prevDate, false);

    const nextBtn = document.getElementById("nextDateBtn");
    nextBtn.addEventListener("click", nextDate, false);
}

////////////////////////////
// interactive functions
////////////////////////////

function hide(e) {
    e.currentTarget.style.visibility = "hidden";
    console.log(e.currentTarget);
}

function clickSubmit() {
    if (!formIsValid()) {
        return;
    }
    postSuccessfulSend();
}

function formIsValid() {
    return true;
}

function postSuccessfulSend() {
    var cardComplete = document.getElementById("card-complete");
    var cardContent = document.getElementById("card-banner");
    var submitBtn = document.getElementById("submitBtn");
    submitBtn.classList.toggle("hide");
    cardComplete.classList.toggle("hide");
    cardContent.classList.toggle("hide");
    setTimeout(function () { cardComplete.classList.toggle("hide"); cardContent.classList.toggle("hide"); submitBtn.classList.toggle("hide"); }, 2000);
}

function selectBox(e) {
    var selectedBox = e.currentTarget;
    if (!selectionHasFlights(selectedBox)) {
        console.log("no flights on this day");
        return;
    }
    setSummarySelectedDate(selectedBox);
    toggleSelectedBoxes();
}

function selectionHasFlights(e) {
    var selectedContent = e.getElementsByClassName("banner-box-content")[0];
    var status = selectedContent.getElementsByClassName("status")[0];
    return (status.dataset.flightcount != "0");
}

function setSummarySelectedDate(selectedBox) {
    document.querySelector("#summary-selected-from-date").textContent = selectedBox.querySelector(".banner-box-header").textContent;
}

function toggleSelectedBoxes() {
    var allboxes = document.getElementsByClassName(".banner-box-item");
    for (var i = 0; i < allboxes.length; i++) {
        allboxes[i].classList.toggle("selected");
    }
}

function prevDate() {
    var currShowingDates = document.getElementsByClassName("banner-box-item");

    var firstDate = getDateFromElem(currShowingDates[0]);
    var prevDate = new Date(firstDate.getTime() - 86400000)

    var newBoxItem = createBoxItem();
    setBoxItemDate(newBoxItem, prevDate);

    var status = "No flights";
    var counter = "0";
    var price = "";
    if (prevDate < new Date("April 29, 2019") && prevDate.getDate() % 2 == 1) {
        status = "From ";
        counter = "1";
        price = "$" + getRandomInt(500);
    }
    setBoxItemStatus(newBoxItem, status, counter, price);


    var parent = document.getElementById("banner-box-list");
    var childToRemove = parent.lastElementChild;
    if (childToRemove) {
        parent.removeChild(childToRemove);
    }
    parent.insertBefore(newBoxItem, parent.firstElementChild);
}

function nextDate() {
    var currShowingDates = document.getElementsByClassName("banner-box-item");

    var firstDate = getDateFromElem(currShowingDates[currShowingDates.length - 1]);
    var prevDate = new Date(firstDate.getTime() + 86400000)

    var newBoxItem = createBoxItem();
    setBoxItemDate(newBoxItem, prevDate);
    var status = "No flights";
    var counter = "0";
    var price = "";
    if (prevDate > new Date("May 05, 2019") && prevDate.getDate() % 2 == 0) {
        status = "From ";
        counter = "1";
        price = "$" + getRandomInt(500);
    }
    setBoxItemStatus(newBoxItem, status, counter, price);

    var parent = document.getElementById("banner-box-list");
    var childToRemove = parent.firstElementChild;
    if (childToRemove) {
        parent.removeChild(childToRemove);
    }
    parent.appendChild(newBoxItem);
}


function getDateFromElem(aDate) {
    var firstDateStr = aDate.getElementsByClassName("monthday")[0].textContent + " " + aDate.getElementsByClassName("month")[0].textContent + aDate.getElementsByClassName("year")[0].textContent;
    return new Date(firstDateStr);
}

function createBoxItem() {
    var element = document.createElement("button");
    element.classList = "banner-box-item";

    var header = document.createElement("div");
    header.classList = "banner-box-header";

    var spanList = ["wkday", "monthday", "month", "year hide"];
    for (var i = 0; i < spanList.length; i++) {
        var sp = document.createElement("span");
        sp.classList = spanList[i];
        header.appendChild(sp);
    }

    var content = document.createElement("span");
    content.classList = "banner-box-content";

    spanList = ["status", "price"];
    for (var i = 0; i < spanList.length; i++) {
        var sp = document.createElement("span");
        sp.classList = spanList[i];
        content.appendChild(sp);
    }

    element.appendChild(header);
    element.appendChild(content);
    element.addEventListener("click", selectBox, false);
    return element;
}

function setBoxItemDate(boxItem, aDate) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const wkdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    var header = boxItem.getElementsByClassName("banner-box-header")[0];
    var wkday = wkdays[aDate.getDay()];
    var monthday = String(aDate.getDate()).padStart(2, '0');
    var month = months[aDate.getMonth()];
    var year = aDate.getFullYear();

    var dateParts = [wkday, monthday, month, year];
    var spanList = ["wkday", "monthday", "month", "year"];
    for (var i = 0; i < dateParts.length; i++) {
        var sep = " ";
        if (i == 1) {
            sep = ", ";
        }
        header.getElementsByClassName(spanList[i])[0].textContent = dateParts[i] + sep;
    }
}

function setBoxItemStatus(boxItem, status, counter, price) {
    boxItem.getElementsByClassName("status")[0].textContent = status;
    boxItem.getElementsByClassName("price")[0].textContent = price;
    boxItem.getElementsByClassName("status")[0].dataset.flightcount = counter;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}