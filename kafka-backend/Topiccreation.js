var Kafka = require('kafka-node'),
    HighLevelProducer = Kafka.HighLevelProducer,
    client = new Kafka.KafkaClient(),
    producer = new HighLevelProducer(client);
// let dishTopics = ['save_dish', 'update_dish', 'get_dish_byId', 'get_all_dishes', 'searchBy_dishName', 'searchBy_dishType'];
// let userTopics = ['get_customer_byId', 'save_customer', 'update_customer', 'get_restaurants_list', 'customer_location', 'get_restaurants_byId', 'save_restaurant', 'update_restaurant']
// let RestImages=['save_restImage','get_restImage']
// let orderTopics=['save_order','get_orders_customer','get_orders_restaurant','update_orderStatus']
let loginTopics=['rest_reg',"cust_log","cust_reg","rest_log","updateRestaurantProfile","getRestaurantProfile","getCustomerProfileDetails","updateCustomerProfile","getCustomerProfileBasedOnCid","AddDish","EditDish","AddDeliveryAddress","FetchDelAddress","FetchDelAddressInCustomerOrders","PlaceOrder","FetchCustNumber","FetchOrders","UpdateOrderStatus","FetchRestaurantDetailsById","FetchRestaurantNameFromCustId","GetAllRestaurants","GetRestaurantDetailsFromEmail","AddRestToFav","GetFavRest","getAllnearestRestaurants","response_topic"];
producer.on("ready", function () {
    /**
     * Create Dish Topics
     */
    // producer.createTopics(dishTopics,false,function (err,data){
    //     console.log(data)
    //     console.log(err)
    // })

    /**
     * Create User topics
     */
    // producer.createTopics(userTopics, false, function (err, data) {
    //     console.log(data)
    //     console.log("Error", err)
    // })
    /**Create Rest Images topics */
    // producer.createTopics(RestImages,false,function(err,data){
    //     console.log(data)
    //     console.log("error",err)
    // })
    /**Create Orders topics */
    // producer.createTopics(orderTopics,false,function(err,data){
    //     console.log(data)
    //     console.log("error",err)
    // })
    /**Create login topics */
    producer.createTopics(loginTopics,false,function(err,data){
        console.log(data)
        console.log("error",err)
    })
})