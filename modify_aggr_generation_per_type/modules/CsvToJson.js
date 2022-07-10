// separator is either ';' or ','
// based on the csv format given
// csv must be read through fs.ReadFileSync (or Async)
module.exports = function(csv, separator){
    var lines = csv.toString().split("\r\n");

    var result = [];

    var headers=lines[0].split(separator);

    for(var i=1;i<lines.length;i++){

        var obj = {};
        var currentline=lines[i].split(separator);

        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }

    return result; //JavaScript object
}