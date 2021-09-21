import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import "./Uber.css";
import sideBarList from "../SideBarList"
import ImageGallery from 'react-image-gallery';
import dishlist from './Itemslist';
import { StylesContext } from '@material-ui/styles';
import axios from 'axios'


export class RestaurantLanding extends Component {



    constructor(props) {
        super(props)

        this.state = {
            r_name: "",
            r_id: "",
            dishlist :[]
        }
    }


    componentDidMount(props) {
        ///Calling the res_reg table and fetching the details through below request
        axios.get(`http://localhost:3030/Restaurant/details/${this.props.location.state.r_email}`)
            .then(
                res => {
                    //Setting the name of the restaurant after successfully fetching the data
                    this.setState(
                        {
                            r_name: res.data.r_name,
                            r_id: res.data.r_id
                        }
                    )


                })
            ///Fetching Dish data after r_id has been set
            .then(res => {
                axios.post("http://localhost:3030/Restaurant/GetDish",
                    {
                        r_id: this.state.r_id
                    }
                    //Dish data gets collected in below then function
                ).then(
                    res => {
                          
                        this.setState(
                            {
                                dishlist :[...(res.data)]
                            }
                        )
                        // console.log(this.state.dishlist[0])
                    }
                )

            }

            )
    }



    onhandleclick = () => {

        alert("Hi")

    }






    render() {

        const images = [
            {
                original: 'https://picsum.photos/id/1018/1000/600/',
                //   thumbnail: 'https://picsum.photos/id/1018/250/150/',
            },
            {
                original: 'https://picsum.photos/id/1015/1000/600/',
                //   thumbnail: 'https://picsum.photos/id/1015/250/150/',
            },
            {
                original: 'https://picsum.photos/id/1019/1000/600/',
                //   thumbnail: 'https://picsum.photos/id/1019/250/150/',
            },
        ];




        return (
            <div>
                <div>
                    {/* <h1>{this.props.location.state.message}</h1>  */}
                    <div className="container-fluid" style={{ margin: 0, padding: 0 }}>
                        <div className="row">
                            {/* Code for the side bar */}
                            <div className="col-md-2" style={{ padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                                <div className="sideBar">
                                    <ul className="nav nav-sidebar">
                                        {sideBarList.map((value, key) => {
                                            return (<li className="listdata" key={key}
                                            >     { }
                                                <Link to={{
                                                    pathname: value.link, state: {
                                                        r_id: this.state.r_id,
                                                        r_name: this.state.r_name
                                                    }
                                                }}  >
                                                    <div id="icon">{value.icon}</div>
                                                    <div id="title">{value.title}</div>
                                                </Link>
                                            </li>

                                            )

                                        }
                                        )}



                                    </ul>

                                </div>
                            </div>
                            {/* Code for the restaurant picture carousel */}
                            <div className="col-md-10" style={{ padding: 0 }} >
                                <div className="conatiner" style={{ margin: 0, padding: 0 }} >
                                    <div className="row border-bottom" style={{ height: '357px', width: '100%', display: 'inline-block' }}>
                                        <center><h1>{this.state.r_name}</h1></center>
                                        <center> < ImageGallery items={images} /></center>

                                    </div>
                                    {/* <div className ="row" style ={{height: '700px'}}> */}
                                    <center> <h1>Restaurant items</h1></center>
                                    {/*Code for the restaurant item boxes  */}
                                    <div className="row flex-row flex-nowrap overflow-auto">
                                        {this.state.dishlist.map((dish, index) => {
                                            return <div className="col-3 offset-1">
                                                <div className="card card-block mx-2" style={{ width: '20rem' }}>
                                                    <img style={{ width: '100%', height: '200px' }} class="card-img-top" src={dish.d_picture} />
                                                    <div className="card-body">
                                                        <h5 className="card-title" id="name">{dish.d_name}</h5>
                                                        <p className="card-text" id="description">{dish.d_description}</p>
                                                        <h5 className="card-text" id="price">{dish.d_price}</h5>
                                                        <Link class="btn btn-primary" to={`/EditDish/${dish.d_name}`} >Edit dish</Link>
                                                    </div>

                                                </div>

                                            </div>
                                        }
                                        )}

                                    </div>




                                    {/* </div> */}
                                </div>


                            </div>
                        </div>
                    </div>



                </div>

            </div>
        )
    }
}

export default RestaurantLanding
