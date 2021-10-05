import React, { Component } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"



export default class Favourites extends Component {

    constructor(props) {
        super(props)

        this.state = {
            FavList: [],
            c_id: ""
        }
    }

    componentDidMount(props) {

        //  axios.pos
        axios.post("http://localhost:3030/Restaurant/GetFavRest",
            {
                c_id: this.props.location.state.c_id
            })
            .then(res => {

                this.setState(
                    {
                        FavList: res.data,
                        c_id: this.props.location.state.c_id
                    }
                )



            }
            )


    }




    render() {
        return (
            <div className="container-fluid">
                {/* <h5>Welcome to Favourites</h5> */}
                <div className="col-md-12">
                  
                    <center>
                    <h5>Favourite Restaurants</h5>  
                        <div className="col-md-12" style={{margin:"0px",padding:"0px"}}>
                            <div className = "row">    
                            {this.state.FavList.length > 0 ?
                                this.state.FavList.map((data, key) => {
                                    return <div className="col-md-3"style={{paddingBottom:"40px"}} >
                                        <div className="card card-block mx-3" style={{ width: "100%" }}>
                                        <div className="card-body">
                                            
                                                <img style={{ width: '100%', height: '200px' }} class="card-img-top" src={data.r_picture} />
                                                <div >
                                                    <Link to={{ pathname: "/RestaurantLanding", state: { r_email: data.r_email, view_id: "Customer", c_id: this.state.c_id } }}>
                                                        <h5 className="card-title" id="name">{data.r_name}
                                                        </h5></Link></div>
                                                        <div className="card-body">
                                                        <p className="card-text" id="county">Location:{data.r_county}</p>
                                                        <p className="card-test" id = "opentime">OpenTime : {data.r_opentime}</p>
                                                        <p className = "card-test" id ="closetime">CloseTime : {data.r_closetime}</p>


                                                         </div>

                                            </div>
                                        </div>
                                    </div>

                                }
                                )
                                :
                                <div></div>}

                        </div>
                        </div>
                    </center>

                </div>

            </div>
        )
    }
}
