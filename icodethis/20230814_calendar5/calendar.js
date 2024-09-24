const calList = document.getElementById("calendar-list");
const templateCalItem = document.getElementById("tpl-calendar-item");
const templateCalHeaderItem = document.getElementById("tpl-calendar-header-item");

const dayEventList = document.getElementById("day-event-list");
const templateEventItem = document.getElementById("tpl-day-event-item");

var currentMonthStartDate = new Date(document.getElementById("header--current-month-year").dataset.startdate);
var allEvents = getEvents();

startWeek();
const weeks = document.getElementsByClassName("calendar-week");
var week = weeks[weeks.length - 1];

bindMonthNavButtons();
populateDayHeaders();
populateMonth(currentMonthStartDate);

var selectedCalItemDate = undefined;

showDayEvents();

///////////////////////////////////
// interaction functions
///////////////////////////////////
function bindMonthNavButtons() {
    var prev_month_btn = document.getElementById("btn-previous-month");
    prev_month_btn.addEventListener("click", (event) => {
        selectPrevMonth();
    });

    var next_month_btn = document.getElementById("btn-next-month");
    next_month_btn.addEventListener("click", (event) => {
        selectNextMonth();
    });
}

function selectPrevMonth() {
    var nextMonthStartDate = getPreviousMonthStartDate(currentMonthStartDate);
    changeSelectedMonth(nextMonthStartDate);
}

function selectNextMonth() {
    var nextMonthStartDate = getNextMonthStartDate(currentMonthStartDate);
    changeSelectedMonth(nextMonthStartDate);
}

function changeSelectedMonth(newMonthStartDate) {
    resetCalendar();
    setNextMonthData(newMonthStartDate);
    displayMonth(newMonthStartDate);
    populateMonth(newMonthStartDate);
}

function selectDate(elem) {
    console.log("in select date with " + elem);
    console.log(elem.innerHTML);
    var aDate = new Date(currentMonthStartDate);
    aDate.setDate(aDate.getDate() + Number(elem.innerHTML) - 1);
    setDayOfWeek(aDate.getDay());
    setShortDay(aDate);
    if (selectedCalItemDate) {
        selectedCalItemDate.classList.remove("selected");
    }
    elem.classList.add("selected");
    selectedCalItemDate = elem;
    showDayEvents();
}

function getSelectedDate() {
    if (selectedCalItemDate) {
        var aDate = new Date(currentMonthStartDate);
        aDate.setDate(aDate.getDate() + Number(selectedCalItemDate.innerHTML) - 1);
        return aDate;
    }
    return undefined;
}

function setDayOfWeek(dayOfWeek) {
    var daysOfWeek = getDaysOfWeek();
    document.getElementById("selected-day-of-week").innerHTML = daysOfWeek[dayOfWeek].long;
}

function setShortDay(aDate) {
    var allMonths = getMonths();
    document.getElementById("selected-shortday").innerHTML = allMonths[aDate.getMonth()].short + " " + aDate.getDate();
}

function showEventCategoryOptions(eventBtn) {
    var swatchLists = document.getElementsByClassName("swatch-selection");
    for (var i = 0; i < swatchLists.length; i++) {
        swatchLists[i].classList.toggle("hide");
    }
}

function selectEventCategory(elem) {
    var eventItem = findParentClass(elem, "day-event-item");
    eventItem.querySelector(".event-color").dataset.color = elem.dataset.color;
    eventItem.querySelector(".swatch-selection").classList.toggle("hide");
    var selCalItem = findParentClass(selectedCalItemDate, "calendar-item");
    var eventId = eventItem.querySelector(".event-details").dataset.event_id;
    var eventPreview = selCalItem.querySelector(".item-event-previews > .item-preview[data-event_id='" + eventId + "']");
    eventPreview.dataset.color = elem.dataset.color;
    editEventData(eventItem);
}

function showDayEvents() {
    if (selectedCalItemDate === undefined) {
        document.getElementById("empty-event").classList.remove("hide");
    } else {
        document.getElementById("empty-event").classList.add("hide");
        dayEventList.innerHTML = "";
        var dayEvents = getEventsByDay(getSelectedDate());
        for (var i = 0; i < dayEvents.length; i++) {
            var eventData = dayEvents[i];
            var newItem = templateEventItem.content.cloneNode(true);
            var dayEvent = newItem.querySelector(".day-event-item");
            dayEvent.querySelector(".event-details").dataset.event_id = eventData.event_details.event_id;
            dayEvent.querySelector(".event-title").innerHTML = eventData.event_details.event_name;
            dayEvent.querySelector(".event-color").dataset.color = eventData.event_details.event_color;
            dayEvent.querySelector(".event-start-time").innerHTML = eventData.event_details.event_start_ts;
            bindEditEventColor(dayEvent);
            bindSwatchSelection(dayEvent);
            dayEventList.appendChild(newItem);
        }
    }
}

function getEventsByDay(aDate) {
    var matchedEvents = [];
    var matchingDate = new Date(aDate);
    for (var i = 0; i < allEvents.length; i++) {
        var eventDate = new Date(allEvents[i].event_date);
        if (eventDate.getDate() == matchingDate.getDate()) {
            matchedEvents.push(allEvents[i]);
        }
    }
    return matchedEvents;
}

function bindSwatchSelection(dayEvent) {
    var btnSwatches = dayEvent.getElementsByClassName("swatch");
    for (var i = 0; i < btnSwatches.length; i++) {
        btnSwatches[i].addEventListener("click", (event) => {
            selectEventCategory(event.target);
        });
    }
}

function bindEditEventColor(dayEvent) {
    var btnEventColors = dayEvent.getElementsByClassName("event-color");
    for (var i = 0; i < btnEventColors.length; i++) {
        var btnColor = btnEventColors[i];
        btnColor.addEventListener("click", (event) => {
            showEventCategoryOptions(event.target);
        });
    }
}

function editEventData(event_item) {
    var event_id = event_item.querySelector(".event-details").dataset.event_id;
    var eventDate = new Date(event_item.querySelector(".event-start-time").innerHTML);
    eventDate.setHours(0, 0, 0, 0);
    for (var i = 0; i < allEvents.length; i++) {
        var eventData = allEvents[i];
        var eventData_date = new Date(eventData.event_date);
        if (eventData_date.getDate() == eventDate.getDate()) {
            if (eventData.event_details.event_id == event_id) {
                copyEventDataToMemory(eventData, event_item);
            }
        }
    }
}

function copyEventDataToMemory(eventData, event_item) {
    var event_name = event_item.querySelector(".event-title").innerHTML;
    var event_color = event_item.querySelector(".event-color").dataset.color;
    var event_start_ts = event_item.querySelector(".event-start-time").innerHTML;
    eventData.event_details.event_name = event_name;
    eventData.event_details.event_start_ts = event_start_ts;
    eventData.event_details.event_color = event_color;
}

///////////////////////////////////
// utility functions
///////////////////////////////////
// TODO: Make recursive!
function findParentClass(elem, className) {
    var foundItem = undefined;
    if (elem.classList.contains(className)) {
        foundItem = elem;
    } else if (elem.parentNode.classList.contains(className)) {
        foundItem = elem.parentNode;
    } else if (elem.parentNode.parentNode.classList.contains(className)) {
        foundItem = elem.parentNode.parentNode;
    } else if (elem.parentNode.parentNode.parentNode.classList.contains(className)) {
        foundItem = elem.parentNode.parentNode.parentNode;
    }
    return foundItem;
}

function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

///////////////////////////////////
// data functions
///////////////////////////////////
function setNextMonthData(aDate) {
    document.getElementById("header--current-month-year").dataset.startdate = aDate;
    currentMonthStartDate = aDate;
}

function displayMonth(aDate) {
    var allMonths = getMonths();
    document.getElementById("header--current-month").innerHTML = allMonths[aDate.getMonth()].long;
    document.getElementById("header--current-year").innerHTML = aDate.getFullYear();
}

function resetCalendar() {
    calList.innerHTML = "";
    startWeek();
    week = weeks[weeks.length - 1];
    populateDayHeaders();
}

function getPreviousMonthStartDate(aDate) {
    if (aDate.getMonth() == 0) {
        return new Date(aDate.getFullYear() - 1, 11, 1);
    }
    return new Date(aDate.getFullYear(), aDate.getMonth() - 1, 1);
}

function getNextMonthStartDate(aDate) {
    if (aDate.getMonth() == 11) {
        return new Date(aDate.getFullYear() + 1, 0, 1);
    }
    return new Date(aDate.getFullYear(), aDate.getMonth() + 1, 1);
}

function monthToTS(selectedMonth) {
    return new Date(selectedMonth + "-01T00:00");
}

function populateMonth(monthDate) {
    var firstDayIndex = monthDate.getDay();
    startWeek();
    // populate days from previous month
    populateOtherMonthDays(getStartOfWeek(monthDate), firstDayIndex);
    // populate days from currently selected month
    var lastDay = populateCurrentMonthDays(monthDate);
    // populate days from next month
    populateOtherMonthDays(lastDay, 0);
}

function populateCurrentMonthDays(monthDate) {
    var nextDate = new Date(monthDate);
    while (nextDate.getMonth() == monthDate.getMonth()) {
        var selCalItem = populateDayItem(nextDate.getDate(), "active");
        var matchingEvents = getEventsByDay(nextDate);
        if (matchingEvents) {
            selCalItem.querySelector(".item-event-previews").innerHTML = "";
            for (var i = 0; i < matchingEvents.length; i++) {
                var eventData = matchingEvents[i];
                var eventPreview = document.createElement("span");
                eventPreview.classList = "item-preview";
                eventPreview.dataset.color = eventData.event_details.event_color;
                eventPreview.dataset.event_id = eventData.event_details.event_id;
                selCalItem.querySelector(".item-event-previews").appendChild(eventPreview);
            }
        }
        nextDate.setDate(nextDate.getDate() + 1);
    }
    return nextDate;
}

function populateOtherMonthDays(startDate, endDayIndex) {
    var otherDate = new Date(startDate);

    while (otherDate.getDay() != endDayIndex) {
        populateDayItem(otherDate.getDate(), "inactive");
        otherDate.setDate(otherDate.getDate() + 1);
    }
}

function getStartOfWeek(aDate) {
    var startOfWeek = new Date(aDate);
    while (startOfWeek.getDay() != 0) {
        startOfWeek.setDate(startOfWeek.getDate() - 1);
    }
    return startOfWeek;
}

function startWeek() {
    var newWeek = document.createElement("span");
    newWeek.classList = "calendar-week";
    calList.appendChild(newWeek);
}

function isDateWeekStart(aDate) {
    return aDate.getDay() == 0;
}

function populateDayHeaders() {
    var daysOfWeek = getDaysOfWeek();
    for (var i = 0; i < daysOfWeek.length; i++) {
        var newItem = templateCalHeaderItem.content.cloneNode(true);
        var calItem = newItem.querySelector(".calendar-header-item");
        calItem.innerHTML = daysOfWeek[i].short;

        week.appendChild(newItem);
    }
}

function populateDayItem(value, classlist) {
    var newItem = templateCalItem.content.cloneNode(true);
    var calItem = newItem.querySelector(".calendar-item");
    calItem.querySelector(".calendar-date").innerHTML = value;
    calItem.classList += " " + classlist;
    calItem.addEventListener("click", (event) => {
        console.log("clicked " + event.target);
        selectDate(findParentClass(event.target, "calendar-item").querySelector(".calendar-date"));
    });
    week.appendChild(newItem);
    return calItem;
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

function getMonths() {
    return [
        { short: "JAN", long: "JANUARY" },
        { short: "FEB", long: "FEBRUARY" },
        { short: "MAR", long: "MARCH" },
        { short: "APR", long: "APRIL" },
        { short: "MAY", long: "MAY" },
        { short: "JUN", long: "JUNE" },
        { short: "JUL", long: "JULY" },
        { short: "AUG", long: "AUGUST" },
        { short: "SEP", long: "SEPTEMBER" },
        { short: "OCT", long: "OCTOBER" },
        { short: "NOV", long: "NOVEMBER" },
        { short: "DEC", long: "DECEMBER" }
    ];
}

function getEvents() {
    return [
        {
            event_date: "2023-08-14T00:00",
            event_details: {
                event_id: guidGenerator(),
                event_name: "Dinner with Dad",
                event_start_ts: "2023-08-14T16:00",
                event_color: "color2"
            }
        },
        {
            event_date: "2023-08-06T00:00",
            event_details: {
                event_id: guidGenerator(),
                event_name: "Birthday Brunch",
                event_start_ts: "2023-08-06T10:00",
                event_color: "color4"
            }
        }
    ];
}