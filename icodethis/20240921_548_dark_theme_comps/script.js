
const lineChart = document.getElementById('lineChart');
const sliderOne = document.getElementById("slider-minmax-min");
const sliderTwo = document.getElementById("slider-minmax-max");
const sliderTen = document.getElementById("slider-tension");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let displayTension = document.getElementById("tensionVal");
const minGap = 5;
let sliderTrack = document.querySelector(".slider-tracker");
let sliderMaxValue = document.getElementById("slider-minmax-min").innerHTML.max;
slideOne();
slideTwo();

sliderOne.addEventListener('input', slideOne);
sliderTwo.addEventListener('input', slideTwo);
sliderTen.addEventListener('input', slideTension);



// https://www.chartjs.org/docs/latest/samples/advanced/linear-gradient.html
// let width, height, gradient;
// function getGradient(ctx, chartArea) {
//     const chartWidth = chartArea.right - chartArea.left;
//     const chartHeight = chartArea.bottom - chartArea.top;
//     if (!gradient || width !== chartWidth || height !== chartHeight) {
//         // Create the gradient because this is either the first render
//         // or the size of the chart has changed
//         width = chartWidth;
//         height = chartHeight;
//         gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
//         gradient.addColorStop(0, 'rgb(54, 162, 235)');
//         gradient.addColorStop(0.5, 'rgb(255, 205, 86)');
//         gradient.addColorStop(1, 'rgb(255, 99, 132)');
//     }

//     return gradient;
// }

var linechart_config = loadExtrapolatedChart(lineChart, 0.4, displayValOne.textContent, displayValTwo.textContent);
const myLineChart = new Chart(lineChart, linechart_config);


sliderOne.addEventListener('input', updateScales);
sliderTwo.addEventListener('input', updateScales);
sliderTen.addEventListener('input', () => {
    myLineChart.data.datasets = getDatasets(getDatapoints(), getGradient(lineChart.getContext('2d')), parseFloat(displayTension.textContent));
    console.table(myLineChart.data.datasets);
    myLineChart.update();
});


// adapted from https://www.chartjs.org/docs/latest/samples/line/interpolation.html
function loadExtrapolatedChart(the_ctx, tension, minVal, maxVal) {
    var context = the_ctx.getContext('2d');
    const DATA_COUNT = 8;
    const labels = [];
    for (let i = 0; i < DATA_COUNT; ++i) {
        labels.push(i.toString());
    }
    const datapoints = getDatapoints();
    var gradient = getGradient(context);
    const data = {
        labels: labels,
        datasets: getDatasets(datapoints, gradient, tension),
    };
    const config = {
        type: 'line',
        data: data,
        options: getOptions()
    };
    return config;
}

function updateScales() {
    myLineChart.options = getOptions();
    myLineChart.update();
}

function getDatasets(datapoints, gradient, tension) {
    return [
        {
            //     label: 'Cubic interpolation (monotone)',
            //     data: datapoints,
            //     borderColor: gradient,
            //     fill: true,
            //     cubicInterpolationMode: 'monotone',
            //     tension: tension
            // }, {
            // label: 'Cubic interpolation',
            data: datapoints,
            borderColor: gradient,
            backgroundColor: 'rgba(13, 22, 35, 0.7)',
            fill: true,
            tension: tension
            // }, {
            //     label: 'Linear interpolation (default)',
            //     data: datapoints,
            //     borderColor: 'rgb(75, 192, 192)',
            //     fill: false
        }
    ];
}

function getGradient(context) {

    // const gradient = context.createLinearGradient(100, 300, 200, 300);
    // const gradient = context.createLinearGradient(50, 300, 290, 310);
    const gradient = context.createLinearGradient(100, 280, 290, 310); // x axis-based
    // const gradient = context.createLinearGradient(200, 100, 290, 310); // diagonal
    // const gradient = context.createLinearGradient(300, 90, 200, 310); // diagonal2
    // const gradient = context.createLinearGradient(300, 90, 200, 110); // opposite x-based
    // const gradient = context.createLinearGradient(300, 190, 200, 110); // opposite x-based

    // const angle = 330 * Math.PI / 180;
    // var x2 = 400 * Math.cos(angle);  // angle in radians
    // var y2 = 400 * Math.sin(angle);  // angle in radians
    // var gradient = context.createLinearGradient(0, 0, x2, y2);

    var blue = 'rgb(0, 0, 255)';
    var green = 'rgb(0, 255, 0)';
    var red = 'rgb(255, 0, 0)';

    var brightblue1 = 'rgb(82, 238, 204)';
    var purple1 = 'rgb(108, 99, 255)';
    var magenta1 = 'rgb(158, 52, 142)';
    var magenta2 = 'rgb(255, 0, 255)';
    var color1 = brightblue1;
    var color2 = magenta2;
    var color3 = purple1;
    gradient.addColorStop(0, color1);
    gradient.addColorStop(0.5, color2);
    gradient.addColorStop(1, color3);
    return gradient;
}

function getDatapoints() {
    return [0, 10, 5, 33.4, 25, 20, 18, 24];
}

function getOptions() {
    return {
        responsive: true,
        interaction: {
            intersect: false,
        },
        plugins: {
            legend: {
                display: false,
                labels: {
                    color: 'rgb(255, 255, 255)'
                }
            },
            tooltip: {
                // usePointStyle: true,
                displayColors: false,
                callbacks: {
                    title: function (context) {
                        return '';
                    },
                    label: function (context) {
                        return context.parsed.y;
                        // return data.labels[tooltipItems.index];
                    }
                    // label: function (context) {
                    //     let label = context.parsed.y;


                    //     // if (context.parsed.y !== null) {
                    //         // label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                    //     // }
                    //     return label;
                    // },
                    // labelPointStyle: function (context) {
                    //     return {
                    //         pointStyle: 'triangle',
                    //         rotation: 0
                    //     };
                    // }
                }
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: false,
                    color: 'rgb(255, 255, 255)'
                },
                ticks: {
                    display: true,
                    color: 'rgb(255, 255, 255)'
                }
            },
            y: {
                display: true,
                title: {
                    display: false,
                    text: 'Value'
                },
                suggestedMin: displayValOne.textContent,
                suggestedMax: displayValTwo.textContent,
                ticks: {
                    display: true,
                    color: 'rgb(255, 255, 255)'
                }
            }
        }
    };
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

//// utilities

//// sliders 
// https://codingartistweb.com/2021/06/double-range-slider-html-css-javascript/
function slideOne() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    fillColor();
}

function slideTwo() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor();
}

function fillColor() {
    var percent1 = (sliderOne.value / sliderMaxValue) * 100;
    var percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    // sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2-10}%, #dadae5 ${percent2}%)`;
    sliderTrack.style.background = `linear-gradient(to right, rgb(13, 22, 35) ${percent1}% , rgb(82, 238, 204) ${percent1}% , #935cf5 ${percent2 - 10}%, rgb(13, 22, 35) ${percent2}%)`;
}

function slideTension() {
    console.log(sliderTen.value);
    console.log(displayTension);
    displayTension.textContent = parseFloat(sliderTen.value).toFixed(1);
}