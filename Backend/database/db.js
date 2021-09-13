const mysql = require("mysql2")

const pool = mysql.createPool(
    {
       host:"localhost",
       user:"root",
       database:"uber_eats",
       password:"1234"

    }
)

// const x = pool.promise()
// x.query("SELECT * FROM res_reg").then(res =>{console.log(res[0])})

// console.log()

module.exports = pool.promise();