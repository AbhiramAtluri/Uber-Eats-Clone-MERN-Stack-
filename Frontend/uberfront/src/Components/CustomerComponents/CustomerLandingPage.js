import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"

import * as Yup from "yup";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
    useParams
} from "react-router-dom";
import CustSideBar from './CustSideBar';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { StylesContext } from '@material-ui/styles';
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'
import AddCircleIcon from '@material-ui/icons/AddCircle';
// import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
// import  restaurantlist  from './Restaurantlist';
import ElectricBikeIcon from '@mui/icons-material/ElectricBike';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from '@mui/icons-material/History';
import NavbarCust from './CustomerNavBar';
// import NavbarRest from './CustomerNavBar';

export default class CustomerLandingPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            c_id: "",
            c_email: "",
            restaurantlist :[],
            c_county :"",
            s_filter :"s_location",
            del_type :"s_both",
            masterList:[],
            favList:[] ,
           
            
        }

    }
    componentDidMount(props) {
        const c_id = this.props.location.state.c_id
        const c_email = this.props.location.state.c_email
     
        console.log(c_id)
        console.log(c_email)
        this.setState(
            {
                c_id: c_id, 

        

                c_email: c_email,
                
            }
        )


       ////Getting Customer Favs
       axios.post("http://localhost:3030/Restaurant/GetFavRestID",
       {
           c_id:c_id
       }
       )
       .then(res=>{
         console.log(res.data)
         this.setState(
             {
                favList:res.data
             }
             )
        }
        )

    //   axios.post("http://localhost:3030/Restaurant/GetFavRest",
    //   {
    //      c_id:this.props.location.state.c_id 
    //   })
    //   .then(res=>{
    //     this.setState(
    //         {
    //            favList:res.data
    //         })

    //   })


       console.log(this.state.c_county + "Before component")
       if(this.state.c_county ==="")
       {
        axios.post("http://localhost:3030/customer/CustomerProfileFetch",{c_email : c_email})
        .then(res =>
            
           
            ///NEAREST RESTAURANTS ARE FETCHED AFTER GETTING THE PROFILE DETAILS FROM ABOVE REQUEST
            {   
                if(res.data[0].c_county != "" && res.data[0].c_county != null)
                {
                this.setState(
                    {
                     c_county:res.data[0].c_county
                    }
                    )
            
                 


                 this.loadLandingPageRestaurantList(res.data[0].c_county)
              
            }
            else
            {
                this.loadLandingPageRestaurantList("Santa Clara County")
            }
        }

            )
            .catch(err=>{console.log(err)})
        
        }else
        {
         this.loadLandingPageRestaurantList(this.state.c_county)
        }
      

    }


   loadLandingPageRestaurantList(c_county)
   {console.log(this.state)
     ////Fetching the nearest and farthest restaurants  
    let nearbyrestaurants = "http://localhost:3030/Restaurant/GetAllNearestRestaurants"
    let restallrestaurants = "http://localhost:3030/Restaurant/GetFarAwayRestaurants"
     

    const responseOne = axios.post(nearbyrestaurants,
        {
            c_county :c_county
        })
   const responseTwo = axios.post(restallrestaurants,
    {
        c_county :c_county
    })     

    axios.all([responseOne,responseTwo])
    .then(axios.spread((...responses)=>
    {   console.log(responses[0])
        let a = responses[0].data
        if((a.message != 'NoLoc') || (a.message != 'NoLoc'))
        {
        let responseN = responses[0].data
        let  responseF = responses[1].data
           
    
          
         console.log(responseN)    
         console.log(responseF)
         var r_list = responseN.concat(responseF)

         console.log(r_list)
        if(this.state.del_type != "s_both")
        {    
         r_list = r_list.filter(value=>{return value.del_type ==this.state.del_type || value.del_type == "s_both" })
        }
        //  console.log("New R_List")
        // console.log(new_r_list )
        // console.log("Restaurant list old")
        // console.log(r_list)
         this.setState(

            {
                restaurantlist : r_list
            }
         )
         
         console.log(this.state)
        }else
        {   console.log("WRONGLOC")
            alert("Oops! We dont serve there yet")
        }

    }
    )
    )

   }
///LOADING RESTAURANT LIST BASED ON SEARCHED DISH
   loadLandingPageBasedOnDish =(e)=>
   {
    e.preventDefault()
    console.log(e.target.s_data.value)
      let s_data = e.target.s_data.value 
    //   console.log(s_dish)
      axios.post("http://localhost:3030/Restaurant/GetRestaurantsBasedOnDish",
      {
          s_dish : s_data
      }
      ).then
      (
          res=>
          {   
            console.log("Dish request")
            console.log(res.data.message)

            if(res.data.message !="NoDish")
            {
            let r_list = res.data
            if(this.state.del_type != "s_both")
            {    
             r_list = r_list.filter(value=>{return value.del_type ==this.state.del_type || value.del_type == "s_both" })
            }
              
            //   console.log(res.data)
            //   console.log("New List")
            //   console.log(r_list)
              this.setState(
                  { 
                    restaurantlist:r_list ,
                    masterList :res.data
                  })
                }
                else
                {
                  alert("Ooops! We dont serve that dish")  
                }
          }
      ).catch(err=>{console.log(err)})

   }


   handleFormOnSubmit=(e)=>
   {
       e.preventDefault()
       console.log(e.target.s_data.value)
       console.log(e.target.s_filter.value)
     if(e.target.s_filter.value == "s_location")
       {
       this.loadLandingPageRestaurantList(e.target.s_data.value)
       }
       if(e.target.s_filter.value == "s_dish")
        {
            this.loadLandingPageBasedOnDish(e)      
        }
   }



   handleDeliveryFilterChange = (e)=>
   {
       this.setState(
           {
            del_type:e.target.value
           }
       )
    if(this.state.s_filter =="s_location")
    {
     this.loadLandingPageRestaurantList(this.state.c_county)
    }
    if(this.state.s_filter == "s_dish")
    {
    //    this.loadLandingPageBasedOnDish(e)
    this.changeLandingPageFilteredWithDishOnChange(e)
    }
       console.log(e.target.value)
   }

changeLandingPageFilteredWithDishOnChange=(e)=>
{
    
    let r_list = this.state.masterList
    if(e.target.value != "s_both")
    {    
     r_list = r_list.filter(value=>{return value.del_type ==e.target.value || value.del_type == "s_both" })
    } 
    // console.log("New Function")   
    this.setState(
        {
            restaurantlist:r_list
        }
        )

}



   handleSearchBarFilterChange = (e)=>
   {
    this.setState(
        {
         s_filter:e.target.value
        }
    )
        console.log(e.target.value)


   } 


handleAddToFav =(r_id,e)=>{

   console.log(e.target.style.backgroundColor)
   e.target.style.color ="red"
    console.log(r_id)
  
    axios.post("http://localhost:3030/Restaurant/AddRestToFav",
    {
        r_id:r_id,
        c_id:this.state.c_id
    })
    .then(res=>
        {
            console.log(res)
        }
        )
    .catch(err=>{console.log(err)})    



} 
handleFavOnload=()=>
{
    // console.log("in onload")



}
FetchColour = (r_id)=>
{
 
let flist = this.state.favList
const found = flist.find(element =>{return element.r_id == r_id})
console.log(found)
 if(found)
 {
     return "error"
 }
 else
 {
     return ""
 }


}




    render() {


        const validationSchema = Yup.object(
            {

            }
        )
        let flag =1;
        const imageadd = "https://thumbor.thedailymeal.com/O5BS3X-3J3JKcsTKYdYd996xqsI=/870x565/https://www.thedailymeal.com/sites/default/files/slideshows/1943277/2108053/0.jpg";

        return (
            <div className="container-fluid" style={{ margin: 0, padding: 0 }}>
              <NavbarCust></NavbarCust>
                <div className="row" style={{ margin: 0, padding: 0 }} >
                    <div className="col-md-1" style={{ padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>


                        <ProSidebar width="228px" style={{ height: "2000px" }} collapsed = {true} >
                            <Menu iconShape="square">

                                <SubMenu style={{marginTop:"200px"}} icon={<ElectricBikeIcon/>} >
                                    <MenuItem icon={<PermIdentityIcon />}>Customize Profile<Link to={{ pathname: "/CustomerProfile", state: { c_id: this.state.c_id, c_email: this.state.c_email } }} /></MenuItem>
                                    <MenuItem icon={<FavoriteIcon />}>Favourites<Link to={{ pathname: "/Favourites", state: { c_id: this.state.c_id, c_email: this.state.c_email } }} /></MenuItem>
                                    <MenuItem icon={<ExitToAppIcon />}>Log Out<Link to="/" /></MenuItem>
                                    <MenuItem icon={<HistoryIcon/>}>orders<Link to={ {pathname:"/CustomerOrder",state:{c_id:this.state.c_id}}} /></MenuItem>
                                </SubMenu>
                            </Menu>
                        </ProSidebar>

                    </div>

                    {/* SEARCH BAR CODE */}
                    <div className="col-md-11" >
                        <div className="row" style={{height: "250px" }} >
                            <form onSubmit = {(e)=>this.handleFormOnSubmit(e)}>
                            <center> <div class="input-group" style={{ width: "500px", marginTop: "100px" }}>
                                <select name = "s_filter"  onChange = {this.handleSearchBarFilterChange} className="selectpicker" >
                                    <option value = "s_location" selected>Location</option>
                                    <option value = "s_dish">Dish</option>
                                </select>
                                <input type="input" class="form-control rounded" placeholder="Search" aria-label="Search"
                                    aria-describedby="search-addon" name = "s_data" />
                                <button type="submit" class="btn btn-outline-primary">search</button>
                                <select name = "del_type" onChange = {this.handleDeliveryFilterChange} >
                                    <option  value = "s_delivery" >Delivery</option>
                                    <option value = "s_pickup">Pickup</option>
                                    <option value = "s_both" selected>Both</option>
                                </select>
                            </div></center>
                            </form>
                        </div>





                        {/* SEARCH RESULTS CODE */}
                     
                            <div className = "row">
                                {
                                this.state.restaurantlist.map((value, key) => {
                                    return <div className = "col-md-3" style = {{paddingBottom:'25px'}}>
                                   
                                        <center>  
                                                <div className="card card-block mx-2" style={{ width: '17rem'  }}>
                                                    <img style={{ width: '100%', height: '200px' }} class="card-img-top" src={value.r_picture} />
                                                    <div className="card-body">
                                                    <div ><Link to ={{ pathname: "/RestaurantLanding" ,state:{r_email:value.r_email,view_id:"Customer",c_id:this.state.c_id}  }}  ><h5 className="card-title" id="name">{value.r_name}
                                                </h5></Link><FavoriteBorderIcon  style={{height:"28px",width:"20px"}}  color={this.FetchColour(value.r_id)} onClick = {(e)=>this.handleAddToFav(value.r_id,e)} /></div>
                                                        <p className="card-text" id="county">Location:{value.r_county}</p>
                                                        <p className="card-test" id = "opentime">OpenTime : {value.r_opentime}</p>
                                                        <p className = "card-test" id ="closetime">CloseTime : {value.r_closetime}</p>
                                                        
                                                    </div>
                                                </div>
                                            </center>
                                      
                                        </div>
                                })}
                                </div>
    



                    </div>
                </div>
            </div>
        )
    }
}
