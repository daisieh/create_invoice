(params) => {
  var moment = require('moment.js');
  var user = api.run("toggl.get_current_user_data")[0];
  var dates = {start: moment(params.start_date), end: moment(params.end_date)};
  var report = api.run("this.get_detailed_report", {start_date: dates.start.format('YYYY-MM-DD'), end_date: dates.end.format('YYYY-MM-DD')});
  var table = [['"Project Name"', '"Task Name"', '"Notes"', '"Time Spent"', '"Date"', '"Billable Status"', '"Staff Name"', '"Email"']];
  var total = 0;
  var total_duration = 0;
  for (var i in report) {
    total += report[i].billable;
    var row = [];
    row.push('"'+report[i].client+'"');
    row.push('"'+report[i].project+'"');
    row.push('"'+report[i].description+'"');
    var duration = moment.duration(report[i].dur);
    total_duration += duration;
    var min = duration.minutes();
    if (String(min).length < 2) {
      min = "0" + String(min);
    }
    row.push('"'+String(duration.hours() + ":" + min)+'"');
    row.push('"'+moment(report[i].start).format('YYYY-MM-DD')+'"');
    var billable = "Non Billable";
    if (report[i].is_billable) { billable = "Billable"; }
    row.push('"'+billable+'"');
    row.push('"'+user.data.fullname+'"');
    row.push('"'+user.data.email+'"');
    table.push(row);
  }
  console.log("total $" + total.toFixed(2));
  console.log("total duration " + total_duration);
  
  var csv = "";
  for (var i in table) {
    csv += table[i].join() + "\n";
  }
  
  return api.run("this.save_timesheet", {filename: dates.end.format('YYYY-MM-DD') + ".csv", content: csv})[0].download_url;
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */