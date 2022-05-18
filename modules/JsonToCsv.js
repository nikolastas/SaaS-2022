//FIXME:make it work in this project

module.exports = function JsonToCsv   (obj) {
    if(obj.PPOList != undefined)
            obj = obj.PPOList;
        let jsonObject;
        //whack code that does the job
        if(!isArray(obj)) {
            let temp = {
                "" : null
            };
            temp["x"] = [];
            temp["x"].push(obj);
            jsonObject = JSON.stringify(temp["x"]);
        }
        else
            jsonObject = JSON.stringify(obj);
    
    // csv creation
    var data = typeof obj != 'object' ? JSON.parse(obj) : obj;
    
    var csv = data.map(row => Object.values(row));
    csv.unshift(Object.keys(data[0]));
    return csv.join('\n');
    
}