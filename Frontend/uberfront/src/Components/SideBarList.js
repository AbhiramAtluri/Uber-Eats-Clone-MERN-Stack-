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
    title : "Edit Dishes",
    icon : <FastfoodIcon></FastfoodIcon>,
    link : "/Dishes"
}



]

export default sideBarList