
var linecolor = "rgb(202, 78, 34)";
const lineChart = document.getElementById('lineChart');


// page load
var linechart_config = loadLineChart();
var myLineChart = new Chart(lineChart, linechart_config);
setupProgressBars();

function setupProgressBars() {
    loadkpi('--dashoffset1', .26, document.querySelector("#number1"));
    loadkpi('--dashoffset2', .65, document.querySelector("#number2"));
    loadkpi('--dashoffset3', .08, document.querySelector("#number3"));
    loadkpi('--dashoffset4', .03, document.querySelector("#number4"));
}

function loadkpi(dashoffset, kpi_pct, number_elem) {
    let counter = 0;

    var finalstop = 450 - (kpi_pct / 3) * 450;
    document.documentElement.style.setProperty(dashoffset, finalstop);
    setInterval(() => {
        if (counter == kpi_pct * 100) {
            clearInterval;
        } else {
            counter += 1;
            number_elem.innerHTML = `${counter}%`;
        }
    }, 30);
}


//////////////////////////
// linechart
//////////////////////////
function loadLineChart() {
    const DATA_COUNT = 7;
    var weekdays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
    const data = {
        labels: weekdays,
        datasets: [{
            label: ['Current Week \u20AC25.088,20'],
            data: [8000, 16000, 10500, 21000, 26000, 36000, 24000],
            fill: false,
            borderColor: linecolor,
            tension: 0.4,
            pointStyle: false
        }, {
            label: ['Previous Week \u20AC33.263,74'],
            data: [21000, 42000, 19000, 33000, 4000, 20000, 34000],
            fill: false,
            borderColor: linecolor,
            borderDash: [2],
            tension: 0.4,
            pointStyle: false
        }
        ]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    usePointStyle: false,
                },
                tooltip: {
                    displayColors: false,
                    backgroundColor: 'rgb(27, 2, 83)',
                    callbacks: {
                        // title: function (context) {
                        //     return 'Fri, Apr 10, 7:51 PM';
                        // },
                        label: function (context) {
                            return '\u20AC' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: false,
                        color: '#555'
                    },
                    ticks: {
                        display: true,
                        color: '#555'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: false,
                        text: 'Value'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        display: true,
                        color: '#555',
                        callback: function (value) {
                            return '\u20AC' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    };
    return config;
}
