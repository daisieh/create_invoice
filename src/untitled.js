(params) => {
  var moment = require('moment.js');
  var report = api.run("this.get_detailed_report", {start_date: params.start_date, end_date: params.end_date});
  
  for (var i in report) {
    report[i].start = moment(report[i].start).format('YYYY-MM-DD');
  }
  
  return report;
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */