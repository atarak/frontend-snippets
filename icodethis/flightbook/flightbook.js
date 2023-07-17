window.onload = function () {
    const ps = document.getElementsByClassName("banner-box-item");

    for (const p of ps) {
        // Hide the clicked <p> element
        p.addEventListener("click", selectBox, false);
    }

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", clickSubmit, false);
}

function clickSubmit() {
    if (!formIsValid()) {
        displayValidationReminders();
        return;
    }
    postSuccessfulSend();
}

function formIsValid() {
    return document.getElementById("phoneNumber").checkValidity();
}

function displayValidationReminders() {
    var numberFormat = document.getElementById("phone-format");
    numberFormat.classList.add("failure");
    setTimeout(function () { numberFormat.classList.toggle("failure"); }, 1000);
}

function postSuccessfulSend() {
    var cardComplete = document.getElementById("card-complete");
    var cardContent = document.getElementById("card-banner");
    cardComplete.classList.toggle("hide");
    cardContent.classList.toggle("hide");
    setTimeout(function () { cardComplete.classList.toggle("hide"); cardContent.classList.toggle("hide") }, 2000);
}

function prevDate() {
    var currShowingDates = document.getElementsByClassName();

    // var start = new Date("1 Feb 2020");
    // var end = new Date("28 Feb 2020");
    // var ustart = start.getTime();
    // var uend = end.getTime();
    // for (unix = ustart; unix<=uend; unix+=86400000) { var thisDay = new Date(unix); }
}

////////////////////////////
// interactive functions
////////////////////////////


function hide(e) {
    e.currentTarget.style.visibility = "hidden";
    console.log(e.currentTarget);
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