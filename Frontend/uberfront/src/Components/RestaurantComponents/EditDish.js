import React, { Component } from 'react'
import { useParams } from "react-router-dom";
export default class EditDish extends Component {

   
    // componentDidMount(props)
    // {
    //     const x = this.props.match.params.id  
    //      console.log(x)
    // }
    
    render() {
        
       const x = this.props.match.params.id  
   console.log(x)
        return (
            <div>
                <h1>{x}</h1>
            </div>
        )
    }
}
