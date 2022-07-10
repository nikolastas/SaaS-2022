module.exports = function import_data(con, data) {
    return new Promise(function (resolve, reject) {
        let values = [];
        data.forEach((d) => {
            values.push([d.DateTime , d.ResolutionCode, d.ProductionType , d.ActualGenerationOutput, d.ActualConsumption,d.UpdateTime,d.MapCode]);
        });
        console.log(values[2]);
        let sql_query = "INSERT INTO aggrgenerationpertype (Datetime, ResolutionCode, ProductionType, ActualGenerationOutput, ActualConsumption, UpdateTime, MapCode) VALUES ?";
        con.query(sql_query, [values], function (err) {
            if (err) reject(err);
            resolve(1);
        });
    });
}
