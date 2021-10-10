const assert = require("chai").assert
const app = require("../app")
const chai = require("chai")
chai.use(require("chai-http"))
const expect = require("chai").expect;
const agent = require("chai").request.agent(app)


 describe("Customer login Test",function()
 {
     it("return 'Successful Login' after successful authentication",()=>
     {
         
         chai.request("http://localhost:3030")
         .post("/customer/custlog")
            .send({c_email:"test1@gmail.com",c_password:"Helloworld@123"})
            .end(function(err,res)
             { 
            //    console.log(res.body)
                assert.exists(res.body.message)
                expect(res.body.message).equals("Login successfull")
            })

     })
})



describe("Restaurant login Test",function()
{
    it("return 'Successful login' after successful login",()=>
    {
        
        chai.request("http://localhost:3030")
        .post("/Restaurant/reslog")
           .send({r_email:"bawarchi@gmail.com",r_password:"Helloworld@123"})
           .end(function(err,res)
            { 
           //    console.log(res.body)
               assert.exists(res.body.message)
               expect(res.body.message).equals("Login successfull")
           })

    })
})



describe("Customer Profile Fetch",function()
{
    it("return 'Successfuly fetched customer profile based on customer id '",()=>
    {
        
        chai.request("http://localhost:3030")
        .post("/customer/CustomerProfileFetch")
           .send({c_email:"abhiatl98@gmail.com"})
           .end(function(err,res)
            { 
               assert.exists(res.body)
                expect(res.body[0].c_id).equals(39)
           })

    })
})

describe("Favourite Restaurants",function()
{
    it("return 'Successfuly Fetched favourite restaurant id's'",()=>
    {
        
        chai.request("http://localhost:3030")
        .post("/Restaurant/GetFavRestID")
           .send({c_id:39})
           .end(function(err,res)
            { 
            //    console.log(res.body)
               assert.exists(res.body)
                expect(res.body[0].r_id).equals(68)
           })

    })
})

describe("Fetching customer contact based on customer id",function()
{
    it("return 'Fetched customer number based on customer id's'",()=>
    {
        
        chai.request("http://localhost:3030")
        .post("/customer/FetchCustNumber")
           .send({c_id:39})
           .end(function(err,res)
            { 
            //    console.log(res.body)
               assert.exists(res.body)
                expect(res.body[0].c_number).equals('7799299192')
           })

    })
})