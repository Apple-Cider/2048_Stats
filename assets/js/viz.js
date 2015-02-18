var margin = {top: 20, right: 10, bottom: 100, left: 60},
	margin2 = {top:440, right: 10, bottom: 20, left: 60};
var width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom,
	height2 = 500 - margin2.top - margin2.bottom;

var maxScore = 0;
var x, x2, y, y2, xAxis, x2Axis, yAxis, svg, focus, context, brush, line, line2;

function initValues() {
	x = d3.time.scale().range([0, width]);
	x2 = d3.time.scale().range([0, width]);
	y = d3.scale.linear().range([height, 0]);
	y2 = d3.scale.linear().range([height2, 0]);
	
	xAxis = d3.svg.axis().scale(x).orient("bottom");
	x2Axis = d3.svg.axis().scale(x2).orient("bottom");
	yAxis = d3.svg.axis().scale(y).orient("left");
	
	brush = d3.svg.brush()
		.x(x2)
		.on("brush", brushed);
	
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
	
	context = svg.append("g")
		.attr("class","context")
		.attr("transform","translate(" + margin2.left + "," + margin2.top + ")");
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
	x2.domain([rows[0].time, rows[rows.length - 1].time]);
	y.domain([0, maxScore]);
	y2.domain([0, maxScore]);
	
	visualize(rows);
}

function visualize(data) {
	console.log("Visualizing data...");
	line = d3.svg.line()
		.x(function(d) {
			//console.log(d.time + " -> " + x(d.time));
			return x(d.time);
		})
		.y(function(d) {
			//console.log(d.score + " -> " + y(d.score));
			return y(d.score);
		});
	
	line2 = d3.svg.line()
		.x(function(d) { console.log(d.time + " -> " + x2(d.time)); return x2(d.time); })
		.y(function(d) { console.log(d.score + " -> " + y2(d.score)); return y2(d.score); });
	
	focus.append("path")
		.datum(data)
		.attr("class", "line")
		.attr("d", line);
	
	focus.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
	
	focus.append("g")
		.attr("class", "y axis")
		.call(yAxis);
	
	context.append("path")
		.datum(data)
		.attr("class", "line")
		.attr("d", line2);
	
	context.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height2 + ")")
		.call(x2Axis);
	
	context.append("g")
		.attr("class", "x brush")
		.call(brush)
	.selectAll("rect")
		.attr("y", -6)
		.attr("height", height2 + 7);
}

function brushed() {
	x.domain(brush.empty() ? x2.domain() : brush.extent());
	focus.select(".line").attr("d", line);
	focus.select(".x.axis").call(xAxis);
}

window.onload = function() {
	initValues();
	parseLog("assets/data/log.csv");
};