import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
const NavBar = () =>{

    return (
    <nav className = "navbar">
        <h1>Finance Tracker</h1>
        <Link to= "/create">
            <Button >Create</Button>
        </Link>
    </nav>
    )

}

export default NavBar;