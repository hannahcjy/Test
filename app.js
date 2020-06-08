var svgWidth = 1000;
var svgHeight = 500;

// create an SVG element
var svg = d3.select("#svg-area")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Load csv data
d3.csv("data.csv").then(function(bikeData) {

  console.log(bikeData);

  // cast the data from the csv as numbers
  bikeData.forEach(function(data) {
    data.trip_start_time = +data.trip_start_time;
    data.trip_duration_seconds = +data.trip_duration_seconds;
  });

  // Create a scale for your independent (x) coordinates
  var xScale = d3.scaleLinear()
    .domain(d3.extent(bikeData, d => d.trip_start_time))
    .range([0, svgWidth]);

  // Create a scale for your dependent (y) coordinates
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(bikeData, d => d.trip_duration_seconds)])
    .range([svgHeight, 0]);

  // create a line generator function and store as a variable
  // use the scale functions for x and y data
  var createLine = d3.line()
    .x(data => xScale(data.trip_start_time))
    .y(data => yScale(data.trip_duration_seconds));

  // Append a path element to the svg, make sure to set the stroke, stroke-width, and fill attributes.
  svg.append("path")
    .attr("stroke", "blue")
    .attr("stroke-width", "1")
    .attr("fill", "none")
    .attr("d", createLine(bikeData));

}).catch(function(error) {
  console.log(error);
});
