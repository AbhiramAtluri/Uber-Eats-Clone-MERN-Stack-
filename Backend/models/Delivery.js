const db = require("../database/db")
const path = require('path')
const { query } = require("../database/db")


///Adding delivery addresses

exports.DeliveryAddressAdd =async function (req,res)
{

console.log("in del add")
    db.query("INSERT INTO d_address(c_id,d_add_1,d_add_2,d_zipcode) VALUES(?,?,?,?)",[req.body.c_id,req.body.d_add_1,req.body.d_add_2,req.body.d_zipcode])
    .then(resp=>
        {
         
            res.json(resp)
        }
        ).catch
        (
            err=>
            {
                res.json(err)
            }
        )

}


//Fetching delivery addrresss
exports.FetchDelAddress =async function (req,res)
{

console.log("in del fetch")
    db.query("SELECT * FROM d_address where c_id =?",[req.body.c_id])
    .then(resp=>
        {
         
            res.json(resp)
        }
        ).catch
        (
            err=>
            {
                res.json(err)
            }
        )

}