import { Link, NavLink } from "react-router-dom";

const Navbar = () =>
{
    return(

        <nav className = "navbar navbar-expand-sm bg-light justify-content-center">

            <h1>Uber eats</h1>
            <div className ="Links">
                
                <NavLink to="/">Home</NavLink>
                <NavLink to ="/Customer">Customer</NavLink>
                <NavLink to="/Resteraunt">Resteraunt</NavLink>
            </div>
       </nav>
    )
}

export default Navbar;