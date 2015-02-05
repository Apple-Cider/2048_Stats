function parseLog(logPath) {
	d3.csv(logPath, function(d) {
		//var formatter = d3.time.format("%-m/%-d/%Y %-I:%-M:%-S %p");
		var notes = d.notes;
		return {
			score: +d.score,
			largest: +d.largest
			//timestamp: formatter(d.date + " " + d.time),
			//notes: d.notes.split(";")
		};
	}, saySomething);
}

function saySomething(error, rows) {
	for(var i = 0; i < rows.length; i++){
		console.log(rows[i].score);
	}
}

//window.onload = parseLog("assets/data/log.csv");
window.onload = function() {
	//alert("we're done here...");
	//alert("we'll get somewhere soon...");
	parseLog("assets/data/log.csv");
};