module.exports = function import_data(con, data) {
    return new Promise(function (resolve, reject) {
        let values = [];
        data.forEach((d) => {
            values.push([d.Datetime, d.resolutioncode, d.totalloadValue, d.updatetime, d.mapcode]);
        });
        // console.log(values[2]);
        let sql_query = "INSERT INTO actualtotalload (Datetime, ResolutionCode, TotalLoadValue, UpdateTime, MapCode) VALUES ?";
        con.query(sql_query, [values], function (err) {
            if (err) reject(err);
            resolve(1);
        });
    });
}
