import { Link } from "react-router-dom"
import './Nav.css'

const MiniNav = ()=>{
    
    return <div className="mini-nav">
        
                    <Link to={'/'}><h4>Home</h4></Link>
                    <Link to={'/Intro'}><h4>About</h4></Link>
                    <Link to={'/browse'}><h4>Browse</h4></Link>
                    <Link to={'/rate'}><h4>Rate</h4></Link>                  
    </div>
}

export default MiniNav;