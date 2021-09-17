import React from "react";
import RestaurantIcon from '@material-ui/icons/Restaurant';
import FastfoodIcon from '@material-ui/icons/Fastfood';

const sideBarList = [
{
     title : "Profile",
     icon : <RestaurantIcon></RestaurantIcon>,
     link :"/RestProfile"
},

{
    title : "Orders",
    icon : <FastfoodIcon></FastfoodIcon>,
    link : "/Orders"

},
{
    title : "Add Dishes",
    icon : <FastfoodIcon></FastfoodIcon>,
    link : "/AddDishes"
}



]

export default sideBarList