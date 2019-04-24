(params) => {
  var moment = require('moment.js');
  var report = api.run("this.get_detailed_report", {start_date: params.start_date, end_date: params.end_date});
  var table = [];
  
  for (var i in report) {
    var row = [];
    var duration = moment.duration(report[i].dur);
    report[i].dur = duration.hours() + ":" + duration.minutes();
    report[i].start = moment(report[i].start).format('YYYY-MM-DD');
    report[i].email = "daisieh@gmail.com"
  }
  
  return report;
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */