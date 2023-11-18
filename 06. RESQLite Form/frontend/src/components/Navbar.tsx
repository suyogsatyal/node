import './style/navbar.css'

function Navbar(){
    return(
        <div className="nav">
            <div className="navDetails">
                <ul>
                    <li><a href="/entry">Add</a></li>
                    <li><a href="/">View</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;