(params) => {
  var moment = require('moment.js');
  var user = api.run("toggl.get_current_user_data")[0];
  var report = api.run("this.get_detailed_report", {start_date: params.start_date, end_date: params.end_date});
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
  
  api.run("this.save_timesheet", {filename: params.end_date+ ".csv", content: csv});
  return table;
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */