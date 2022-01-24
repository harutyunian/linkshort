import {Link, NavLink} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

const NavBar = () =>{
    const {logout} = useContext(AuthContext)

    const logoutHandler  = (e) =>{
        e.preventDefault()
        logout()
    }
    return (
        <nav>
            <div className="nav-wrapper blue-grey darken-1">
                <Link to="/" className="brand-logo">Short your links</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to='/create'>Create</NavLink></li>
                    <li><NavLink to='/links'>Links</NavLink></li>
                    <li><Link onClick={logoutHandler} to='/'>Sign Out</Link></li>
                </ul>
            </div>
        </nav>
    )
}
export default NavBar

