function parseLog(logPath) {
	d3.csv(logPath, function(d) {
		var formatter = d3.time.format("%-m/%-d/%Y %-I:%-M:%-S %p");
		return {
			score: +d.score,
			largest: +d.largest,
			timestamp: formatter(d.date + " " + d.time),
			notes: d.notes.split(";")
		};
	});
}

parseLog("assets/data/log.csv");