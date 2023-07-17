// Chart code based on https://www.anychart.com/products/anychart/gallery/Radar_Charts_(Spiderweb)/Starter_Pokemon_Comparison.php

anychart.onDocumentReady(function () {

    var data1 = [
        { x: "Supporting", value: 30 },
        { x: "Versatility", value: 20 },
        { x: "Farming", value: 20 },
        { x: "Emotionless", value: 20 },
        { x: "Fighting", value: 10 },
        { x: "Pushing", value: 0 }
    ];

    var data2 = [
        { x: "Supporting", value: 10 },
        { x: "Versatility", value: 40 },
        { x: "Farming", value: 50 },
        { x: "Emotionless", value: 10 },
        { x: "Fighting", value: 40 },
        { x: "Pushing", value: 20 }
    ];

    var data3 = [
        { x: "Supporting", value: 60, fill: "red" },
        { x: "Versatility", value: 60, fill: "orange" },
        { x: "Farming", value: 60, fill: "lightgray" },
        { x: "Emotionless", value: 60, fill: "green" },
        { x: "Fighting", value: 60, fill: "blue" },
        { x: "Pushing", value: 60, fill: "purple" }
    ];

    // create radar chart
    var chart = anychart.radar();

    // set chart yScale settings
    chart.yScale()
        .minimum(0)
        .maximum(60)
        .ticks({ 'interval': 10 });

    // color alternating cells
    chart.yGrid().palette(["#e8ebf6 0.1", "#d0d4e7 0.7"]);

    // create first series
    chart.area(data1).name('Christine').markers(true).fill(['#43b2ee 0.5', '#879ae9 0.5']).stroke(['#f9bce2', '#f2a6b0'])

    // create second series
    chart.area(data2).name('Jordan').markers(true).fill(['#f9bce2 0.5', '#f2a6b0 0.5']).stroke("#9BC53D")

    // create third series
    chart.marker(data3).stroke("white", 1);

    // set tooltip text template
    var tooltip = chart.getSeries(2).tooltip();
    tooltip.format("Valid Values: 0-60");

    // set container id for the chart
    chart.container('container');

    chart.background().fill("#e8ebf6");

    // initiate chart drawing
    chart.draw();

});