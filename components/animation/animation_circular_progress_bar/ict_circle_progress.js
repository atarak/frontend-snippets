var number1 = document.querySelector("#number1");
var kpi1 = 0.65;
var dashoffset1 = "--dashoffset1";

console.log("number 1 is " + number1);

// var number2 = document.getElementById("number2");
// var kpi2 = 0.26;
// var dashoffset2 = '--dashoffset2';

var col = document.getElementById("color");
// console.log(col.innerHTML);

// page load
document.documentElement.style.setProperty('--dashoffset1', "0px");

// document.documentElement.style
//     .setProperty('--dashoffset2', "0px");

// document.documentElement.style
//     .setProperty('--dashoffset3', "0px");

// document.documentElement.style
//     .setProperty('--dashoffset4', "0px");


// loadkpi(dashoffset1, kpi1, number1);
// loadkpi(dashoffset2, kpi2, number2);
// loadkpi("--dashoffset3", 0.50, document.getElementById("number3"));
// loadkpi("--dashoffset4", 0.76, document.getElementById("number4"));

function loadkpi(dashoffset, kpi_pct, number_elem) {
    let counter = 0;
    let end_offset = 450;
    // setInterval(() => {
    //     if (counter == kpi_pct * 100) {
    //         clearInterval;
    //     } else {
    //         counter += 1;
    //         number_elem.innerHTML = `${counter}%`;
    //         document.documentElement.style
    //             .setProperty(dashoffset, end_offset - (counter / 100 * end_offset));
    //     }
    // }, 30);
}
