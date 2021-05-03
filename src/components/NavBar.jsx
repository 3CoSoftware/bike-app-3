import { Link } from "react-router-dom";
import "./Navbar.css"

function NavBar () {
   return (
       <nav className="navbar bg-dark container">
           <h4><Link to="/" className="link">BikeApp</Link></h4>

       </nav>
   )
}

export default NavBar