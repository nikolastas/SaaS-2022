// separator is either ';' or ','
// based on the csv format given
// csv must be read through fs.ReadFileSync (or Async)
module.exports = function(csv, separator){
    
    var lines = csv.toString().split("\n");
    
    var result = [];

    var headers=lines[0].split(separator);
    
    for(var i=1;i<lines.length-1;i++){
        
        var obj = {};
        var currentline=lines[i].split(separator);
        if(currentline[0] != null && currentline[0] != ""){
            for(var j=0;j<headers.length;j++){
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);
        }

    }
    
    return result; //JavaScript object
}