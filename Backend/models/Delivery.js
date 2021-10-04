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
            db.query("select del_id from d_address where c_id = ? and d_add_1 = ? and d_add_2 = ? and d_zipcode = ?",[req.body.c_id,req.body.d_add_1,req.body.d_add_2,req.body.d_zipcode])
            .then(respa=>
                {console.log((respa[0])[0].del_id)
                    res.json(
                        {
                        message:"success",
                        del_id:(respa[0])[0].del_id
                        }
                      )
                }
                
                )
                .catch(err=>{res.send(err)})
         
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
//   let row = JSON.stringify(req.body.d_list)
// console.log(req.body)

     let row = JSON.stringify(req.body.d_list)
     console.log(row)
    db.query("INSERT INTO orders(c_id,r_id,d_list,del_type,del_id) VALUES(?,?,?,?,?)",[req.body.c_id,req.body.r_id,row,req.body.del_type,req.body.del_id])
    .then
    (

        
        resp=>
       
        {
            // console.log(resp[0])
            
            res.json
            (
                {
                    message:"Successful"
                }
            )
        }
    )
    .catch(err=>
        {
            // console.log(err)
         res.json
         (
             {
                 message:"failed"
             }
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
            //   console.log(resp[0])
              resp = Object.values(JSON.parse(JSON.stringify(resp)));
              console.log(resp[0])
              let x =(resp[0])[0].d_list
              console.log(x[0])
            //  let data = JSON.parse((resp[0])[0].d_list)
            res.json
            (resp[0])
        }
        )
    .catch(err=>
        {  console.log(err)
            res.json({
                message:"Noorders"
            })
        }
        )
}

/////Fetching delivery address in customer orders list

exports.FetchDelAddressInCustomerOrders =async function (req,res)
{

let del_id = req.body.del_id
console.log("del id is" + del_id)
console.log("in del fetch")
    db.query("SELECT * FROM d_address where del_id =?",[del_id])
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