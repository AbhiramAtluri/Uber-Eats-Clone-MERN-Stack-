import { Link, NavLink } from "react-router-dom";
 

const NavbarRest = () =>
{
    return(

        <nav className = "navbar navbar-inverse" style ={{backgroundColor:'black'}}>
            <div className="container-fluid">
    <div className="navbar-header">
         <a className="navbar-brand" id ="navbar-component" style ={{fontSize: '30px',color:"whitesmoke"}}>Uber Eats</a>
     </div>
          
         <div className="nav navbar-nav" style ={{display : 'inline'}} >
{/*              
              <Link to="/" style ={{fontSize : '30px' , marginRight: '20px',color:"whitesmoke"}} id ="navbar-component">Home</Link>
              <Link to ="/Customer" style ={{fontSize : '30px' , marginRight: '20px',color:"whitesmoke"}} id ="navbar-component">Customer</Link>
             <Link to="/Restaurant" style ={{fontSize : '30px',color:"whitesmoke" }} id ="navbar-component">Restaurant</Link> */}
          </div>
   
            </div>
           
       </nav>
    )
}

export default NavbarRest;