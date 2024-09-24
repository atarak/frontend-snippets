const calList = document.getElementById("calendar-list");
const templateCalItem = document.getElementById("tpl-calendar-item");

populateDayHeaders();
populateMonth("2023-08");




///////////////////////////////////
// data functions
///////////////////////////////////

function populateMonth(selectedMonth) {
    var monthDate = new Date(selectedMonth + "-01T00:00");
    var firstDayIndex = monthDate.getDay();
    console.log("first day is " + monthDate + " > " + firstDayIndex);
    var prevDate = monthDate;
    if (firstDayIndex > 0) {
        var prevDate = new Date(prevDate - 1);
        console.log("prev date: " + prevDate);
        firstDayIndex -= 1;
    }
}

function populateDayHeaders() {
    var daysOfWeek = getDaysOfWeek();
    for (var i = 0; i < daysOfWeek.length; i++) {
        var newItem = templateCalItem.content.cloneNode(true);
        var calItem = newItem.querySelector(".calendar-item");
        calItem.innerHTML = daysOfWeek[i].short;

        calList.appendChild(newItem);
    }
}

function getDaysOfWeek() {
    return [
        { short: "SUN", long: "SUNDAY" },
        { short: "MON", long: "MONDAY" },
        { short: "TUE", long: "TUESDAY" },
        { short: "WED", long: "WEDNESDAY" },
        { short: "THU", long: "THURSDAY" },
        { short: "FRI", long: "FRIDAY" },
        { short: "SAT", long: "SATURDAY" }
    ];
}