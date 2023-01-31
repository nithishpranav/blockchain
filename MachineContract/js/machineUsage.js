const fs = require("fs");
const { parse } = require("csv-parse");

fs.createReadStream("../machineUsage.csv")
  .pipe(parse({ 
    delimiter: ",", 
    from_line: 2 
}))
  .on("data", function (row) {
    
    console.log(row);
    //sleep
    
    
  })
  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error) {
    console.log(error.message);
  });