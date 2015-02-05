var margin = {top: 20, right: 10, bottom: 20, left: 10};
var width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var x = d3.time.scale().range([0, width]),
	y = d3.scale.linear().range([height, 0]);
	
var maxScore = 0;

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform","translate(" + margin.left + "," + margin.top + ")");


function parseLog(logPath) {
	d3.csv(logPath, function(d) {
		var formatter = d3.time.format("%-m/%-d/%Y %-I:%-M:%-S %p");
		if(+d.score > maxScore) maxScore = +d.score;
		return {
			score: +d.score,
			largest: +d.largest,
			timestamp: formatter.parse(d.date + " " + d.time),
			notes: d.notes.split(";")
		};
	}, saySomething);
}

function saySomething(error, rows) {
	for(var i = 0; i < rows.length; i++){
		console.log(rows[i].score);
	}
	visualize(rows);
}

function visualize(data) {
	console.log("maxScore = " + maxScore);
}

window.onload = function() {
	parseLog("assets/data/log.csv");
};