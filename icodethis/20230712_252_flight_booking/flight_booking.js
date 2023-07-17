const airport_data = getAirportData();

const templateAirportItem = document.getElementById("tpl-airport-item");
const origin_airport_list = document.getElementById("origin-airport-list");
const origin_airport_selected = document.getElementById("selected-origin-airport");
const origin_airport_text = document.getElementById("origin-airport-text");

const destn_airport_list = document.getElementById("destn-airport-list");
const destn_airport_selected = document.getElementById("selected-destn-airport");
const destn_airport_text = document.getElementById("destn-airport-text");


const templatePassengerItem = document.getElementById("tpl-passenger-item");
const passenger_counter_list = document.getElementById("passenger-counter-list");

window.onload = function () {
    createAirportItems(origin_airport_list);
    createAirportItems(destn_airport_list);
    createPassengerItems(passenger_counter_list);
    createBoxItems(document.getElementById("banner-box-list"));
}

window.onclick = function (event) {
    if (!event.target.matches("#passenger-count-btn") && !(event.target.matches(".chg-qty"))) {
        closeOpenLists();
    }
}

function clickOrigin(e) {
    if (e.parentNode.id == "origin-airport-list") {
        origin_airport_text.value = e.textContent;
        var cities = document.getElementsByClassName("from-city");
        for (var i = 0; i < cities.length; i++) {
            cities[i].textContent = e.textContent;
        }
        // document.querySelector(".from-airport").textContent = e.dataset.iata;
    } else {
        destn_airport_text.value = e.textContent;
        var cities = document.getElementsByClassName("to-city");
        for (var i = 0; i < cities.length; i++) {
            cities[i].textContent = e.textContent;
        }
        // document.querySelector(".to-airport").textContent = e.dataset.iata;
    }
}

function clickChangeQty(sibling, difference) {
    changeQty(sibling, difference);
    recalcTotal();
}

function clickPassengerCounter() {
    var pItems = document.querySelectorAll(".passenger-item");
    pItems.forEach(pItem => {
        pItem.classList.toggle("hide");
    });
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

function clickShowQuery() {
    var calendarSection = document.getElementById("calendar");
    hideIfShowing(calendarSection);
    hideAllDescendants(calendarSection);

    var querySection = document.getElementById("trip-query");
    showIfHiding(querySection);
    showAllDescendants(querySection);
}

function clickShowCalendar() {
    var calendarSection = document.getElementById("calendar");
    showIfHiding(calendarSection);
    showAllDescendants(calendarSection);

    var querySection = document.getElementById("trip-query");
    hideIfShowing(querySection);
    hideAllDescendants(querySection);
}


function changeQty(sibling, difference) {
    sibling.parentNode.querySelector(".qty").textContent = Math.max(Number(sibling.parentNode.querySelector(".qty").textContent) + difference, 0);
}

function recalcTotal() {
    var total = 0;
    document.querySelectorAll(".qty.passenger-counter").forEach(pcount => {
        total += Number(pcount.textContent);
    })
    document.getElementById("passenger-total").textContent = total;
}

///////////////////////
// utility functions //
///////////////////////
function filterFunction(input, listId) {
    var list = document.getElementById(listId);
    // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown_filter
    var filter, a, i;
    filter = input.value.toUpperCase();
    a = list.querySelectorAll(".airport-item");
    for (i = 0; i < a.length; i++) {
        var txtValue = a[i].textContent;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
            showIfHiding(a[i]);
        } else {
            a[i].style.display = "none";
        }
    }
}

function closeOpenLists() {
    closeOpenList(origin_airport_list);
    closeOpenList(destn_airport_list);
    var pItems = document.querySelectorAll(".passenger-item");
    pItems.forEach(pItem => {
        hideIfShowing(pItem);
    })
}

function closeOpenList(elem) {
    var buttons = elem.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
        hideIfShowing(buttons[i]);
    }
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

function setBoxItemDate(boxItem, aDate) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const wkdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    var header = boxItem.querySelector(".banner-box-header");
    var wkday = wkdays[aDate.getDay()];
    var monthday = String(aDate.getDate()).padStart(2, '0');
    var month = months[aDate.getMonth()];
    var year = aDate.getFullYear();

    var dateParts = [wkday, monthday, month];
    for (var i = 0; i < dateParts.length; i++) {
        var sep = " ";
        if (i == 1) {
            sep = ", ";
        }
        header.textContent += dateParts[i] + sep;
    }
}



////////////////////////////
// data-related functions //
////////////////////////////

function createBoxItems(parent) {
    for (var i = 0; i < 6; i++) {
        createBoxItem(parent, i);
    }
}

function createBoxItem(parent, offset) {
    var templateBoxItem = document.getElementById("tpl-box-item");
    var boxItem = templateBoxItem.content.cloneNode(true);
    boxItem.querySelector(".banner-box-content").querySelector(".status").textContent = "From $" + getRandomInt(500);

    var aDate = new Date(new Date(document.getElementById('dept-date-input').value).getTime() + 86400000 * offset);
    setBoxItemDate(boxItem, aDate);
    parent.appendChild(boxItem);
}


function createPassengerItems(parent) {
    var passengerInfo = [
        { type: "Adult", desc: "Age 12+", defaultval: "1" },
        { type: "Child", desc: "Age 0-12", defaultval: "0" }
    ];
    passengerInfo.forEach(passenger => {
        var passengerItem = templatePassengerItem.content.cloneNode(true);
        var pItem = passengerItem.querySelector(".passenger-item");
        pItem.querySelector(".passenger-type").innerHTML = passenger.type;
        pItem.querySelector(".passenger-desc").innerHTML = passenger.desc;
        pItem.querySelector(".passenger-counter-btn").querySelector(".qty").textContent = passenger.defaultval;
        parent.appendChild(passengerItem);
    })
}

function createAirportItems(parent) {
    airport_data.forEach(airport => {
        var airportItem = templateAirportItem.content.cloneNode(true);
        var airportBtn = airportItem.querySelector("button");
        airportBtn.dataset.countrycode = airport.country_code;
        airportBtn.dataset.regionname = airport.region_name;
        airportBtn.dataset.iata = airport.iata;
        airportBtn.dataset.icao = airport.icao;
        airportBtn.dataset.airportname = airport.airport;
        airportBtn.dataset.latitude = airport.latitude;
        airportBtn.dataset.longitude = airport.longitude;
        airportBtn.textContent = airport.airport + " | " + airport.iata;
        parent.appendChild(airportItem);
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getAirportData() {
    // https://github.com/ip2location/ip2location-iata-icao/blob/master/iata-icao.csv
    // international airports
    return [
        { country_code: 'US', region_name: 'Utah', iata: 'SLC', icao: 'KSLC', airport: 'Salt Lake City International Airport', latitude: '40.7884', longitude: '-111.978' },
        { country_code: 'US', region_name: 'California', iata: 'SMF', icao: 'KSMF', airport: 'Sacramento International Airport', latitude: '38.6954', longitude: '-121.591' },
        { country_code: 'US', region_name: 'Florida', iata: 'SRQ', icao: 'KSRQ', airport: 'Sarasota-Bradenton International Airport', latitude: '27.3954', longitude: '-82.5544' },
        { country_code: 'US', region_name: 'Montana', iata: 'GTF', icao: 'KGTF', airport: 'Great Falls International Airport', latitude: '47.482', longitude: '-111.371' },
        { country_code: 'US', region_name: 'South Carolina', iata: 'GSP', icao: 'KGSP', airport: 'Greenville-Spartanburg International Airport', latitude: '34.8957', longitude: '-82.2189' },
        { country_code: 'US', region_name: 'North Carolina', iata: 'GSO', icao: 'KGSO', airport: 'Piedmont Triad International Airport', latitude: '36.0978', longitude: '-79.9373' },
        { country_code: 'US', region_name: 'Missouri', iata: 'STL', icao: 'KSTL', airport: 'Lambert-St. Louis International Airport', latitude: '38.7487', longitude: '-90.37' },
        { country_code: 'US', region_name: 'Michigan', iata: 'GRR', icao: 'KGRR', airport: 'Gerald R. Ford International Airport', latitude: '42.8808', longitude: '-85.5228' },
        { country_code: 'US', region_name: 'Wisconsin', iata: 'GRB', icao: 'KGRB', airport: 'Austin Straubel International Airport', latitude: '44.4851', longitude: '-88.1296' },
        { country_code: 'US', region_name: 'Mississippi', iata: 'GPT', icao: 'KGPT', airport: 'Gulfport-Biloxi International Airport', latitude: '30.4073', longitude: '-89.0701' },
        { country_code: 'US', region_name: 'Texas', iata: 'GLS', icao: 'KGLS', airport: 'Scholes International Airport at Galveston', latitude: '29.2653', longitude: '-94.8604' },
        { country_code: 'US', region_name: 'New York', iata: 'SYR', icao: 'KSYR', airport: 'Syracuse Hancock International Airport', latitude: '43.1112', longitude: '-76.1063' },
        { country_code: 'US', region_name: 'Pennsylvania', iata: 'ABE', icao: 'KABE', airport: 'Lehigh Valley International Airport', latitude: '40.6521', longitude: '-75.4408' },
        { country_code: 'US', region_name: 'New Mexico', iata: 'ABQ', icao: 'KABQ', airport: 'Albuquerque International Sunport', latitude: '35.0402', longitude: '-106.609' },
        { country_code: 'US', region_name: 'North Dakota', iata: 'GFK', icao: 'KGFK', airport: 'Grand Forks International Airport', latitude: '47.9493', longitude: '-97.1761' },
        { country_code: 'US', region_name: 'Washington', iata: 'GEG', icao: 'KGEG', airport: 'Spokane International Airport', latitude: '47.6199', longitude: '-117.534' },
        { country_code: 'US', region_name: 'New Jersey', iata: 'ACY', icao: 'KACY', airport: 'Atlantic City International Airport', latitude: '39.4576', longitude: '-74.5772' },
        { country_code: 'US', region_name: 'Louisiana', iata: 'AEX', icao: 'KAEX', airport: 'Alexandria International Airport', latitude: '31.3274', longitude: '-92.5498' },
        { country_code: 'US', region_name: 'Arizona', iata: 'GCN', icao: 'KGCN', airport: 'Grand Canyon National Park Airport', latitude: '35.9524', longitude: '-112.147' },
        { country_code: 'US', region_name: 'Ohio', iata: 'AKC', icao: 'KAKR', airport: 'Akron Fulton International Airport', latitude: '41.0375', longitude: '-81.4669' },
        { country_code: 'US', region_name: 'New York', iata: 'ALB', icao: 'KALB', airport: 'Albany International Airport', latitude: '42.7483', longitude: '-73.8017' },
        { country_code: 'US', region_name: 'Texas', iata: 'ALI', icao: 'KALI', airport: 'Alice International Airport', latitude: '27.7409', longitude: '-98.0269' },
        { country_code: 'US', region_name: 'Texas', iata: 'AMA', icao: 'KAMA', airport: 'Rick Husband Amarillo International Airport', latitude: '35.2194', longitude: '-101.706' },
        { country_code: 'US', region_name: 'Alaska', iata: 'ANC', icao: 'PANC', airport: 'Ted Stevens Anchorage International Airport', latitude: '61.1744', longitude: '-149.996' },
        { country_code: 'US', region_name: 'Texas', iata: 'FTW', icao: 'KFTW', airport: 'Fort Worth Meacham International Airport', latitude: '32.8198', longitude: '-97.3624' },
        { country_code: 'US', region_name: 'New York', iata: 'ART', icao: 'KART', airport: 'Watertown International Airport', latitude: '43.9919', longitude: '-76.0217' },
        { country_code: 'US', region_name: 'Georgia', iata: 'ATL', icao: 'KATL', airport: 'Hartsfield-Jackson Atlanta International Airport', latitude: '33.6367', longitude: '-84.4281' },
        { country_code: 'US', region_name: 'Florida', iata: 'TLH', icao: 'KTLH', airport: 'Tallahassee International Airport', latitude: '30.3965', longitude: '-84.3503' },
        { country_code: 'US', region_name: 'Wisconsin', iata: 'ATW', icao: 'KATW', airport: 'Appleton International Airport', latitude: '44.2581', longitude: '-88.5191' },
        { country_code: 'US', region_name: 'Florida', iata: 'FPR', icao: 'KFPR', airport: 'St. Lucie County International Airport', latitude: '27.4951', longitude: '-80.3683' },
        { country_code: 'US', region_name: 'Texas', iata: 'AUS', icao: 'KAUS', airport: 'Austin-Bergstrom International Airport', latitude: '30.1945', longitude: '-97.6699' },
        { country_code: 'US', region_name: 'Michigan', iata: 'FNT', icao: 'KFNT', airport: 'Bishop International Airport', latitude: '42.9654', longitude: '-83.7436' },
        { country_code: 'US', region_name: 'Pennsylvania', iata: 'AVP', icao: 'KAVP', airport: 'Wilkes-Barre/Scranton International Airport', latitude: '41.3385', longitude: '-75.7234' },
        { country_code: 'US', region_name: 'Massachusetts', iata: 'FMH', icao: 'KFMH', airport: 'Otis Air National Guard Base', latitude: '41.6584', longitude: '-70.5214' },
        { country_code: 'US', region_name: 'Texas', iata: 'MFE', icao: 'KMFE', airport: 'McAllen Miller International Airport', latitude: '26.1758', longitude: '-98.2386' },
        { country_code: 'US', region_name: 'Florida', iata: 'FLL', icao: 'KFLL', airport: 'Fort Lauderdale-Hollywood International Airport', latitude: '26.0726', longitude: '-80.1527' },
        { country_code: 'US', region_name: 'Florida', iata: 'MIA', icao: 'KMIA', airport: 'Miami International Airport', latitude: '25.7932', longitude: '-80.2906' },
        { country_code: 'US', region_name: 'Florida', iata: 'TPA', icao: 'KTPA', airport: 'Tampa International Airport', latitude: '27.9755', longitude: '-82.5332' },
        { country_code: 'US', region_name: 'Tennessee', iata: 'MEM', icao: 'KMEM', airport: 'Memphis International Airport', latitude: '35.0424', longitude: '-89.9767' },
        { country_code: 'US', region_name: 'Pennsylvania', iata: 'MDT', icao: 'KMDT', airport: 'Harrisburg International Airport', latitude: '40.1935', longitude: '-76.7634' },
        { country_code: 'US', region_name: 'Wisconsin', iata: 'MKE', icao: 'KMKE', airport: 'General Mitchell International Airport', latitude: '42.9472', longitude: '-87.8966' },
        { country_code: 'US', region_name: 'Florida', iata: 'MCO', icao: 'KMCO', airport: 'Orlando International Airport', latitude: '28.4294', longitude: '-81.309' },
        { country_code: 'US', region_name: 'Alaska', iata: 'MCL', icao: 'PAIN', airport: 'McKinley National Park Airport', latitude: '63.7326', longitude: '-148.911' },
        { country_code: 'US', region_name: 'Missouri', iata: 'MCI', icao: 'KMCI', airport: 'Kansas City International Airport', latitude: '39.2976', longitude: '-94.7139' },
        { country_code: 'US', region_name: 'Montana', iata: 'FCA', icao: 'KGPI', airport: 'Glacier Park International Airport', latitude: '48.3105', longitude: '-114.256' },
        { country_code: 'US', region_name: 'Florida', iata: 'MLB', icao: 'KMLB', airport: 'Orlando Melbourne International Airport', latitude: '28.1028', longitude: '-80.6453' },
        { country_code: 'US', region_name: 'Illinois', iata: 'MLI', icao: 'KMLI', airport: 'Quad City International Airport', latitude: '41.4485', longitude: '-90.5075' },
        { country_code: 'US', region_name: 'California', iata: 'FAT', icao: 'KFAT', airport: 'Fresno Yosemite International Airport', latitude: '36.7762', longitude: '-119.718' },
        { country_code: 'US', region_name: 'Oklahoma', iata: 'TUL', icao: 'KTUL', airport: 'Tulsa International Airport', latitude: '36.1984', longitude: '-95.8881' },
        { country_code: 'US', region_name: 'North Dakota', iata: 'FAR', icao: 'KFAR', airport: 'Hector International Airport', latitude: '46.9207', longitude: '-96.8158' },
        { country_code: 'US', region_name: 'Arizona', iata: 'TUS', icao: 'KTUS', airport: 'Tucson International Airport', latitude: '32.1161', longitude: '-110.941' },
        { country_code: 'US', region_name: 'Alaska', iata: 'FAI', icao: 'PAFA', airport: 'Fairbanks International Airport', latitude: '64.8151', longitude: '-147.856' },
        { country_code: 'US', region_name: 'Michigan', iata: 'MBS', icao: 'KMBS', airport: 'MBS International Airport', latitude: '43.5329', longitude: '-84.0796' },
        { country_code: 'US', region_name: 'Washington', iata: 'TWD', icao: '', airport: 'Jefferson County International Airport', latitude: '48.0538', longitude: '-122.811' },
        { country_code: 'US', region_name: 'Florida', iata: 'EYW', icao: 'KEYW', airport: 'Key West International Airport', latitude: '24.5561', longitude: '-81.7596' },
        { country_code: 'US', region_name: 'South Carolina', iata: 'MMT', icao: 'KMMT', airport: 'McEntire Joint National Guard Base', latitude: '33.9208', longitude: '-80.8013' },
        { country_code: 'US', region_name: 'Texas', iata: 'MAF', icao: 'KMAF', airport: 'Midland International Air and Space Port', latitude: '31.9425', longitude: '-102.202' },
        { country_code: 'US', region_name: 'North Dakota', iata: 'MOT', icao: 'KMOT', airport: 'Minot International Airport', latitude: '48.2594', longitude: '-101.28' },
        { country_code: 'US', region_name: 'Illinois', iata: 'UGN', icao: 'KUGN', airport: 'Waukegan National Airport', latitude: '42.4222', longitude: '-87.8679' },
        { country_code: 'US', region_name: 'Michigan', iata: 'MQT', icao: 'KSAW', airport: 'Sawyer International Airport', latitude: '46.3536', longitude: '-87.3954' },
        { country_code: 'US', region_name: 'Illinois', iata: 'LWV', icao: 'KLWV', airport: 'Lawrenceville-Vincennes International Airport', latitude: '38.7643', longitude: '-87.6055' },
        { country_code: 'US', region_name: 'Oregon', iata: 'MFR', icao: 'KMFR', airport: 'Rogue Valley International-Medford Airport', latitude: '42.3742', longitude: '-122.873' },
        { country_code: 'US', region_name: 'Pennsylvania', iata: 'ERI', icao: 'KERI', airport: 'Erie International Airport (Tom Ridge Field)', latitude: '42.0831', longitude: '-80.1739' },
        { country_code: 'US', region_name: 'Montana', iata: 'MSO', icao: 'KMSO', airport: 'Missoula International Airport', latitude: '46.9163', longitude: '-114.091' },
        { country_code: 'US', region_name: 'Minnesota', iata: 'MSP', icao: 'KMSP', airport: 'Minneapolis-Saint Paul International Airport (Wold-Chamberlain Field)', latitude: '44.882', longitude: '-93.2218' },
        { country_code: 'US', region_name: 'New York', iata: 'MSS', icao: 'KMSS', airport: 'Massena International Airport (Richards Field)', latitude: '44.9358', longitude: '-74.8456' },
        { country_code: 'US', region_name: 'New York', iata: 'MSV', icao: 'KMSV', airport: 'Sullivan County International Airport', latitude: '41.7016', longitude: '-74.795' },
        { country_code: 'US', region_name: 'Louisiana', iata: 'MSY', icao: 'KMSY', airport: 'Louis Armstrong New Orleans International Airport', latitude: '29.9934', longitude: '-90.258' },
        { country_code: 'US', region_name: 'Michigan', iata: 'MTC', icao: 'KMTC', airport: 'Selfridge Air National Guard Base', latitude: '42.6135', longitude: '-82.8369' },
        { country_code: 'US', region_name: 'New Mexico', iata: 'LRU', icao: 'KLRU', airport: 'Las Cruces International Airport', latitude: '32.2894', longitude: '-106.922' },
        { country_code: 'US', region_name: 'Washington', iata: 'MWH', icao: 'KMWH', airport: 'Grant County International Airport', latitude: '47.2077', longitude: '-119.32' },
        { country_code: 'US', region_name: 'Texas', iata: 'ELP', icao: 'KELP', airport: 'El Paso International Airport', latitude: '31.8072', longitude: '-106.378' },
        { country_code: 'US', region_name: 'Texas', iata: 'LRD', icao: 'KLRD', airport: 'Laredo International Airport', latitude: '27.5438', longitude: '-99.4616' },
        { country_code: 'US', region_name: 'South Carolina', iata: 'MYR', icao: 'KMYR', airport: 'Myrtle Beach International Airport', latitude: '33.6797', longitude: '-78.9283' },
        { country_code: 'US', region_name: 'Missouri', iata: 'VIH', icao: 'KVIH', airport: 'Rolla National Airport', latitude: '38.1274', longitude: '-91.7695' },
        { country_code: 'US', region_name: 'Texas', iata: 'EGP', icao: '', airport: 'Maverick County Memorial International Airport', latitude: '28.8572', longitude: '-100.512' },
        { country_code: 'US', region_name: 'Texas', iata: 'MGI', icao: '', airport: 'Aransas National Wildlife Refuge Airport', latitude: '28.323', longitude: '-96.464' },
        { country_code: 'US', region_name: 'Maine', iata: 'LIZ', icao: '', airport: 'Loring International Airport', latitude: '46.9504', longitude: '-67.8859' },
        { country_code: 'US', region_name: 'Wisconsin', iata: 'VOK', icao: 'KVOK', airport: 'Volk Field Air National Guard Base', latitude: '43.939', longitude: '-90.2534' },
        { country_code: 'US', region_name: 'Florida', iata: 'ECP', icao: 'KECP', airport: 'Northwest Florida Beaches International Airport', latitude: '30.3571', longitude: '-85.7954' },
        { country_code: 'US', region_name: 'Arkansas', iata: 'LIT', icao: 'KLIT', airport: 'Clinton National Airport (Adams Field)', latitude: '34.7294', longitude: '-92.2243' },
        { country_code: 'US', region_name: 'Florida', iata: 'LEE', icao: 'KLEE', airport: 'Leesburg International Airport', latitude: '28.8231', longitude: '-81.8087' },
        { country_code: 'US', region_name: 'Ohio', iata: 'LCK', icao: 'KLCK', airport: 'Rickenbacker International Airport', latitude: '39.8138', longitude: '-82.9278' },
        { country_code: 'US', region_name: 'Arizona', iata: 'DUG', icao: 'KDUG', airport: 'Bisbee Douglas International Airport', latitude: '31.469', longitude: '-109.604' },
        { country_code: 'US', region_name: 'Texas', iata: 'LBB', icao: 'KLBB', airport: 'Lubbock Preston Smith International Airport', latitude: '33.6636', longitude: '-101.823' },
        { country_code: 'US', region_name: 'California', iata: 'LAX', icao: 'KLAX', airport: 'Los Angeles International Airport', latitude: '33.9425', longitude: '-118.408' },
        { country_code: 'US', region_name: 'Nevada', iata: 'LAS', icao: 'KLAS', airport: 'Harry Reid International Airport', latitude: '36.0801', longitude: '-115.152' },
        { country_code: 'US', region_name: 'Michigan', iata: 'LAN', icao: 'KLAN', airport: 'Capital Region International Airport', latitude: '42.7787', longitude: '-84.5874' },
        { country_code: 'US', region_name: 'Iowa', iata: 'DSM', icao: 'KDSM', airport: 'Des Moines International Airport', latitude: '41.534', longitude: '-93.6631' },
        { country_code: 'US', region_name: 'Florida', iata: 'LAL', icao: 'KLAL', airport: 'Lakeland Linder International Airport', latitude: '27.9889', longitude: '-82.0186' },
        { country_code: 'US', region_name: 'Texas', iata: 'DRT', icao: 'KDRT', airport: 'Del Rio International Airport', latitude: '29.3742', longitude: '-100.927' },
        { country_code: 'US', region_name: 'California', iata: 'OAK', icao: 'KOAK', airport: 'Oakland International Airport', latitude: '37.7213', longitude: '-122.221' },
        { country_code: 'US', region_name: 'Florida', iata: 'OCF', icao: 'KOCF', airport: 'Ocala International Airport (Jim Taylor Field)', latitude: '29.1726', longitude: '-82.2242' },
        { country_code: 'US', region_name: 'Minnesota', iata: 'DLH', icao: 'KDLH', airport: 'Duluth International Airport', latitude: '46.8421', longitude: '-92.1936' },
        { country_code: 'US', region_name: 'New York', iata: 'OGS', icao: 'KOGS', airport: 'Ogdensburg International Airport', latitude: '44.6819', longitude: '-75.4655' },
        { country_code: 'US', region_name: 'Alaska', iata: 'KTN', icao: 'PAKT', airport: 'Ketchikan International Airport', latitude: '55.3556', longitude: '-131.714' },
        { country_code: 'US', region_name: 'Arizona', iata: 'OLS', icao: 'KOLS', airport: 'Nogales International Airport', latitude: '31.4177', longitude: '-110.848' },
        { country_code: 'US', region_name: 'Texas', iata: 'DFW', icao: 'KDFW', airport: 'Dallas/Fort Worth International Airport', latitude: '32.8968', longitude: '-97.038' },
        { country_code: 'US', region_name: 'Colorado', iata: 'DEN', icao: 'KDEN', airport: 'Denver International Airport', latitude: '39.8617', longitude: '-104.673' },
        { country_code: 'US', region_name: 'California', iata: 'ONT', icao: 'KONT', airport: 'Ontario International Airport', latitude: '34.056', longitude: '-117.601' },
        { country_code: 'US', region_name: 'Ohio', iata: 'DAY', icao: 'KDAY', airport: 'Dayton International Airport', latitude: '39.9024', longitude: '-84.2194' },
        { country_code: 'US', region_name: 'Florida', iata: 'DAB', icao: 'KDAB', airport: 'Daytona Beach International Airport', latitude: '29.1799', longitude: '-81.0581' },
        { country_code: 'US', region_name: 'Virginia', iata: 'ORF', icao: 'KORF', airport: 'Norfolk International Airport', latitude: '36.8946', longitude: '-76.2012' },
        { country_code: 'US', region_name: 'Hawaii', iata: 'KOA', icao: 'PHKO', airport: 'Kona International Airport at Keahole', latitude: '19.7388', longitude: '-156.046' },
        { country_code: 'US', region_name: 'California', iata: 'CXL', icao: 'KCXL', airport: 'Calexico International Airport', latitude: '32.6695', longitude: '-115.513' },
        { country_code: 'US', region_name: 'Louisiana', iata: 'CWF', icao: 'KCWF', airport: 'Chennault International Airport', latitude: '30.2106', longitude: '-93.1432' },
        { country_code: 'US', region_name: 'Kentucky', iata: 'CVG', icao: 'KCVG', airport: 'Cincinnati/Northern Kentucky International Airport', latitude: '39.0488', longitude: '-84.6678' },
        { country_code: 'US', region_name: 'Texas', iata: 'CRP', icao: 'KCRP', airport: 'Corpus Christi International Airport', latitude: '27.7704', longitude: '-97.5012' },
        { country_code: 'US', region_name: 'Wyoming', iata: 'CPR', icao: 'KCPR', airport: 'Casper-Natrona County International Airport', latitude: '42.908', longitude: '-106.464' },
        { country_code: 'US', region_name: 'Ohio', iata: 'CMH', icao: 'KCMH', airport: 'John Glenn Columbus International Airport', latitude: '39.998', longitude: '-82.8919' },
        { country_code: 'US', region_name: 'North Carolina', iata: 'CLT', icao: 'KCLT', airport: 'Charlotte Douglas International Airport', latitude: '35.214', longitude: '-80.9431' },
        { country_code: 'US', region_name: 'Washington', iata: 'CLM', icao: 'KCLM', airport: 'William R. Fairchild International Airport', latitude: '48.1202', longitude: '-123.5' },
        { country_code: 'US', region_name: 'Ohio', iata: 'CLE', icao: 'KCLE', airport: 'Cleveland Hopkins International Airport', latitude: '41.4117', longitude: '-81.8498' },
        { country_code: 'US', region_name: 'New York', iata: 'PBG', icao: 'KPBG', airport: 'Plattsburgh International Airport', latitude: '44.6509', longitude: '-73.4681' },
        { country_code: 'US', region_name: 'Florida', iata: 'PBI', icao: 'KPBI', airport: 'Palm Beach International Airport', latitude: '26.6832', longitude: '-80.0956' },
        { country_code: 'US', region_name: 'Michigan', iata: 'CIU', icao: 'KCIU', airport: 'Chippewa County International Airport', latitude: '46.2508', longitude: '-84.4724' },
        { country_code: 'US', region_name: 'Oregon', iata: 'PDX', icao: 'KPDX', airport: 'Portland International Airport', latitude: '45.5887', longitude: '-122.598' },
        { country_code: 'US', region_name: 'South Carolina', iata: 'CHS', icao: 'KCHS', airport: 'Charleston International Airport / Charleston Air Force Base', latitude: '32.8986', longitude: '-80.0405' },
        { country_code: 'US', region_name: 'Mississippi', iata: 'PGL', icao: 'KPQL', airport: 'Trent Lott International Airport', latitude: '30.4628', longitude: '-88.5292' },
        { country_code: 'US', region_name: 'Virginia', iata: 'PHF', icao: 'KPHF', airport: 'Newport News/Williamsburg International Airport', latitude: '37.1319', longitude: '-76.493' },
        { country_code: 'US', region_name: 'Pennsylvania', iata: 'PHL', icao: 'KPHL', airport: 'Philadelphia International Airport', latitude: '39.8719', longitude: '-75.2411' },
        { country_code: 'US', region_name: 'Michigan', iata: 'PHN', icao: 'KPHN', airport: 'St. Clair County International Airport', latitude: '42.911', longitude: '-82.5289' },
        { country_code: 'US', region_name: 'Arizona', iata: 'PHX', icao: 'KPHX', airport: 'Phoenix Sky Harbor International Airport', latitude: '33.4343', longitude: '-112.012' },
        { country_code: 'US', region_name: 'Illinois', iata: 'PIA', icao: 'KPIA', airport: 'General Wayne A. Downing Peoria International Airport', latitude: '40.6642', longitude: '-89.6933' },
        { country_code: 'US', region_name: 'Montana', iata: 'BZN', icao: 'KBZN', airport: 'Bozeman Yellowstone International Airport (Gallatin Field)', latitude: '45.7775', longitude: '-111.153' },
        { country_code: 'US', region_name: 'Florida', iata: 'PIE', icao: 'KPIE', airport: 'St. Pete-Clearwater International Airport', latitude: '27.9102', longitude: '-82.6874' },
        { country_code: 'US', region_name: 'Pennsylvania', iata: 'PIT', icao: 'KPIT', airport: 'Pittsburgh International Airport', latitude: '40.4915', longitude: '-80.2329' },
        { country_code: 'US', region_name: 'Arkansas', iata: 'BYH', icao: 'KBYH', airport: 'Arkansas International Airport', latitude: '35.9643', longitude: '-89.944' },
        { country_code: 'US', region_name: 'New York', iata: 'BUF', icao: 'KBUF', airport: 'Buffalo Niagara International Airport', latitude: '42.9405', longitude: '-78.7322' },
        { country_code: 'US', region_name: 'Vermont', iata: 'BTV', icao: 'KBTV', airport: 'Burlington International Airport', latitude: '44.4719', longitude: '-73.1533' },
        { country_code: 'US', region_name: 'Arizona', iata: 'YUM', icao: 'KNYL', airport: 'Yuma International Airport / MCAS Yuma', latitude: '32.6566', longitude: '-114.606' },
        { country_code: 'US', region_name: 'Florida', iata: 'PNS', icao: 'KPNS', airport: 'Pensacola International Airport', latitude: '30.4734', longitude: '-87.1866' },
        { country_code: 'US', region_name: 'Texas', iata: 'BRO', icao: 'KBRO', airport: 'Brownsville/South Padre Island International Airport', latitude: '25.9068', longitude: '-97.4259' },
        { country_code: 'US', region_name: 'Massachusetts', iata: 'BOS', icao: 'KBOS', airport: 'Logan International Airport', latitude: '42.3643', longitude: '-71.0052' },
        { country_code: 'US', region_name: 'Tennessee', iata: 'BNA', icao: 'KBNA', airport: 'Nashville International Airport', latitude: '36.1245', longitude: '-86.6782' },
        { country_code: 'US', region_name: 'Alaska', iata: 'JNU', icao: 'PAJN', airport: 'Juneau International Airport', latitude: '58.355', longitude: '-134.576' },
        { country_code: 'US', region_name: 'Washington', iata: 'BLI', icao: 'KBLI', airport: 'Bellingham International Airport', latitude: '48.7928', longitude: '-122.538' },
        { country_code: 'US', region_name: 'New Hampshire', iata: 'PSM', icao: 'KPSM', airport: 'Portsmouth International Airport at Pease', latitude: '43.0779', longitude: '-70.8233' },
        { country_code: 'US', region_name: 'California', iata: 'PSP', icao: 'KPSP', airport: 'Palm Springs International Airport', latitude: '33.8297', longitude: '-116.507' },
        { country_code: 'US', region_name: 'Michigan', iata: 'PTK', icao: 'KPTK', airport: 'Oakland County International Airport', latitude: '42.6655', longitude: '-83.4201' },
        { country_code: 'US', region_name: 'Montana', iata: 'BIL', icao: 'KBIL', airport: 'Billings Logan International Airport', latitude: '45.8077', longitude: '-108.543' },
        { country_code: 'US', region_name: 'Alabama', iata: 'BHM', icao: 'KBHM', airport: 'Birmingham-Shuttlesworth International Airport', latitude: '33.5629', longitude: '-86.7535' },
        { country_code: 'US', region_name: 'Florida', iata: 'JAX', icao: 'KJAX', airport: 'Jacksonville International Airport', latitude: '30.4941', longitude: '-81.6879' },
        { country_code: 'US', region_name: 'Mississippi', iata: 'JAN', icao: 'KJAN', airport: 'Jackson-Evers International Airport', latitude: '32.3112', longitude: '-90.0759' },
        { country_code: 'US', region_name: 'Maine', iata: 'BGR', icao: 'KBGR', airport: 'Bangor International Airport', latitude: '44.8074', longitude: '-68.8281' },
        { country_code: 'US', region_name: 'Maine', iata: 'PWM', icao: 'KPWM', airport: 'Portland International Jetport', latitude: '43.6462', longitude: '-70.3093' },
        { country_code: 'US', region_name: 'Washington', iata: 'PWT', icao: 'KPWT', airport: 'Bremerton National Airport', latitude: '47.4902', longitude: '-122.765' },
        { country_code: 'US', region_name: 'Washington', iata: 'BFI', icao: 'KBFI', airport: 'Boeing Field/King County International Airport', latitude: '47.53', longitude: '-122.302' },
        { country_code: 'US', region_name: 'Hawaii', iata: 'ITO', icao: 'PHTO', airport: 'Hilo International Airport', latitude: '19.7214', longitude: '-155.048' },
        { country_code: 'US', region_name: 'North Dakota', iata: 'ISN', icao: 'KISN', airport: 'Sloulin Field International Airport', latitude: '48.1779', longitude: '-103.642' },
        { country_code: 'US', region_name: 'Minnesota', iata: 'INL', icao: 'KINL', airport: 'Falls International Airport', latitude: '48.5662', longitude: '-93.4031' },
        { country_code: 'US', region_name: 'North Carolina', iata: 'RDU', icao: 'KRDU', airport: 'Raleigh-Durham International Airport', latitude: '35.8776', longitude: '-78.7875' },
        { country_code: 'US', region_name: 'North Carolina', iata: 'ILM', icao: 'KILM', airport: 'Wilmington International Airport', latitude: '34.2706', longitude: '-77.9026' },
        { country_code: 'US', region_name: 'Virginia', iata: 'RIC', icao: 'KRIC', airport: 'Richmond International Airport', latitude: '37.5052', longitude: '-77.3197' },
        { country_code: 'US', region_name: 'Arizona', iata: 'IFP', icao: 'KIFP', airport: 'Laughlin/Bullhead International Airport', latitude: '35.1574', longitude: '-114.56' },
        { country_code: 'US', region_name: 'Kansas', iata: 'ICT', icao: 'KICT', airport: 'Wichita Dwight D. Eisenhower National Airport', latitude: '37.6499', longitude: '-97.4331' },
        { country_code: 'US', region_name: 'New York', iata: 'RME', icao: 'KRME', airport: 'Griffiss International Airport', latitude: '43.2338', longitude: '-75.407' },
        { country_code: 'US', region_name: 'Minnesota', iata: 'BDE', icao: 'KBDE', airport: 'Baudette International Airport', latitude: '48.7284', longitude: '-94.6122' },
        { country_code: 'US', region_name: 'Nevada', iata: 'RNO', icao: 'KRNO', airport: 'Reno-Tahoe International Airport', latitude: '39.4991', longitude: '-119.768' },
        { country_code: 'US', region_name: 'New York', iata: 'IAG', icao: 'KIAG', airport: 'Niagara Falls International Airport', latitude: '43.1073', longitude: '-78.9462' },
        { country_code: 'US', region_name: 'New York', iata: 'ROC', icao: 'KROC', airport: 'Greater Rochester International Airport', latitude: '43.1189', longitude: '-77.6724' },
        { country_code: 'US', region_name: 'Virginia', iata: 'IAD', icao: 'KIAD', airport: 'Washington Dulles International Airport', latitude: '38.9445', longitude: '-77.4558' },
        { country_code: 'US', region_name: 'New Mexico', iata: 'ROW', icao: 'KROW', airport: 'Roswell International Air Center', latitude: '33.3016', longitude: '-104.531' },
        { country_code: 'US', region_name: 'Minnesota', iata: 'RRT', icao: 'KRRT', airport: 'Warroad International Memorial Airport (Swede Carlson Field)', latitude: '48.9414', longitude: '-95.3484' },
        { country_code: 'US', region_name: 'Minnesota', iata: 'RST', icao: 'KRST', airport: 'Rochester International Airport', latitude: '43.9083', longitude: '-92.5' },
        { country_code: 'US', region_name: 'Florida', iata: 'RSW', icao: 'KRSW', airport: 'Southwest Florida International Airport', latitude: '26.5362', longitude: '-81.7552' },
        { country_code: 'US', region_name: 'Maine', iata: 'HUL', icao: 'KHUL', airport: 'Houlton International Airport', latitude: '46.1231', longitude: '-67.7921' },
        { country_code: 'US', region_name: 'California', iata: 'SAN', icao: 'KSAN', airport: 'San Diego International Airport', latitude: '32.7336', longitude: '-117.19' },
        { country_code: 'US', region_name: 'Alabama', iata: 'HSV', icao: 'KHSV', airport: 'Huntsville International Airport (Carl T. Jones Field)', latitude: '34.6372', longitude: '-86.7751' },
        { country_code: 'US', region_name: 'Texas', iata: 'SAT', icao: 'KSAT', airport: 'San Antonio International Airport', latitude: '29.5337', longitude: '-98.4698' },
        { country_code: 'US', region_name: 'Georgia', iata: 'SAV', icao: 'KSAV', airport: 'Savannah/Hilton Head International Airport', latitude: '32.1276', longitude: '-81.2021' },
        { country_code: 'US', region_name: 'California', iata: 'SBD', icao: 'KSBD', airport: 'San Bernardino International Airport', latitude: '34.0954', longitude: '-117.235' },
        { country_code: 'US', region_name: 'Texas', iata: 'HRL', icao: 'KHRL', airport: 'Valley International Airport', latitude: '26.2285', longitude: '-97.6544' },
        { country_code: 'US', region_name: 'Kentucky', iata: 'SDF', icao: 'KSDF', airport: 'Louisville International Airport (Standiford Field)', latitude: '38.1744', longitude: '-85.736' },
        { country_code: 'US', region_name: 'Washington', iata: 'SEA', icao: 'KSEA', airport: 'Seattle-Tacoma International Airport', latitude: '47.449', longitude: '-122.309' },
        { country_code: 'US', region_name: 'Florida', iata: 'SFB', icao: 'KSFB', airport: 'Orlando Sanford International Airport', latitude: '28.7776', longitude: '-81.2375' },
        { country_code: 'US', region_name: 'Hawaii', iata: 'HNL', icao: 'PHNL', airport: 'Daniel K. Inouye International Airport', latitude: '21.3206', longitude: '-157.924' },
        { country_code: 'US', region_name: 'California', iata: 'SFO', icao: 'KSFO', airport: 'San Francisco International Airport', latitude: '37.619', longitude: '-122.375' },
        { country_code: 'US', region_name: 'Missouri', iata: 'SGF', icao: 'KSGF', airport: 'Springfield-Branson National Airport', latitude: '37.2457', longitude: '-93.3886' },
        { country_code: 'US', region_name: 'Michigan', iata: 'AZO', icao: 'KAZO', airport: 'Kalamazoo/Battle Creek International Airport', latitude: '42.2349', longitude: '-85.5521' },
        { country_code: 'US', region_name: 'California', iata: 'SJC', icao: 'KSJC', airport: 'San Jose International Airport', latitude: '37.3626', longitude: '-121.929' },
        { country_code: 'US', region_name: 'Connecticut', iata: 'BDL', icao: 'KBDL', airport: 'Bradley International Airport', latitude: '41.9392', longitude: '-72.6833' },
        { country_code: 'US', region_name: 'Illinois', iata: 'MDW', icao: 'KMDW', airport: 'Chicago Midway International Airport', latitude: '41.7861', longitude: '-87.7525' },
        {
            country_code: 'US', region_name: 'Illinois', iata: 'ORD', icao: 'KORD', airport: 'Chicago O\'Hare International Airport', latitude: '41.9786', longitude: ' - 87.9047'
        },
        { country_code: 'US', region_name: 'Illinois', iata: 'RFD', icao: 'KRFD', airport: 'Chicago Rockford International Airport', latitude: '42.1953', longitude: '-89.0972' },
        { country_code: 'US', region_name: 'Maryland', iata: 'BWI', icao: 'KBWI', airport: 'Baltimore/Washington International Airport', latitude: '39.1753', longitude: '-76.6683' },
        { country_code: 'US', region_name: 'New Jersey', iata: 'EWR', icao: 'KEWR', airport: 'Newark Liberty International Airport', latitude: '40.6925', longitude: '-74.1686' },
        { country_code: 'US', region_name: 'New York', iata: 'JFK', icao: 'KJFK', airport: 'John F. Kennedy International Airport', latitude: '40.6397', longitude: '-73.7789' },
        { country_code: 'US', region_name: 'New York', iata: 'SWF', icao: 'KSWF', airport: 'New York Stewart International Airport', latitude: '41.5042', longitude: '-74.1047' },
        { country_code: 'US', region_name: 'North Dakota', iata: 'XWA', icao: 'KXWA', airport: 'Williston Basin International Airport', latitude: '48.2597', longitude: '-103.751' },
        { country_code: 'US', region_name: 'Virginia', iata: 'DCA', icao: 'KDCA', airport: 'Ronald Reagan Washington National Airport', latitude: '38.8522', longitude: '-77.0378' },
        { country_code: 'UY', region_name: 'Durazno', iata: 'DZO', icao: 'SUDU', airport: 'Santa Bernardina International Airport', latitude: '-33.3589', longitude: '-56.4992' },
        { country_code: 'UY', region_name: 'Salto', iata: 'STY', icao: 'SUSO', airport: 'Nueva Hesperides International Airport', latitude: '-31.4385', longitude: '-57.9853' },
        { country_code: 'UY', region_name: 'Maldonado', iata: 'PDP', icao: 'SULS', airport: 'Capitan de Corbeta Carlos A. Curbelo International Airport', latitude: '-34.8551', longitude: '-55.0943' },
        { country_code: 'UY', region_name: 'Paysandu', iata: 'PDU', icao: 'SUPU', airport: 'Tydeo Larre Borges International Airport', latitude: '-32.3633', longitude: '-58.0619' },
        { country_code: 'UY', region_name: 'Cerro Largo', iata: 'MLZ', icao: 'SUMO', airport: 'Cerro Largo International Airport', latitude: '-32.3379', longitude: '-54.2167' },
        { country_code: 'UY', region_name: 'Artigas', iata: 'ATI', icao: 'SUAG', airport: 'Artigas International Airport', latitude: '-30.4007', longitude: '-56.5079' },
        { country_code: 'UY', region_name: 'Rivera', iata: 'RVY', icao: 'SURV', airport: 'Pres. Gral. Oscar D. Gestido International Airport', latitude: '-30.9746', longitude: '-55.4762' },
        { country_code: 'UY', region_name: 'Montevideo', iata: 'MVD', icao: 'SUMU', airport: 'Carrasco Gral. Cesareo L. Berisso International Airport', latitude: '-34.8384', longitude: '-56.0308' }];
}