
const restResolvers = require('./RestaurantResolvers')
const custResolver = require('./CustomerResolver')
const orderResolver = require('./OrderResolver')
const DeliveryResolver = require('./DeliveryResolver')
 const DishResolver = require('./DishResolver')

module.exports = {
    Query:{
        ...restResolvers.Query,
        ...custResolver.Query,
        ...orderResolver.Query,
        ...DeliveryResolver.Query,
        ...DishResolver.Query
    },
    Mutation:{
        ...restResolvers.Mutation,
        ...custResolver.Mutation,
        ...orderResolver.Mutation,
        ...DeliveryResolver.Mutation,
        ...DishResolver.Mutation
    }
}