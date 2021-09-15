const mysql = require("mysql2")

const pool = mysql.createPool(
    {
       host:"uber-1.cgufr2o7hllp.us-east-2.rds.amazonaws.com",
       user:"admin",
       database:"uber_eats",
       password:"qwertyui",
       port:3307

    }
)

// const x = pool.promise()
// x.query("SELECT * FROM res_reg").then(res =>{console.log(res[0])}).catch(err=>{console.log(err)})

// console.log()

module.exports = pool.promise();