import { Link } from "react-router-dom";
import "./NavBar.css"

export default function NavBar ({ children }) {
   return (
       <div>
            <nav className="navbar bg-dark container">
                <Link to="/" className="link"><h4 data-testid="navbar">BikeApp</h4></Link>

            </nav>
            {children}
       </div>
   )
}
