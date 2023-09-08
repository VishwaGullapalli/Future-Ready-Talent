var XLSX = require("xlsx");
// var workbook = XLSX.readFile("demo.xlsx");
var sheet_name_list = workbook.SheetNames;
console.log(sheet_name_list); 

sheet_name_list.forEach(function (y) {
  var worksheet = workbook.Sheets[y];

  var headers = {};
  var data = [];
  for (z in worksheet) {
    if (z[0] === "!") continue;
    var col = z.substring(0, 1);

    var row = parseInt(z.substring(1));

    var value = worksheet[z].v;

    if (row == 1) {
      headers[col] = value;
      continue;
    }

    if (!data[row]) data[row] = {};
    data[row][headers[col]] = value;
  }
  data.shift();
  data.shift();
  console.log(data);
});