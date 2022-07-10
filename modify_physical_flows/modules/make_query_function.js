module. exports  =  function checkSub(con, sql_query)  {
    return new Promise(function (resolve, reject){
        
        con.connect(function(err) {
            if (err) reject (err);
            con.query(sql_query, function (err, result, fields) {
              if (err) reject (err);
              
                resolve(result);
            });
          });
    })
}