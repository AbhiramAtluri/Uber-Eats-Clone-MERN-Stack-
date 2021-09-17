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



export class RestaurantLanding extends Component {


    //   componentDidMount(props)
    //   {
    //       console.log(this.props.location.state.message)
    //   }

    constructor(props) {
        super(props)

        this.state = {

        }
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
                                                <Link to={{ pathname: value.link, state: { message: "diehard" } }}  >
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
                                        <center><h1>Restaurant name</h1></center>
                                        <center> < ImageGallery items={images} /></center>

                                    </div>
                                    {/* <div className ="row" style ={{height: '700px'}}> */}
                                    <center> <h1>Restaurant items</h1></center>
                                    {/*Code for the restaurant item boxes  */}
                                    <div className="row flex-row flex-nowrap overflow-auto">
                                        {dishlist.map((dish, index) => {
                                            return <div className="col-3 offset-1">
                                                <div className="card card-block mx-2" style={{ width: '20rem' }}>
                                                    <img style={{ width: '100%', height: '200px' }} class="card-img-top" src={dish.pic} />
                                                    <div className="card-body">
                                                        <h5 className="card-title" id="name">{dish.name}</h5>
                                                        <p className="card-text" id="description">{dish.description}</p>
                                                        <h5 className="card-text" id="price">{dish.prce}</h5>
                                                        <Link class="btn btn-primary" to = {`/EditDish/${dish.name}`} >Edit dish</Link>
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
