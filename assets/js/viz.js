function parseLog(logPath) {
	d3.csv(logPath, function(d) {
		var formatter = d3.time.format("%-m/%-d/%Y %-I:%-M:%-S %p");
		var notes = d.notes;
		console.log("d.notes = " + notes);
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
}

window.onload = function() {
	parseLog("assets/data/log.csv");
};