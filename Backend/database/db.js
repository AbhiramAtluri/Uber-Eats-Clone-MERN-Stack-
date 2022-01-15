const mysql = require("mysql2")

const conn = mysql.createConnection(
    {
//        host:,
//        user:"admin",
//        database:"uber_eats",
//        password:"qwertyui",
//        port:3307,
       

    }
)

// const x = pool.promise()
// x.query("SELECT * FROM res_reg").then(res =>{console.log(res[0])}).catch(err=>{console.log(err)})

// console.log()

module.exports = conn.promise();
