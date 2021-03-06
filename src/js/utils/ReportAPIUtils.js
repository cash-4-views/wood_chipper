var request = require("superagent");

module.exports = {

	// uploadReport: function(reportCSV) {
	// 	"use strict";

	// 	request.post("/api/v1/reports")
	// 					.type("form")
	// 					.field("upload-report", reportCSV)
	// 					.end(function(err, res) {
	// 						console.log(err, res);
	// 					});

	// },

	getReportList: function(onReceivingDataFn) {
		"use strict";

		request.get("/api/v1/reports")
						.end(function(err, res){
							if(err) console.log("Error:" + err);
							return onReceivingDataFn(res.body);
						});
	},

	// downloadReportForID: function(YYYY_MM, customid) {
	// 	"use strict";

	// 	// Why is this not downloading? Response comes correctly but doesn't download
	// 	request.get("/api/v1/reports/" + YYYY_MM)
	// 					.query({customid: customid, csv: true})
	// 					.end(function(err, res) {
	// 						if(err) console.log(err);
	// 						else console.log(res);
	// 					});
	// },

	approveReportForID: function(YYYY_MM, customid, onSuccess) {
		"use strict";

		request.put("/api/v1/approvedlist/" + customid)
						.send({YYYY_MM: YYYY_MM})
						.end(function(err, res) {
							if(err) return onSuccess({type: "Error!", content: "There was an error approving the report"});
							else 		return onSuccess({type: "Success!", content: "Report approved. " +  (res.text && res.text.length ? res.text : "Emails sent.")});
						});
	},

	getReportRows: function(YYYY_MM, queryObject, getTheRest, onReceivingDataFn) {
		"use strict";

		if(getTheRest) queryObject.getAll = true;

		request.get("/api/v1/reports/" + YYYY_MM)
						.query(queryObject)
						.end(function(err, res) {
							if(err) console.log("Error: " + err);
							onReceivingDataFn(res.body.results, res.body.token, queryObject);
						});
	},

	submitCustomID: function(YYYY_MM, customid, rowkey, onSuccess) {
		"use strict";

		request.put("/api/v1/reports/" + YYYY_MM + "/" + rowkey)
						.send({Custom_ID: customid})
						.end(function(err, res) {
							if(err) return onSuccess({type: "Error!", content: "There was an error submitting that Custom ID"});
							else 		return onSuccess({type: "Success!", content: "Custom ID submitted"});
						});
	}

};

