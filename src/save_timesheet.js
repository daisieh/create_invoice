(params) => {
  var owner = api.run("github.get_user_authenticated");
  console.log(owner);
  var CryptoJS = require("crypto-js");

  var wordArray = CryptoJS.enc.Utf8.parse(params.content);
  var base64 = CryptoJS.enc.Base64.stringify(wordArray);
  var raw_repo = "timesheets";
  var raw_file = params.filename;
  console.log("raw file is " + raw_file);
  try {
  	var gitBlob = api.run("github.get_files_in_repo", {owner: owner[0].login, repo: raw_repo, path: raw_file, ref: "master"})[0];
    var body = { committer: {name: owner[0].name, email: owner[0].email},
               message: "timesheet",
               content: base64,
               sha: gitBlob.sha,
               branch: "master"
             };
    api.run("github.add_file_to_repo", {owner: params.owner, path: raw_file, repo: raw_repo, $body: body});
  } catch(err) {
    var body = { committer: {name: owner[0].name, email: owner[0].email},
               message: "timesheet",
               content: base64,
               branch: "master"
             };
    api.run("github.add_file_to_repo", {owner: params.owner, path: raw_file, repo: raw_repo, $body: body});
  }
  
  return params.content;
}

