module.exports = function import_data(con, data) {
    return new Promise(function (resolve, reject) {
        let values = [];
        data.forEach((d) => {
            values.push([d.DateTime, d.ResolutionCode, d.FlowValue, d.UpdateTime, d.InMapCode,d.OutMapCode]);
        });
        console.log(values[2]);
        let sql_query = "INSERT INTO physicalflows (DateTime, ResolutionCode, FlowValue, UpdateTime, InMapCode, OutMapCode) VALUES ?";
        con.query(sql_query, [values], function (err) {
            if (err) reject(err);
            resolve(1);
        });
    });
}
