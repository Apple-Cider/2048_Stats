var margin = {top: 20, right: 10, bottom: 20, left: 60};
var width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var maxScore = 0;
var x, y, xAxis, yAxis, svg, focus;

function initValues() {
	x = d3.time.scale().range([0, width]);
	y = d3.scale.linear().range([height, 0]);
	xAxis = d3.svg.axis().scale(x).orient("bottom");
	yAxis = d3.svg.axis().scale(y).orient("left");

	svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
		
	svg.append("defs").append("clipPath")
		.attr("id", "clip")
	.append("rect")
		.attr("width", width)
		.attr("height", height);
		
	focus = svg.append("g")
		.attr("class","focus")
		.attr("transform","translate(" + margin.left + "," + margin.top + ")");
}

function parseLog(logPath) {
	d3.csv(logPath, function(d) {
		var formatter = d3.time.format("%-m/%-d/%Y %-I:%-M:%-S %p");
		if(+d.score > maxScore) maxScore = +d.score;
		return {
			score: +d.score,
			largest: +d.largest,
			time: formatter.parse(d.date + " " + d.time),
			notes: d.notes.split(";")
		};
	}, saySomething);
}

function saySomething(error, rows) {
	console.log("maxScore = " + maxScore);
	for(var i = 0; i < rows.length; i++){
		console.log(rows[i].score);
	}
	x.domain([rows[0].time, rows[rows.length - 1].time]);
	y.domain([0, maxScore]);
	
	visualize(rows);
}

function visualize(data) {
	console.log("Visualizing data...");
	var area = d3.svg.area()
		.interpolate("monotone")
		.x(function(d) { return x(d.time); })
		.y0(height)
		.y1(function(d) { console.log(d.score + " -> " + y(d.score)); return y(d.score); });
	
	focus.append("g")
		.datum(data)
		.attr("d", area);
	
	focus.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
	
	focus.append("g")
		.attr("class", "y axis")
		//.attr("transform", "translate(" + width + ",0)")
		.call(yAxis);
}

window.onload = function() {
	initValues();
	parseLog("assets/data/log.csv");
};