import { Link, NavLink } from "react-router-dom";

const Navbar = () =>
{
    return(

        <nav className = "navbar navbar-inverse" style ={{backgroundColor:'lightblue'}}>
            <div className="container-fluid">
    <div className="navbar-header">
         <a className="navbar-brand" style ={{fontSize: '40px'}}>Uber Eats</a>
     </div>
          
         <div className="nav navbar-nav" style ={{display : 'inline'}} >
             
              <Link to="/" style ={{fontSize : '30px' , marginRight: '20px'}}>Home</Link>
              <Link to ="/Customer" style ={{fontSize : '30px' , marginRight: '20px'}}>Customer</Link>
             <Link to="/Restaurant" style ={{fontSize : '30px' }}>Restaurant</Link>
          </div>
   
            </div>
           
       </nav>
    )
}

export default Navbar;