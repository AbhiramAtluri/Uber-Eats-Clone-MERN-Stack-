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
         
            res.json(
              {
              message:"success"
              }
            )
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
         
            res.json(resp[0])
        }
        ).catch
        (
            err=>
            {
                res.json(err)
            }
        )

}


///Fetching number from custdetails

exports.fetchingCustNumber= async function(req,res)
{
    db.query("select c_number,c_email,c_name from cust_reg where c_id=?",[req.body.c_id])
    .then
    (resp=>
        {
          res.json(resp[0])
        }


    )
    .catch(err=>{
        res.json(err)
    })
}


///Adding order into database table
exports.placingOrder =async function(req,res)
{
    console.log(req.body.d_list)

    db.query("INSERT INTO orders(c_id,r_id,d_list) VALUES(?,?,?)",[req.body.c_id,req.body.r_id,req.body.d_list])
    .then
    (
        resp=>
        {
            res.json
            (
                resp
            )
        }
    )
    .catch(err=>
        {
         res.json
         (
             err
         )
        }
        )

}

///Fetching Orders for customer

exports.fetchOrders = async function(req,res)
{

    db.query("select * from orders where c_id =?",[req.body.c_id])
    .then(resp=>
        {
              
            res.json
            (
              resp[0]
            )
        }
        )
    .catch(err=>
        {
            res.json({
                message:"Noorders"
            })
        }
        )



}